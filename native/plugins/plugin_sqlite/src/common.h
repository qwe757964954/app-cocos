#pragma once

#include "bindings/sebind/sebind.h"
#include "cocos.h"
#include "sqlite3.h"
#include "db_thread.h"
#include <vector>


class DbRef {

public:
	sqlite3* db;
	DbThread* thread;

	DbRef(sqlite3* db);
	~DbRef();
	void close();
};


bool p_sqlite_open(se::State& state);
bool p_sqlite_exec(se::State& state);
bool p_sqlite_close(se::State& state);
bool p_sqlite_load_plugin(se::State& state);
bool p_sqlite_insert(se::State& state);


void p_sqlite_set_result(se::State& state, int code, const char* errmsg, int32_t data);

se::Object* to_se_string_array(char** array, int len);

se::Object* to_se_string_array(const std::vector<std::string>& array);

std::vector<std::string> chararray_to_vector(int argn, char** array);

