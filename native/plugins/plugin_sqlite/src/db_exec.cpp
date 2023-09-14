#include "common.h"
#include "db_thread.h"

static void task_key(char* key) {
	static int id = 0;
	if (id > 100000) {
		id = 1;
	}
	else {
		id = id + 1;
	}
	sprintf(key, "ExecTask_step(%d)", id);
}

ExecTask::ExecTask(sqlite3* db, std::string sql, se::Value cb, bool callOnce) {
	this->db = db;
	this->sql = sql;
	this->cb = cb;
	this->callOnce = callOnce;
	this->rows = std::vector<KeysValues>();
	this->scheduler = cc::ApplicationManager::getInstance()->getCurrentAppSafe()->getEngine()->getScheduler();
};

void ExecTask::operator()() {
	auto db = this->db;
	auto sqlitecb = [](void* ud, int argc, char** argv, char** azColName) -> int {
		auto self = (ExecTask*)ud;
		se::Value cb = self->cb;
		auto v_keys = chararray_to_vector(argc, azColName);
		auto v_values = chararray_to_vector(argc, argv);
		if (self->callOnce) {
			self->rows.push_back(std::pair(v_keys, v_values));
		}
		else {
			auto fun = [v_keys, v_values, cb](float _) -> void {
				se::AutoHandleScope hs;
				auto keys = to_se_string_array(v_keys);
				auto values = to_se_string_array(v_values);
				auto item = se::Object::createPlainObject();
				item->setProperty("keys", se::Value(keys));
				item->setProperty("values", se::Value(values));
				auto va = se::ValueArray();
				va.push_back(se::Value(item));
				auto success = cb.toObject()->call(va, nullptr);
				if (!success) {
					CC_LOG_DEBUG("sqlite call js failed");
					se::ScriptEngine::getInstance()->clearException();
				}
			};
			char key[30];
			task_key(key);
			self->scheduler->schedule(fun, self, 0, 0, 0.0, false, key);
		}
		return 0;
	};
	char* errmsg = nullptr;
	auto ret = sqlite3_exec(db, sql.c_str(), sqlitecb, this, &errmsg);
	int32_t rowid = 0;
	int32_t updated = 0;
	if (ret == SQLITE_OK) {
		rowid = sqlite3_last_insert_rowid(db);
		updated = sqlite3_changes(db);
	}
	else {
		CC_LOG_DEBUG("exec failed: %s", errmsg);
	}

	se::Value cb = this->cb;
	auto fun = [self = shared_from_this(), cb, errmsg, rowid, updated](float _) -> void {
		se::AutoHandleScope scope;
		if (cb.isObject()) {
			auto obj = se::Object::createPlainObject();
			obj->setProperty("finish", se::Value(true));
			if (errmsg) {
				CC_LOG_DEBUG("errmsg: %s", errmsg);
				obj->setProperty("errmsg", se::Value(errmsg));
			}
			obj->setProperty("rowid", se::Value(rowid));
			obj->setProperty("updated", se::Value(updated));
			if (self->callOnce) {
				auto jsrows = se::Object::createArrayObject(self->rows.size());
				for (auto i = 0; i < self->rows.size(); i++) {
					auto row = self->rows[i];
					auto keys = to_se_string_array(row.first);
					auto values = to_se_string_array(row.second);
					auto jsrow = se::Object::createPlainObject();
					jsrow->setProperty("keys", se::Value(keys));
					jsrow->setProperty("values", se::Value(values));
					jsrows->setArrayElement(i, se::Value(jsrow));
				}
				obj->setProperty("rows", se::Value(jsrows));
			}
			se::ValueArray va;
			va.push_back(se::Value(obj));
			auto success = cb.toObject()->call(va, nullptr);
			if (!success) {
				CC_LOG_DEBUG("sqlite call js failed");
				se::ScriptEngine::getInstance()->clearException();
			}
			cb.toObject()->unroot();
		}
		if (errmsg) {
			sqlite3_free(errmsg);
		}
	};
	char key[30];
	task_key(key);
	this->scheduler->schedule(fun, this, 0, 0, 0.0, false, key);
};

// db, sql, cb, callOnce
bool p_sqlite_exec(se::State& state) {
	bool ok = true;
	std::string sql;
	se::Value jsFunc;
	bool callOnce = false;
	const se::ValueArray& args = state.args();
	auto ref = (DbRef*)args[0].toObject()->getPrivateData();
	ok &= sevalue_to_native(args[1], &sql);
	if (args.size() >= 3) {
		jsFunc = args[2];
		jsFunc.toObject()->root();
	}
	if (args.size() >= 4) {
		ok &= sevalue_to_native(args[3], &callOnce);
	}
	if (!ok) {
		p_sqlite_set_result(state, -1, "args error", 0);
		return false;
	}
	auto task = std::make_shared<ExecTask>(ref->db, sql, jsFunc, callOnce);
	ref->thread->push([task]() {
		task->operator()();
		});
	return true;
}
