#include "bindings/sebind/sebind.h"
#include "cocos.h"
#include <memory>
#include "engine/EngineEvents.h"
#include "plugins/Plugins.h"
#include <time.h>
#include <cctype>

static std::string trim(const std::string& str) {
	auto start = std::find_if(str.begin(), str.end(), [](int ch) {
		return !std::isspace(ch);
		});

	auto end = std::find_if(str.rbegin(), str.rend(), [](int ch) {
		return !std::isspace(ch);
		}).base();

		if (start == str.end() || start == end)
			return "";

		return std::string(start, end);
}

static std::vector<std::string> split(const std::string& str, char delimiter) {
	std::vector<std::string> tokens;
	std::stringstream ss(str);
	std::string token;

	while (std::getline(ss, token, delimiter)) {
		tokens.push_back(token);
	}

	return tokens;
}

static std::string toLower(const std::string& str) {
	std::string result;
	for (char c : str) {
		result += std::tolower(c);
	}
	return result;
}

bool nativeVersion(se::State& state) {

	static std::string build_time = "";
	if (build_time == "") {
		std::string time = std::string(__TIME__);
		auto pos = time.find(":");
		while (pos != std::string::npos) {
			time = time.replace(pos, 1, "");
			pos = time.find(":", pos + 1);
		}
		auto strs = split(__DATE__, ' ');
		auto month = toLower(trim(strs[0]));
		auto day = trim(strs[1]);
		auto year = trim(strs[2]);
		if (month == "jan") {
			month = "01";
		}
		else if (month == "feb") {
			month = "02";
		}
		else if (month == "mar") {
			month = "03";
		}
		else if (month == "apr") {
			month = "04";
		}
		else if (month == "may") {
			month = "05";
		}
		else if (month == "jun") {
			month = "06";
		}
		else if (month == "jul") {
			month = "07";
		}
		else if (month == "aug") {
			month = "08";
		}
		else if (month == "sep") {
			month = "09";
		}
		else if (month == "oct") {
			month = "10";
		}
		else if (month == "nov") {
			month = "11";
		}
		else if (month == "dec") {
			month = "12";
		}
		build_time = year + month + day + time;
	}
	state.rval().setString(build_time);
	return true;
}
SE_BIND_PROP_GET(nativeVersion);


static bool register_extra(se::Object* ns) {
	auto obj = se::Object::createPlainObject();
	ns->setProperty("p_extra", se::Value(obj));

	obj->defineProperty("nativeVersion", _SE(nativeVersion), nullptr);

	return true;
}

static void export_plugin() {
	static cc::events::ScriptEngine::Listener listener;
	listener.bind([](cc::ScriptEngineEvent event) {
		if (event == cc::ScriptEngineEvent::AFTER_INIT) {
			auto engine = se::ScriptEngine::getInstance();
			engine->addRegisterCallback(register_extra);
		}
		});
}

/**
 * Regist a new cc plugin entry function
 * first  param: should match the name in cc_plugin.json
 * second param: callback when engine initialized
 */
CC_PLUGIN_ENTRY(p_extra, export_plugin);
