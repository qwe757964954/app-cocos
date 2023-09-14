#include "common.h"

// 参数
// insert into user(id,name,city) values(?,?,?)
// [10, "zzp", null]
// cb({success,errmsg,rowid})
bool p_sqlite_insert(se::State& state) {
	auto& args = state.args();
	auto ref = (DbRef*)state.nativeThisObject();
	std::string sql;
	std::vector<se::Value> values;
	sevalue_to_native(args[0], &sql);
	sevalue_to_native(args[1], &values);
	auto thread_fun = [=]() {
		std::string err;
		sqlite3_stmt* stmt;
		sqlite3_prepare_v2(ref->db, sql.c_str(), -1, &stmt, nullptr);
		for (int i = 0; i < values.size(); i++) {
			auto& value = values[i];
			int ok = SQLITE_OK;
			if (value.isNullOrUndefined()) {
				ok = sqlite3_bind_null(stmt, i + 1);
			}
			else if (value.isBigInt()) {
				ok = sqlite3_bind_int64(stmt, i + 1, value.toInt64());
			}
			else if (value.isNumber()) {
				ok = sqlite3_bind_double(stmt, i + 1, value.toDouble());
			}
			else if (value.isString()) {
				ok = sqlite3_bind_text(stmt, i + 1, value.toString().c_str(), -1, SQLITE_STATIC);
			}
			else {
				err = std::string("参数类型不正确:") + std::to_string(i + 1);
				break;
			}
			if (ok != SQLITE_OK) {
				err = sqlite3_errmsg(ref->db);
			}
		}
		if (err != "") {

		}
		else {
			auto ok = sqlite3_step(stmt);
			if (ok != SQLITE_OK) {
				err = sqlite3_errmsg(ref->db);
			}
		}
	};
	return true;
}