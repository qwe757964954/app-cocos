#include "ByEditBox.h"
#include "bindings/sebind/sebind.h"
#include "plugins/bus/EventBus.h"
#include "plugins/Plugins.h"
#include "NativeTekstoLabel.h"
#include "NativeTekstoLabelRegister.h"
using namespace boyaa;

// export c++ methods to JS
static bool register_editbox(se::Object *ns)
{

    sebind::class_<ByEditBox> klass("ByEditBox");

    klass.constructor<>()
        .function("show", &ByEditBox::show)
        .function("hide", &ByEditBox::hide);
    klass.install(ns);
    return true;
}

// static bool register_label(se::Object* ns)
//{
//	sebind::class_<NativeTekstoLabel> klass("NativeTekstoLabel");
//
//	klass.constructor<>()
//		//.function("set_text", &NativeTekstoLabel::set_text)
//         .function("add_emoji", &NativeTekstoLabel::add_emoji)
//         .function("remove_emoji", &NativeTekstoLabel::remove_emoji)
//         .function("clear_emoji", &NativeTekstoLabel::clear_emoji)
//         .function("measure", &NativeTekstoLabel::measure)
//         .function("set_size", &NativeTekstoLabel::set_size)
//		.function("display", &NativeTekstoLabel::display);
//
//	klass.install(ns);
//	return true;
// }

void add_boyaa_plugin_class()
{
    using namespace cc::plugin;
    static Listener listener(BusType::SCRIPT_ENGINE);
    listener.receive([](ScriptEngineEvent event)
                     {
        if (event == ScriptEngineEvent::POST_INIT) {
            se::ScriptEngine::getInstance()->addRegisterCallback(register_editbox);
            se::ScriptEngine::getInstance()->addRegisterCallback(register_all_teksto_label_manual);
        } });
}

/**
 * Regist a new cc plugin entry function
 * first  param: should match the name in cc_plugin.json
 * second param: callback when engine initialized
 */
CC_PLUGIN_ENTRY(bylabel, add_boyaa_plugin_class);