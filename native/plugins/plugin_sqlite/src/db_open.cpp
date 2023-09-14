#include "common.h"

bool p_sqlite_open(se::State& state) {
	std::string dbpath = state.args()[0].toString();
	sqlite3* db;
	auto code = sqlite3_open(dbpath.c_str(), &db);
	if (code != SQLITE_OK) {
		return false;
	}
	auto ptr = std::make_shared<DbRef>(db);
	ptr->thread->start();
	nativevalue_to_se(ptr, state.rval());
	return true;
}

