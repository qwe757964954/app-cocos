#include "bindings/sebind/sebind.h"
#include "cocos.h"
#include <memory>
#include "engine/EngineEvents.h"
#include "plugins/Plugins.h"

#include "common.h"

#define DEF_FUNCTION(name) obj->defineFunction(#name, _SE(p_zip_##name))

SE_BIND_FUNC(p_zip_zip)
SE_BIND_FUNC(p_zip_unzip)

static bool register_zip(se::Object* ns) {
	auto obj = se::Object:: createPlainObject();
	ns->setProperty("p_zip", se::Value(obj));

	DEF_FUNCTION(zip);
	DEF_FUNCTION(unzip);

	return true;
}

static void export_plugin() {
	static cc::events::ScriptEngine::Listener listener;
	listener.bind([](cc::ScriptEngineEvent event) {
		if (event == cc::ScriptEngineEvent::AFTER_INIT) {
			auto engine = se::ScriptEngine::getInstance();
			engine->addRegisterCallback(register_zip);
		}
		});
}

/**
 * Regist a new cc plugin entry function
 * first  param: should match the name in cc_plugin.json
 * second param: callback when engine initialized
 */
CC_PLUGIN_ENTRY(p_zip, export_plugin);
