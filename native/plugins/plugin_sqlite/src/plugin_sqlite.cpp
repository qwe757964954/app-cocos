
#include "bindings/sebind/sebind.h"
#include "cocos.h"
#include <memory>
#include "engine/EngineEvents.h"
#include "plugins/Plugins.h"

#include "sqlite3.h"
#include "common.h"

SE_BIND_FUNC(p_sqlite_open)
SE_BIND_FUNC(p_sqlite_exec)
SE_BIND_FUNC(p_sqlite_close)
SE_BIND_FUNC(p_sqlite_load_plugin)

#define DEF_FUNCTION(name) obj->defineFunction(#name, _SE(p_sqlite_##name))

static bool DbRef_dtor(se::State& state) {
	return true;
}
SE_BIND_FINALIZE_FUNC(DbRef_dtor);

static bool register_sqlite(se::Object* ns) {
	auto obj = ns->createPlainObject();
	ns->setProperty("p_sqlite", se::Value(obj));

	DEF_FUNCTION(open);
	DEF_FUNCTION(exec);
	DEF_FUNCTION(close);
	DEF_FUNCTION(load_plugin);

	auto clz = se::Class::create("DbRef", obj, nullptr, nullptr);
	clz->defineFinalizeFunction(_SE(DbRef_dtor));
	clz->install();
	JSBClassType::registerClass<DbRef>(clz);

	return true;
}

static void export_plugin() {
	static cc::events::ScriptEngine::Listener listener;
	listener.bind([](cc::ScriptEngineEvent event) {
		if (event == cc::ScriptEngineEvent::AFTER_INIT) {
			auto engine = se::ScriptEngine::getInstance();
			engine->addRegisterCallback(register_sqlite);
		}
		});
}

/**
 * Regist a new cc plugin entry function
 * first  param: should match the name in cc_plugin.json
 * second param: callback when engine initialized
 */
CC_PLUGIN_ENTRY(p_sqlite, export_plugin);

