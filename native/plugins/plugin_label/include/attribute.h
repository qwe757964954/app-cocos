#pragma once

#include <map>
#include <sstream>
#include <string>
#include <variant>

#include "teksto.h"

namespace teksto {

enum class EXPORT AttributeType {
    FontFamily = 0,
    FontWeight,
    FontSize,
    FontSlant,
    Color,
    BackgroundColor,
    ShadowColor,
    ShadowOffset,
    Underline,
    Middleline,
    Overline,
    Outline,
    PaceHolder,
    Null,
};

#define ATTR_STR(a) \
    { a, #a }
static std::map<AttributeType, const char*> attr_str_map = {
    ATTR_STR(AttributeType::FontFamily),
    ATTR_STR(AttributeType::FontWeight),
    ATTR_STR(AttributeType::FontSize),
    ATTR_STR(AttributeType::FontSlant),
    ATTR_STR(AttributeType::Color),
    ATTR_STR(AttributeType::BackgroundColor),
    ATTR_STR(AttributeType::ShadowColor),
    ATTR_STR(AttributeType::ShadowOffset),
    ATTR_STR(AttributeType::Underline),
    ATTR_STR(AttributeType::Middleline),
    ATTR_STR(AttributeType::Overline),
    ATTR_STR(AttributeType::Outline),
    ATTR_STR(AttributeType::PaceHolder),
    ATTR_STR(AttributeType::Null),
};

using AttrValue =
    std::variant<std::string, FontWeight, int, FontSlant, Color, Color, Color,
                 Vector, Color, Color, Color, std::pair<int, Color>,
                 PaceHolder, nullptr_t>;

struct EXPORT Attribute {
public:
    // 字体名字
    static Attribute font_family(std::string name, int start = 0, int end = -1);
    // 字体风格
    static Attribute font_weight(FontWeight weight, int start = 0,
                                 int end = -1);
    // 字体大小
    static Attribute font_size(int size, int start = 0, int end = -1);
    // 字体风格
    static Attribute font_slant(FontSlant style, int start = 0, int end = -1);
    // 字体颜色
    static Attribute color(Color color, int start = 0, int end = -1);
    // 字体背景色
    static Attribute background_color(Color color, int start = 0, int end = -1);
    // 阴影颜色
    static Attribute shadow_color(Color color, int start = 0, int end = -1);
    // 阴影偏移量
    static Attribute shadow_offset(Vector color, int start = 0, int end = -1);
    // 下划线
    static Attribute underline(Color color, int start = 0, int end = -1);
    // 中线
    static Attribute middleline(Color color, int start = 0, int end = -1);
    // 上划线
    static Attribute overline(Color color, int start = 0, int end = -1);
    // outline
    static Attribute outline(std::pair<int, Color> outline, int start = 0,
                             int end = -1);
    // image
    static Attribute pace_holder(PaceHolder pace_holder, int start = 0,
                           int end = -1);
    static Attribute null();

    bool operator==(const Attribute& other) const noexcept {
        return other.type == type && other.start_index == start_index
               && other.end_index == end_index && other.value == value;
    }
    bool operator!=(const Attribute& other) const noexcept {
        return !(other == *this);
    }
    operator bool() const { return type != AttributeType::Null; }

    std::string String() const {
        std::ostringstream ss;
        ss << "{ Type: " << attr_str_map[type]
           << ", StartIndex: " << start_index << ", EndIndex: " << end_index
           << "}";
        return ss.str();
    }

public:
    AttributeType type;
    int start_index;
    int end_index;
    AttrValue value;
};

}  // namespace teksto
