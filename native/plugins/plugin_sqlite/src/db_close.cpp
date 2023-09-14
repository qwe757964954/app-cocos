#include "common.h"

bool p_sqlite_close(se::State& state) {
	bool ok = true;
	auto ref = (DbRef*)state.args()[0].toObject()->getPrivateData();
	if (!ok) {
		state.rval().setString("args error");
		return false;
	}
	ref->close();
	return true;
};