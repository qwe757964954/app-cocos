#include "common.h"

bool p_sqlite_load_plugin(se::State& state) {
	std::string libPath;
	std::string entry;
	auto args = state.args();
	auto ref = (DbRef*)args[0].toObject()->getPrivateData();
	sevalue_to_native(args[1], &libPath);
	if (args.size() >= 3) {
		sevalue_to_native(args[2], &entry);
	}
	char* errmsg;
	auto ret = sqlite3_load_extension(ref->db, libPath.c_str(), entry.c_str(), &errmsg);
	if (ret) {
		state.rval().setString(errmsg);
		sqlite3_free(errmsg);
		return false;
	}
	return true;
}