#include "common.h"

DbRef::DbRef(sqlite3* db) {
	this->db = db;
	this->thread = new DbThread();
}

DbRef::~DbRef() {
	this->close();
}

void DbRef::close() {
	if (this->thread) {
		delete this->thread;
		this->thread = nullptr;
	}
	if (this->db) {
		sqlite3_close(this->db);
		this->db = nullptr;
	}
}


void p_sqlite_set_result(se::State& state, int code, const char* errmsg, int32_t data) {
	auto obj = se::Object::createPlainObject();
	obj->setProperty("code", se::Value(code));
	if (errmsg != NULL) {
		obj->setProperty("errmsg", se::Value(errmsg));
	}
	if (data != 0) {
		obj->setProperty("data", se::Value(data));
	}
	state.rval().setObject(obj);
};

se::Object* to_se_string_array(char** array, int len) {
	auto obj = se::Object::createArrayObject(len);
	for (int i = 0; i < len; i++) {
		char* v = array[i] ? array[i] : NULL;
		obj->setArrayElement(i, se::Value(v));
	}
	return obj;
};

se::Object* to_se_string_array(const std::vector<std::string>& array) {
	auto obj = se::Object::createArrayObject(array.size());
	for (int i = 0; i < array.size(); i++) {
		std::string s = array[i];
		obj->setArrayElement(i, se::Value(s));
	}
	return obj;
};

std::vector<std::string> chararray_to_vector(int argn, char** array) {
	std::vector<std::string> rtn;
	for (int i = 0; i < argn; i++) {
		char* str = array[i];
		if (str == NULL) {
			rtn.push_back("");
		}
		else {
			rtn.push_back(std::string(str));
		}
	}
	return rtn;
};
