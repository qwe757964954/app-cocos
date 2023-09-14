#include "NativeTekstoLabelRegister.h"
#include "bindings/sebind/sebind.h"
#include "plugins/Plugins.h"
#include "engine/EngineEvents.h"
#include "cocos.h"
#include "bindings/jswrapper/SeApi.h"
#include "NativeTekstoLabel.h"
#include "bindings/auto/jsb_assets_auto.h"
#include "cocos/platform/FileUtils.h"
#include <variant>

static uint32_t convert_to_cc_color(teksto::Color from)
{
	uint32_t color = from.a << 24 | from.r << 16 | from.g << 8 | from.b;

	return color;
}


inline bool nativevalue_to_se(const teksto::Attribute& from, se::Value& ret, se::Object* ctx)
{ // NOLINT(readability-identifier-naming)
	se::HandleObject attr(se::Object::createPlainObject());
	bool ok = true;

	attr->setProperty("type", se::Value((int)from.type));
	attr->setProperty("start_index", se::Value(from.start_index));
	attr->setProperty("end_index", se::Value(from.end_index));

	std::visit(boyaa::overloaded{ [&attr, &ctx](const std::string& value)
								 {
									 attr->setProperty("value", se::Value(value));
								 },
								 [&attr, &ctx](teksto::FontWeight value)
								 {
									 attr->setProperty("value", se::Value((int)value));
								 },
								 [&attr, &ctx](int value)
								 {
									 attr->setProperty("value", se::Value((int)value));
								 },
								 [&attr, &ctx](teksto::FontSlant value)
								 {
									 attr->setProperty("value", se::Value((int)value));
								 },
								 [&attr, &ctx](const teksto::Color& value)
								 {
									 attr->setProperty("value", se::Value(convert_to_cc_color(value)));
								 },
								 [&attr, &ctx](const teksto::Vector& value)
								 {
									 cc::Vec2 v2;
									 v2.x = value.x;
									 v2.y = value.y;
									 se::Value seValue;
									 nativevalue_to_se(v2, seValue, ctx);
									 attr->setProperty("value", seValue);
								 },
								 [&attr, &ctx](const teksto::PaceHolder& value)
								 {
									 se::HandleObject valueObject(se::Object::createPlainObject());

									 valueObject->setProperty("x", se::Value(value.x));
									 valueObject->setProperty("y", se::Value(value.y));
									 valueObject->setProperty("width", se::Value(value.width));
									 valueObject->setProperty("height", se::Value(value.height));
									 valueObject->setProperty("image", se::Value(value.image.c_str()));
									 valueObject->setProperty("mode", se::Value((int)value.mode));

									 se::Value seValue;
									 seValue.setObject(valueObject);
									 attr->setProperty("value", seValue);
								 },
								 [&attr, &ctx](const std::pair<int, teksto::Color>& value)
								 {
									 se::HandleObject valueObject(se::Object::createPlainObject());
									 valueObject->setProperty("color", se::Value(convert_to_cc_color(value.second)));
									 valueObject->setProperty("int", se::Value(value.first));

									 se::Value seValue;
									 seValue.setObject(valueObject);
									 attr->setProperty("value", seValue);
								 },
								 [&attr, &ctx](std::nullopt_t value) {

								 } },
		from.value);
	if (ok)
		ret.setObject(attr);

	return ok;
}

inline bool nativevalue_to_se(const teksto::Rectangle& from, se::Value& ret, se::Object* ctx)
{ // NOLINT(readability-identifier-naming)
	se::HandleObject attr(se::Object::createPlainObject());
	bool ok = true;

	attr->setProperty("x", se::Value(from.x));
	attr->setProperty("y", se::Value(from.y));
	attr->setProperty("w", se::Value(from.w));
	attr->setProperty("h", se::Value(from.h));

	if (ok)
		ret.setObject(attr);

	return ok;
}


 inline bool nativevalue_to_se_vec_rect(const std::vector<teksto::Rectangle>& from, se::Value& ret, se::Object* ctx) { // NOLINT(readability-identifier-naming)
	se::HandleObject obj(se::Object::createArrayObject(from.size()));
	bool ok = true;

	auto size = static_cast<uint32_t>(from.size());
	for (uint32_t i = 0; i < size; ++i) {
		se::Value tmp;
		auto& vp = from[i];
		ok = nativevalue_to_se(vp, tmp, ctx);
		if (!ok || !obj->setArrayElement(i, tmp)) {
			ok = false;
			ret.setUndefined();
			break;
		}
	}

	if (ok) ret.setObject(obj);
	return ok;
 }

 inline bool nativevalue_to_se_attr_vec(const std::vector<teksto::Attribute>& from, se::Value& ret, se::Object* ctx) { // NOLINT(readability-identifier-naming)
	se::HandleObject obj(se::Object::createArrayObject(from.size()));
	bool ok = true;

	auto size = static_cast<uint32_t>(from.size());
	for (uint32_t i = 0; i < size; ++i) {
		se::Value tmp;
		auto& vp = from[i];
		ok = nativevalue_to_se(vp, tmp, ctx);
		if (!ok || !obj->setArrayElement(i, tmp)) {
			ok = false;
			ret.setUndefined();
			break;
		}
	}

	if (ok) ret.setObject(obj);
	return ok;
 }

inline bool nativevalue_to_se(const boyaa::MemoryImageSource &vp, se::Value &ret, se::Object *ctx)
{
	se::HandleObject imageSource(se::Object::createPlainObject());

	se::Value seData;
	seData.setObject(vp.data);

	imageSource->setProperty("_data", seData);
	imageSource->setProperty("_compressed", se::Value(vp.compressed));
	imageSource->setProperty("width", se::Value(vp.width));
	imageSource->setProperty("height", se::Value(vp.height));
	imageSource->setProperty("format", se::Value(static_cast<uint32_t>(vp.format)));

	se::Value mipmaplevelData;
	nativevalue_to_se(vp.mipmapLevelDataSize, mipmaplevelData);
	imageSource->setProperty("mipmapLevelDataSize", mipmaplevelData);

	ret.setObject(imageSource);

	return true;
}

inline bool nativevalue_to_se(const teksto::MessageString &from, se::Value &ret, se::Object *ctx)
{
	se::HandleObject messageStr(se::Object::createPlainObject());

	messageStr->setProperty("strs", se::Value(from.strs.c_str()));

	se::Value attrs;
	nativevalue_to_se_attr_vec(from.attrs, attrs, ctx);
	messageStr->setProperty("attrs", attrs);

	se::Value rects;
	nativevalue_to_se_vec_rect(from.rects, rects, ctx);
	messageStr->setProperty("rects", rects);

	ret.setObject(messageStr);

	return true;
}


inline bool nativevalue_to_se(const std::shared_ptr<boyaa::LabelChild> &vp, se::Value &ret, se::Object *ctx)
{
	se::HandleObject obj(se::Object::createPlainObject());
	ret.setObject(obj);

	obj->setProperty("type", se::Value(vp->type));
	obj->setProperty("x", se::Value(vp->x));
	obj->setProperty("y", se::Value(vp->y));
	obj->setProperty("width", se::Value(vp->width));
	obj->setProperty("height", se::Value(vp->height));

	switch (vp->type)
	{
	case boyaa::LabelChildType::BITMAP:
	{
		se::Value imageSourceValue;
		nativevalue_to_se(vp->imageSource, imageSourceValue, ctx);
		obj->setProperty("imageSource", imageSourceValue);

		obj->setProperty("color", se::Value(vp->color));
		obj->setProperty("bg_color", se::Value(vp->bg_color));
		break;
	}
	case boyaa::LabelChildType::PACE_HOLDER:
	{
		obj->setProperty("path", se::Value(vp->path));
		break;
	}
	case boyaa::LabelChildType::VECTOR:
	{
		obj->setProperty("color", se::Value(vp->color));
		break;
	}
	case boyaa::LabelChildType::CURSOR:
	{
		break;
	}
	}
	return true;
}

inline bool nativevalue_to_se_vec_child(const std::vector<std::shared_ptr<boyaa::LabelChild>> &from, se::Value &ret, se::Object *ctx)
{ // NOLINT(readability-identifier-naming)
	se::HandleObject obj(se::Object::createArrayObject(from.size()));
	bool ok = true;

	auto size = static_cast<uint32_t>(from.size());
	for (uint32_t i = 0; i < size; ++i)
	{
		se::Value tmp;
		auto &vp = from[i];
		ok = nativevalue_to_se(vp, tmp, ctx);
		if (!ok || !obj->setArrayElement(i, tmp))
		{
			ok = false;
			ret.setUndefined();
			break;
		}
	}

	if (ok)
		ret.setObject(obj);
	return ok;
}

bool sevalue_to_native(const se::Value &from, teksto::FontSlant *to, se::Object *ctx)
{
	if (!from.isNumber())
	{
		return false;
	}

	*to = static_cast<teksto::FontSlant>(from.toInt32());

	return true;
}

bool sevalue_to_native(const se::Value &from, teksto::FontWeight *to, se::Object *ctx)
{
	if (!from.isNumber())
	{
		return false;
	}

	*to = static_cast<teksto::FontWeight>(from.toInt32());

	return true;
}

bool sevalue_to_native(const se::Value &from, teksto::MessageType *to, se::Object *ctx)
{
	if (!from.isNumber())
	{
		return false;
	}

	*to = static_cast<teksto::MessageType>(from.toInt32());

	return true;
}

bool sevalue_to_native(const se::Value &from, teksto::PaceHolderMode *to, se::Object *ctx)
{
	if (!from.isNumber())
	{
		return false;
	}

	*to = static_cast<teksto::PaceHolderMode>(from.toInt32());

	return true;
}

bool sevalue_to_native(const se::Value &from, teksto::PaceHolder *to, se::Object *ctx)
{
	if (!from.isObject())
	{
		return false;
	}

	auto obj = from.toObject();

	se::Value temp;
	obj->getProperty("x", &temp);
	to->x = temp.toInt32();

	obj->getProperty("y", &temp);
	to->y = temp.toInt32();

	obj->getProperty("width", &temp);
	to->width = temp.toInt32();

	obj->getProperty("height", &temp);
	to->height = temp.toInt32();

	obj->getProperty("mode", &temp);
	to->mode = static_cast<teksto::PaceHolderMode>(temp.toInt32());

	obj->getProperty("image", &temp);
	to->image = temp.toString();

	return true;
}

template <>
bool sevalue_to_native<teksto::Message>(const se::Value &from, teksto::Message *to, se::Object *ctx)
{
	if (!from.isObject())
	{
		return false;
	}

	auto obj = from.toObject();

	se::Value temp;
	obj->getProperty("type", &temp);
	sevalue_to_native(temp, &to->type, ctx);
	//cc::Log::logMessage(cc::LogType::KERNEL, cc::LogLevel::WARN, "msg type:%d", to->type);

	switch (to->type)
	{
	case teksto::MessageType::Text:
	{
		//cc::Log::logMessage(cc::LogType::KERNEL, cc::LogLevel::WARN, "msg text:%d", to->type);
		if (obj->getProperty("msg", &temp) && temp.isString())
		{
			to->msg = temp.toString();
		}

		if (obj->getProperty("family", &temp) && temp.isString())
		{
			to->family = temp.toString();
		}

		if (obj->getProperty("size", &temp) && temp.isNumber())
		{
			to->size = temp.toInt32();
		}

		if (obj->getProperty("color", &temp) && temp.isNumber())
		{
			to->font_color = teksto::Color(temp.toUint32());
		}

		if (obj->getProperty("bg_color", &temp) && temp.isNumber())
		{
			to->bg_color = teksto::Color(temp.toUint32());
		}

		if (obj->getProperty("outline_color", &temp) && temp.isNumber())
		{
			to->outline_color = teksto::Color(temp.toUint32());
		}

		if (obj->getProperty("underline_color", &temp) && temp.isNumber())
		{
			to->underline_color = teksto::Color(temp.toUint32());
		}

		if (obj->getProperty("middleline_color", &temp) && temp.isNumber())
		{
			to->middleline_color = teksto::Color(temp.toUint32());
		}

		if (obj->getProperty("slan", &temp) && temp.isNumber())
		{
			sevalue_to_native(temp, &to->slan);
		}

		if (obj->getProperty("weight", &temp) && temp.isNumber())
		{
			sevalue_to_native(temp, &to->weight);
		}

		break;
	}
	case teksto::MessageType::Pic:
	{
		if (obj->getProperty("msg", &temp) && temp.isString())
		{
			to->msg = temp.toString();
		}

		if (obj->getProperty("x", &temp) && temp.isNumber())
		{
			to->x = temp.toInt32();
		}
		if (obj->getProperty("y", &temp) && temp.isNumber())
		{
			to->y = temp.toInt32();
		}

		if (obj->getProperty("width", &temp) && temp.isNumber())
		{
			to->width = temp.toInt32();
		}

		if (obj->getProperty("height", &temp) && temp.isNumber())
		{
			to->height = temp.toInt32();
		}

		if (obj->getProperty("mode", &temp) && temp.isNumber())
		{
			to->mode = static_cast<teksto::PaceHolderMode>(temp.toInt32());
		}
		break;
	}
	}

	return true;
}

bool sevalue_to_native_vec_msg(const se::Value& from, ccstd::vector<teksto::Message>* to, se::Object* ctx) { // NOLINT(readability-identifier-naming)
	using CUR_T = teksto::Message;
	if (from.isNullOrUndefined()) {
		to->clear();
		return true;
	}

	CC_ASSERT(from.toObject());
	se::HandleObject array(unwrapProxyObject(from.toObject()));
	//cc::Log::logMessage(cc::LogType::KERNEL, cc::LogLevel::WARN, "vec msg isArray:%d", array->isArray());

	if (array->isArray()) {
		uint32_t len = 0;
		array->getArrayLength(&len);
		to->resize(len);
		//cc::Log::logMessage(cc::LogType::KERNEL, cc::LogLevel::WARN, "vec msg length:%d", len);
		se::Value tmp;
		for (uint32_t i = 0; i < len; i++) {
			array->getArrayElement(i, &tmp);
			if (!sevalue_to_native(tmp, to->data() + i, ctx)) {
				SE_LOGE("vector %s convert error at %d\n", typeid(CUR_T).name(), i);
			}
		}
		return true;
	}

	if (array->isTypedArray()) {
		CC_ASSERT(std::is_arithmetic<CUR_T>::value);
		uint8_t* data = nullptr;
		size_t dataLen = 0;
		array->getTypedArrayData(&data, &dataLen);
		to->assign(reinterpret_cast<CUR_T*>(data), reinterpret_cast<CUR_T*>(data + dataLen));
		return true;
	}

	SE_LOGE("[warn] failed to convert to ccstd::vector\n");
	return false;
}

namespace boyaa
{

	se::Class *__jsb_boyaa_TekstoLabel_class = nullptr;
	se::Object *__jsb_boyaa_TekstoLabel_proto = nullptr;
	static bool js_new_boyaa_TekstoLabel(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();

		NativeTekstoLabel *result;
		result = (NativeTekstoLabel *)new NativeTekstoLabel();

		auto *ptr = JSB_MAKE_PRIVATE_OBJECT_WITH_INSTANCE(result);
		s.thisObject()->setPrivateObject(ptr);
		return true;
	}

	static bool js_delete_boyaa_TekstoLabel(se::State &s)
	{
		return true;
	}
	SE_BIND_FINALIZE_FUNC(js_delete_boyaa_TekstoLabel)
	SE_BIND_CTOR(js_new_boyaa_TekstoLabel, __jsb_boyaa_TekstoLabel_class, js_delete_boyaa_TekstoLabel)

	static bool js_boyaa_TekstoLabel_set_text(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
			return false;
		}

		ccstd::vector<teksto::Message> texts;

		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		ok &= sevalue_to_native_vec_msg(args[0], &texts, s.thisObject());

		bool result = arg1->set_text(texts);

		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_set_text)

	static bool js_boyaa_TekstoLabel_display(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 2)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		cc::Size size;
		int width = 0, height = 0;
		ok &= sevalue_to_native(args[0], &width, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		ok &= sevalue_to_native(args[1], &height, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		arg1->display(width, height);

		size.width = width;
		size.height = height;

		ok &= nativevalue_to_se(size, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(size, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_display)

	static bool js_boyaa_TekstoLabel_set_html_text(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		std::string html_text;

		ok &= sevalue_to_native(args[0], &html_text, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		arg1->set_html_text(html_text);

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_set_html_text)

	static bool js_boyaa_TekstoLabel_set_max_lines(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int lines;

		ok &= sevalue_to_native(args[0], &lines, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		arg1->set_max_lines(lines);

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_set_max_lines)

	static bool js_boyaa_TekstoLabel_max_lines(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int max_lines = arg1->max_lines();

		ok &= nativevalue_to_se(max_lines, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(max_lines, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_max_lines)

	static bool js_boyaa_TekstoLabel_set_line_space(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		float line_space;

		ok &= sevalue_to_native(args[0], &line_space, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		bool result = arg1->set_line_space(line_space);

		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_set_line_space)

	static bool js_boyaa_TekstoLabel_line_space(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		float line_space = arg1->line_space();

		ok &= nativevalue_to_se(line_space, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(line_space, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_line_space)

	static bool js_boyaa_TekstoLabel_set_letter_spacing(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int letter_spacing;

		ok &= sevalue_to_native(args[0], &letter_spacing, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		bool result = arg1->set_letter_spacing(letter_spacing);
		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_set_letter_spacing)

	static bool js_boyaa_TekstoLabel_letter_spacing(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int letter_spacing = arg1->letter_spacing();

		ok &= nativevalue_to_se(letter_spacing, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(letter_spacing, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_letter_spacing)

	static bool js_boyaa_TekstoLabel_set_ellipsis_char(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int32_t ellipsis_char;

		ok &= sevalue_to_native(args[0], &ellipsis_char, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		arg1->set_ellipsis_char(ellipsis_char);

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_set_ellipsis_char)

	static bool js_boyaa_TekstoLabel_ellipsis_char(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int32_t ellipsis_char = arg1->ellipsis_char();

		ok &= nativevalue_to_se(ellipsis_char, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(ellipsis_char, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_ellipsis_char)

	static bool js_boyaa_TekstoLabel_set_line_truncate_mode(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int mode;

		ok &= sevalue_to_native(args[0], &mode, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		bool result = arg1->set_line_truncate_mode(static_cast<teksto::LineTruncateMode>(mode));

		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_set_line_truncate_mode)

	static bool js_boyaa_TekstoLabel_line_truncate_mode(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int mode = static_cast<int>(arg1->line_truncate_mode());

		ok &= nativevalue_to_se((int)mode, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE((int)mode, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_line_truncate_mode)

	static bool js_boyaa_TekstoLabel_set_horizontal_alignment(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int mode;

		ok &= sevalue_to_native(args[0], &mode, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		bool result = arg1->set_horizontal_alignment(static_cast<teksto::LineAlignment>(mode));

		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_set_horizontal_alignment)

	static bool js_boyaa_TekstoLabel_horizontal_alignment(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int mode = static_cast<int>(arg1->horizontal_alignment());

		ok &= nativevalue_to_se((int)mode, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE((int)mode, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_horizontal_alignment)

	static bool js_boyaa_TekstoLabel_set_vertical_alignment(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int mode;

		ok &= sevalue_to_native(args[0], &mode, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		bool result = arg1->set_vertical_alignment(static_cast<teksto::TextAlignment>(mode));
		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_set_vertical_alignment)

	static bool js_boyaa_TekstoLabel_vertical_alignment(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int mode = static_cast<int>(arg1->vertical_alignment());

		ok &= nativevalue_to_se((int)mode, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE((int)mode, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_vertical_alignment)

	static bool js_boyaa_TekstoLabel_set_layout_alignment(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int mode;

		ok &= sevalue_to_native(args[0], &mode, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		bool result = arg1->set_layout_alignment(static_cast<teksto::LayoutAlignment>(mode));

		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_set_layout_alignment)

	static bool js_boyaa_TekstoLabel_remove(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 0)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int n;
		ok &= sevalue_to_native(args[0], &n, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		arg1->remove(n);

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_remove)

	static bool js_boyaa_TekstoLabel_insert(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 0)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		std::string str;
		ok &= sevalue_to_native(args[0], &str, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		arg1->insert(str);

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_insert)

	static bool js_boyaa_TekstoLabel_select(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 3)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		cc::Vec2 from, to;
		bool copy;

		ok &= sevalue_to_native(args[0], &from, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		ok &= sevalue_to_native(args[1], &to, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		ok &= sevalue_to_native(args[2], &copy, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		teksto::Vector tkFrom, tkTo;
		tkFrom.x = from.x;
		tkFrom.y = from.y;

		tkTo.x = to.x;
		tkTo.y = to.y;

		auto result = arg1->select(tkFrom, tkTo, copy);

		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_select)

	static bool js_boyaa_TekstoLabel_set_cursor(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 2)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int x, y;

		ok &= sevalue_to_native(args[0], &x, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		ok &= sevalue_to_native(args[1], &y, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		arg1->set_cursor(x, y);

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_set_cursor)

	static bool js_boyaa_TekstoLabel_layout_alignment(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		int mode = static_cast<int>(arg1->layout_alignment());

		ok &= nativevalue_to_se((int)mode, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE((int)mode, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_layout_alignment)

	static bool js_boyaa_TekstoLabel_measure(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 2)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		cc::Size size;
		int width = 0, height = 0;
		ok &= sevalue_to_native(args[0], &width, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		ok &= sevalue_to_native(args[1], &height, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		arg1->measure(width, height);
		size.width = width;
		size.height = height;
		ok &= nativevalue_to_se(size, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(size, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_measure)

	static bool js_boyaa_TekstoLabel_get_childrens(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 0)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		arg1 = SE_THIS_OBJECT<boyaa::NativeTekstoLabel>(s);
		if (nullptr == arg1)
			return true;

		auto childrens = arg1->getChildrens();

		ok &= nativevalue_to_se_vec_child(childrens, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(childrens, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_get_childrens)

	static bool js_boyaa_TekstoLabel_register_place_holder(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;

		if (argc != 3)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}
		std::string key;
		int width, height;
		ok &= sevalue_to_native(args[0], &key, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		ok &= sevalue_to_native(args[1], &width, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		ok &= sevalue_to_native(args[2], &height, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		bool result = NativeTekstoLabel::get_shared_context()->register_holder(key, width, height);

		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_register_place_holder)

	static bool js_boyaa_TekstoLabel_unregister_place_holder(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}

		std::string key;
		ok &= sevalue_to_native(args[0], &key, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		bool result = NativeTekstoLabel::get_shared_context()->unregister_holder(key);

		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_unregister_place_holder)

	static bool js_boyaa_TekstoLabel_register_font(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();
		if (argc < 1 || argc > 2)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}

		boyaa::NativeTekstoLabel *arg1 = (boyaa::NativeTekstoLabel *)nullptr;
		std::string result = "";
		std::string path = "";
		std::optional<std::string> tag = std::nullopt;

		ok &= sevalue_to_native(args[0], &path, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		if (argc == 2)
		{
			std::string tempTag;

			ok &= sevalue_to_native(args[1], &tempTag, s.thisObject());
			SE_PRECONDITION2(ok, false, "Error processing arguments");

			tag = std::move(tempTag);
		}

		path = cc::FileUtils::getInstance()->fullPathForFilename(path);
		result = NativeTekstoLabel::get_shared_context()->register_font(path, tag);
		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_register_font)

	static bool js_boyaa_TekstoLabel_unregister_font(se::State &s)
	{
		CC_UNUSED bool ok = true;
		const auto &args = s.args();
		size_t argc = args.size();

		if (argc != 1)
		{
			SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
			return false;
		}

		std::string path;
		ok &= sevalue_to_native(args[0], &path, s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");

		std::string result = NativeTekstoLabel::get_shared_context()->unregister_font(path);

		ok &= nativevalue_to_se(result, s.rval(), s.thisObject());
		SE_PRECONDITION2(ok, false, "Error processing arguments");
		SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());

		return true;
	}
	SE_BIND_FUNC(js_boyaa_TekstoLabel_unregister_font)
	bool register_all_teksto_label_manual(se::Object *ns)
	{
		auto *cls = se::Class::create("NativeTekstoLabel", ns, __jsb_boyaa_TekstoLabel_proto, _SE(js_new_boyaa_TekstoLabel));
		cls->defineFunction("set_text", _SE(js_boyaa_TekstoLabel_set_text));
		cls->defineFunction("set_html_text", _SE(js_boyaa_TekstoLabel_set_html_text));
		cls->defineFunction("display", _SE(js_boyaa_TekstoLabel_display));
		cls->defineFunction("measure", _SE(js_boyaa_TekstoLabel_measure));
		cls->defineFunction("set_max_lines", _SE(js_boyaa_TekstoLabel_set_max_lines));
		cls->defineFunction("set_line_space", _SE(js_boyaa_TekstoLabel_set_line_space));
		cls->defineFunction("set_letter_spacing", _SE(js_boyaa_TekstoLabel_set_letter_spacing));
		cls->defineFunction("set_ellipsis_char", _SE(js_boyaa_TekstoLabel_set_ellipsis_char));
		cls->defineFunction("set_line_truncate_mode", _SE(js_boyaa_TekstoLabel_set_line_truncate_mode));
		cls->defineFunction("set_horizontal_alignment", _SE(js_boyaa_TekstoLabel_set_horizontal_alignment));
		cls->defineFunction("set_vertical_alignment", _SE(js_boyaa_TekstoLabel_set_vertical_alignment));
		cls->defineFunction("set_layout_alignment", _SE(js_boyaa_TekstoLabel_set_layout_alignment));

		cls->defineFunction("layout_alignment", _SE(js_boyaa_TekstoLabel_layout_alignment));
		cls->defineFunction("vertical_alignment", _SE(js_boyaa_TekstoLabel_vertical_alignment));
		cls->defineFunction("horizontal_alignment", _SE(js_boyaa_TekstoLabel_horizontal_alignment));
		cls->defineFunction("line_truncate_mode", _SE(js_boyaa_TekstoLabel_line_truncate_mode));
		cls->defineFunction("ellipsis_char", _SE(js_boyaa_TekstoLabel_ellipsis_char));
		cls->defineFunction("letter_spacing", _SE(js_boyaa_TekstoLabel_letter_spacing));
		cls->defineFunction("line_space", _SE(js_boyaa_TekstoLabel_line_space));
		cls->defineFunction("max_lines", _SE(js_boyaa_TekstoLabel_max_lines));
		cls->defineFunction("get_childrens", _SE(js_boyaa_TekstoLabel_get_childrens));

		cls->defineFunction("remove", _SE(js_boyaa_TekstoLabel_remove));
		cls->defineFunction("insert", _SE(js_boyaa_TekstoLabel_insert));
		cls->defineFunction("select", _SE(js_boyaa_TekstoLabel_select));
		cls->defineFunction("set_cursor", _SE(js_boyaa_TekstoLabel_set_cursor));

		cls->defineStaticFunction("register_place_holder", _SE(js_boyaa_TekstoLabel_register_place_holder));
		cls->defineStaticFunction("unregister_place_holder", _SE(js_boyaa_TekstoLabel_unregister_place_holder));
		cls->defineStaticFunction("register_font", _SE(js_boyaa_TekstoLabel_register_font));
		cls->defineStaticFunction("unregister_font", _SE(js_boyaa_TekstoLabel_unregister_font));

		cls->install();
		JSBClassType::registerClass<boyaa::NativeTekstoLabel>(cls);
		__jsb_boyaa_TekstoLabel_class = cls;
		__jsb_boyaa_TekstoLabel_proto = cls->getProto();
		se::ScriptEngine::getInstance()->clearException();

		return true;
	}
}