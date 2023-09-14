#pragma once

#include "NativeTekstoLabel.h"
#include "cocos/bindings/jswrapper/SeApi.h"

namespace se {
	class Object;
}

namespace boyaa {

	// https://blog.csdn.net/qq_41100010/article/details/123434384
//  helper type for the visitor #4
	template <class... Ts>
	struct overloaded : Ts... {
		using Ts::operator()...;
	};
	// explicit deduction guide (not needed as of C++20)
	template <class... Ts>
	overloaded(Ts...)->overloaded<Ts...>;

	bool register_all_teksto_label_manual(se::Object* obj);
};