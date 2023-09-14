
#include "bindings/sebind/sebind.h"
#include "cocos.h"
#include <memory>
#include "engine/EngineEvents.h"
#include "plugins/Plugins.h"
#include "word_detector_utf8.h"

#define DEF_FUNCTION(obj, name) obj->defineFunction(#name, _SE(wd_##name))

typedef std::tuple<int64_t, std::string, int, int, int64_t> EntryTuple;

using namespace boyaa_word_detector;

static se::Class* clz_wd = nullptr;

static bool wd_dtor(se::State& state) {
	return true;
}
SE_BIND_FINALIZE_FUNC(wd_dtor);


static bool wd_ctor(se::State& state) {
	auto wd = std::make_shared<WordDetectorUTF8>();
	auto& rtn = state.rval();
	state.thisObject()->setPrivateData(wd);
	return true;
}
SE_BIND_CTOR(wd_ctor, clz_wd, wd_dtor);

static bool wd_version(se::State& state) {
	auto wd = (WordDetectorUTF8*)state.nativeThisObject();
	auto version = wd->version();
	state.rval().setInt64(version);
	return true;
}
SE_BIND_PROP_GET(wd_version);

static bool wd_add_entry(se::State& state) {
	auto wd = (WordDetectorUTF8*)state.nativeThisObject();
	EntryTuple entry;
	sevalue_to_native(state.args()[0], &entry);
	auto fun = [wd = wd->shared_from_this(), entry]()->void {
		wd->add_entry(
			std::get<0>(entry),
			std::get<1>(entry),
			std::get<2>(entry),
			std::get<3>(entry),
			std::get<4>(entry)
		);
	};
	wd->threadPool.push(fun);
	return true;
}
SE_BIND_FUNC(wd_add_entry);

static bool wd_add_entries(se::State& state) {
	auto wd = (WordDetectorUTF8*)state.nativeThisObject();
	auto& args = state.args();
	std::vector<EntryTuple> data;
	std::vector<se::Value> se_items;
	sevalue_to_native(args[0], &se_items);
	for (int i = 0; i < se_items.size(); i++) {
		auto& v = se_items[i];
		EntryTuple item;
		sevalue_to_native(v, &item);
		data.push_back(std::move(item));
	}
	auto fun = [wd = wd->shared_from_this(), data]()->void {
		wd->add_entries(data);
	};
	wd->threadPool.push(fun);
	return true;
}
SE_BIND_FUNC(wd_add_entries);

static bool wd_delete_entry(se::State& state) {
	auto wd = (WordDetectorUTF8*)state.nativeThisObject();
	EntryTuple entry;
	sevalue_to_native(state.args()[0], &entry);
	auto fun = [wd = wd->shared_from_this(), entry]()->void {
		wd->delete_entry(
			std::get<0>(entry),
			std::get<1>(entry),
			std::get<2>(entry),
			std::get<3>(entry),
			std::get<4>(entry)
		);
	};
	wd->threadPool.push(fun);
	return true;
}
SE_BIND_FUNC(wd_delete_entry);

static bool wd_delete_entries(se::State& state) {
	auto wd = (WordDetectorUTF8*)state.nativeThisObject();
	auto& args = state.args();
	std::vector<se::Value> se_items;
	sevalue_to_native(args[0], &se_items);
	for (int i = 0; i < se_items.size(); i++) {
		auto& v = se_items[i];
		EntryTuple entry;
		sevalue_to_native(v, &entry);
		auto fun = [wd = wd->shared_from_this(), entry]()->void {
			wd->delete_entry(
				std::get<0>(entry),
				std::get<1>(entry),
				std::get<2>(entry),
				std::get<3>(entry),
				std::get<4>(entry)
			);
		};
		wd->threadPool.push(fun);
	}
	return true;
}
SE_BIND_FUNC(wd_delete_entries);

static bool wd_clear_all_entries(se::State& state) {
	auto wd = (WordDetectorUTF8*)state.nativeThisObject();
	wd->clear_all_entries();
	return true;
}
SE_BIND_FUNC(wd_clear_all_entries);

static bool wd_is_valid(se::State& state) {
	auto wd = (WordDetectorUTF8*)state.nativeThisObject();
	std::string text;
	sevalue_to_native(state.args()[0], &text);
	auto result = wd->is_valid(text);
	state.rval().setBoolean(result);
	return true;
}
SE_BIND_FUNC(wd_is_valid);

static bool wd_replace_all(se::State& state) {
	auto wd = (WordDetectorUTF8*)state.nativeThisObject();
	auto& args = state.args();
	std::string text;
	std::string replacement;
	sevalue_to_native(args[0], &text);
	sevalue_to_native(args[1], &replacement);
	auto result = wd->replace_all(text, replacement);
	state.rval().setString(result);
	return true;
}
SE_BIND_FUNC(wd_replace_all);

static bool wd_convert_to_pinyin(se::State& state) {
	auto wd = (WordDetectorUTF8*)state.nativeThisObject();
	auto& args = state.args();
	std::string text;
	std::string rep;
	sevalue_to_native(args[0], &text);
	sevalue_to_native(args[1], &rep);
	auto result = wd->convert_to_pinyin(text, rep);
	state.rval().setString(result);
	return true;
}
SE_BIND_FUNC(wd_convert_to_pinyin);


static bool register_sensitive(se::Object* ns) {
	auto obj = se::Object::createPlainObject();
	ns->setProperty("p_sensitive", se::Value(obj));
	auto clz = se::Class::create("WordDetectorUTF8", obj, nullptr, _SE(wd_ctor), nullptr);
	clz->defineFinalizeFunction(_SE(wd_dtor));
	clz->defineProperty("version", _SE(wd_version), nullptr);
	DEF_FUNCTION(clz, add_entry);
	DEF_FUNCTION(clz, add_entries);
	DEF_FUNCTION(clz, delete_entry);
	DEF_FUNCTION(clz, delete_entries);
	DEF_FUNCTION(clz, clear_all_entries);
	DEF_FUNCTION(clz, is_valid);
	DEF_FUNCTION(clz, replace_all);
	DEF_FUNCTION(clz, convert_to_pinyin);
	clz->install();
	JSBClassType::registerClass<WordDetectorUTF8>(clz);
	clz_wd = clz;
	return true;
}

static void export_plugin() {
	static cc::events::ScriptEngine::Listener listener;
	listener.bind([](cc::ScriptEngineEvent event) {
		if (event == cc::ScriptEngineEvent::AFTER_INIT) {
			auto engine = se::ScriptEngine::getInstance();
			engine->addRegisterCallback(register_sensitive);
		}
		});
}

/**
 * Regist a new cc plugin entry function
 * first  param: should match the name in cc_plugin.json
 * second param: callback when engine initialized
 */
CC_PLUGIN_ENTRY(p_sensitive, export_plugin);

