#pragma once

#include <optional>
#include <sstream>
#include <algorithm>
#include <vector>
#include <string>
#include "color.h"

#ifdef _WIN32
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

namespace teksto {

typedef bool (*IsCustomEmojiFunction)(std::string_view str);

enum class AttributeType;
struct Attribute;

enum class LineBreakMode {
    WordWrapping = 0,
    CharWrapping,
};

enum class LineTruncateMode {
    Clipping = 0,
    ByHead,
    ByTail,
    ByMiddle,
};

// 行文字的水平排版
enum class LineAlignment {
    // Natual = 0,
    Left = 0,
    Right,
    Center,
    Justified,
};

// 行文字的垂直排版
enum class TextAlignment {
    Top = 0,
    Bottom,
    Center,
    Baseline,
};

enum class LayoutAlignment {
    Top = 0,
    Bottom,
    Center,
};

struct Vector {
public:
    int x = 0;
    int y = 0;

    void adjust() {
        if (-1 != x) {
            x = (std::max)(x, 0);
        }
        if (-1 != y) {
            y = (std::max)(y, 0);
        }
    }

    bool is_end() {return -1 == x && -1 == y; }

    bool operator==(const Vector& o) const noexcept {
        return x == o.x && y == o.y;
    };

    std::string string() const noexcept {
        std::stringstream ss;
        ss << "{" << x << ", " << y << "}";
        return ss.str();
    }
};

struct SpaceVector {
    int x = 0;
    int y = 0;
    int h = 0;

    void adjust() {
        x = (std::max)(x, 0);
        y = (std::max)(y, 0);
        h = (std::max)(h, 0);
    }

    bool operator==(const SpaceVector& o) const noexcept {
        return x == o.x && y == o.y && h == o.h;
    };

    std::string string() const noexcept {
        std::stringstream ss;
        ss << "{" << x << ", " << y << ", " << h << "}";
        return ss.str();
    }
};

struct Rectangle {
    int x = 0;
    int y = 0;
    int w = 0;
    int h = 0;

    bool operator==(const Rectangle& o) const noexcept {
        return x == o.x && y == o.y && w == o.w && h == o.h;
    };

    std::string string() const noexcept {
        std::stringstream ss;
        ss << "{" << x << ", " << y << ", " << w << ", " << h << "}";
        return ss.str();
    }
};

enum class FontSlant {
    Normal = 0,
    Italic, // 字体设计就是倾斜的
    Oblique, // 模拟倾斜
};

enum class FontWeight {
    Thin = 0x10,
    Normal,
    Bold,
    Heavy,
};

enum class PixelMode {
    Gray = 0,
    RGB = 1,
    BGRA = 2,
};

enum class VectorType {
    HorizontalLine = 0,  // 水平线
    VerticalLine,        // 垂直线
};

enum class PaceHolderMode {
    Inline = 0,  // 行内
    SingleLine,  // 单独一行
    Encircle,    // 环绕
};

struct Bitmap {
    int width;
    int rows;
    int pitch;
    PixelMode mode;
    unsigned char* buffer;
};

enum class MessageType {
    Text,
    Pic,
    Unkonw
};

enum class HtmlListType {
    a, // 表示小写英文字母编号
    A, // 表示大写英文字母编号
    i, // 表示小写罗马数字编号
    I, // 表示大写罗马数字编号
    One, // 表示数字编号（默认）编号类型适用于整个列表，除非在 <ol> 元素的 <li> 元素中使用不同的 type 属性。
    Dot, // 表示一系列无序的列表项目，通常渲染为项目符号列表
};

static inline std::string to_string(LineBreakMode val) {
    switch (val) {
        case LineBreakMode::WordWrapping:
            return "WordWrapping";
        case LineBreakMode::CharWrapping:
            return "CharWrapping";
        default:
            return std::string();
    }
}

static inline std::string to_string(LineTruncateMode val) {
    switch (val) {
        case LineTruncateMode::Clipping:
            return "Clipping";
        case LineTruncateMode::ByHead:
            return "ByHead";
        case LineTruncateMode::ByTail:
            return "ByTail";
        case LineTruncateMode::ByMiddle:
            return "ByMiddle";
        default:
            return std::string();
    }
}

static inline std::string to_string(LineAlignment val) {
    switch (val) {
        case LineAlignment::Left:
            return "Left";
        case LineAlignment::Right:
            return "Right";
        case LineAlignment::Center:
            return "Center";
        case LineAlignment::Justified:
            return "Justified";
        default:
            return std::string();
    }
}

static inline std::string to_string(TextAlignment val) {
    switch (val) {
        case TextAlignment::Top:
            return "Top";
        case TextAlignment::Bottom:
            return "Bottom";
        case TextAlignment::Center:
            return "Center";
        case TextAlignment::Baseline:
            return "Baseline";
        default:
            return std::string();
    }
}

static inline std::string to_string(LayoutAlignment val) {
    switch (val) {
        case LayoutAlignment::Top:
            return "Top";
        case LayoutAlignment::Bottom:
            return "Bottom";
        case LayoutAlignment::Center:
            return "Center";
        default:
            return std::string();
    }
}

static inline std::string to_string(FontSlant val) {
    switch (val) {
        case FontSlant::Normal:
            return "Normal";
        case FontSlant::Italic:
            return "Italic";
        case FontSlant::Oblique:
            return "Oblique";
        default:
            return std::string();
    }
}

static inline std::string to_string(FontWeight val) {
    switch (val) {
        case FontWeight::Thin:
            return "Thin";
        case FontWeight::Normal:
            return "Normal";
        case FontWeight::Bold:
            return "Bold";
        case FontWeight::Heavy:
            return "Heavy";
        default:
            return std::string();
    }
}

static inline std::string to_string(PixelMode val) {
    switch (val) {
        case PixelMode::Gray:
            return "Gray";
        case PixelMode::RGB:
            return "RGB";
        case PixelMode::BGRA:
            return "BGRA";
        default:
            return std::string();
    }
}

static inline std::string to_string(VectorType val) {
    switch (val) {
        case VectorType::HorizontalLine:
            return "HorizontalLine";
        case VectorType::VerticalLine:
            return "VerticalLine";
        default:
            return std::string();
    }
}

static inline std::string to_string(PaceHolderMode val) {
    switch (val) {
        case PaceHolderMode::Inline:
            return "Inline";
        case PaceHolderMode::SingleLine:
            return "SingleLine";
        case PaceHolderMode::Encircle:
            return "Encircle";
        default:
            return std::string();
    }
}

struct Message {
    MessageType type = MessageType::Unkonw;
    std::string msg;
    std::string family;
    int x = 0;
    int y = 0;
    int width  = 0;
    int height = 0;
    int size = 28;
    int stroke = 0;
    Color font_color = white;
    FontSlant slan = FontSlant::Normal;
    FontWeight weight = FontWeight::Normal;
    std::optional<Color> bg_color;
    std::optional<Color> outline_color;
    std::optional<Color> underline_color;
    std::optional<Color> middleline_color;
    PaceHolderMode mode = PaceHolderMode::Inline;

    Message() {}

    void set_text(const std::string& text, int size = 28, FontSlant slan = FontSlant::Normal, FontWeight weight = FontWeight::Normal) {
        this->type = MessageType::Text;
        this->msg = text;
        this->size = size;
        this->slan = slan;
        this->weight = weight;
    }

    void set_text_color(Color c) {
        this->font_color = std::move(c);
    }

    void set_text_bg_color(Color c) {
        this->bg_color = std::move(c);
    }

    void set_text_middleline_color(Color c) {
        this->middleline_color = std::move(c);
    }

    void set_text_underline_color(Color c) {
        this->underline_color = std::move(c);
    }

    void set_text_outline_color(int stroke, Color c) {
        this->stroke = stroke;
        this->outline_color = std::move(c);
    }

    void set_pic(const std::string& pic, int x, int y, int width, int height, PaceHolderMode mode = PaceHolderMode::Inline) {
        this->type = MessageType::Pic;
        this->msg = pic;
        this->x = x;
        this->y = y;
        this->width = width;
        this->height = height;
        this->mode = mode;
    }

    bool empty() const noexcept {
        return (type == MessageType::Unkonw) || (type == MessageType::Text && msg.empty()) || (type == MessageType::Pic && msg.empty());
    }

    bool is_text() const noexcept {
        return type == MessageType::Text;
    }

    bool is_pic() const noexcept {
        return type == MessageType::Pic;
    }

    std::string to_string() const noexcept {
        if (type == MessageType::Unkonw) {
            return "Unkonw Message";
        }

        std::ostringstream ss;
        ss << (is_pic() ? "PIC" : "Text") << " Message " << "{" << std::endl;
        ss << "\t" << "msg: '" << msg << "'" << std::endl;
        if (is_pic()) {
            ss << "\t" << "x: " << x << std::endl;
            ss << "\t" << "y: " << y << std::endl;
            ss << "\t" << "width: " << width << std::endl;
            ss << "\t" << "height: " << height << std::endl;
            ss << "\t" << "mode: " << teksto::to_string(mode) << std::endl;
        } else {
            ss << "\t" << "size: " << size << std::endl;
            ss << "\t" << "font_color: " << font_color.to_string() << std::endl;
            ss << "\t" << "slan: " << teksto::to_string(slan) << std::endl;
            ss << "\t" << "weight: " << teksto::to_string(weight) << std::endl;
            if (family.size()) {
                ss << "\t" << "family: " << family << std::endl;
            }
            if (bg_color.has_value())
                ss << "\t" << "bg_color: " << bg_color.value().to_string() << std::endl;
            if (stroke > 0 && outline_color.has_value())
                ss << "\t" << "outline: " << stroke << " | " << outline_color.value().to_string() << std::endl;
            if (underline_color.has_value())
                ss << "\t" << "underline_color: " << underline_color.value().to_string() << std::endl;
            if (middleline_color.has_value())
                ss << "\t" << "middleline_color: " << middleline_color.value().to_string() << std::endl;
        }
        ss << "}" << std::endl;
        return ss.str();
    }

    bool is_same_attribute(const Message& o) const noexcept {
        if (type == o.type && type == MessageType::Unkonw) {
            return true;
        }

        if (type == o.type && type == MessageType::Pic) {
            return x == o.x && y == o.y && width == o.width && height == o.height && mode == o.mode;
        }

        if (type == o.type && type == MessageType::Text) {
            #define IS_SAME(x) ((!x.has_value() && !o.x.has_value()) || (x.has_value() && o.x.has_value() && x == o.x))
            return size == o.size && font_color == o.font_color &&
                slan == o.slan && weight == o.weight && stroke == o.stroke && 0 == family.compare(o.family) &&
                IS_SAME(bg_color) && IS_SAME(outline_color) && IS_SAME(underline_color) && IS_SAME(middleline_color);
        }

        return false;
    }

    bool operator==(const Message& o) const noexcept {
        if (type == o.type && type == MessageType::Unkonw) {
            return true;
        }

        return is_same_attribute(o) && 0 == msg.compare(o.msg);
    }
};

struct MessageString {
    std::string strs;
    std::vector<Attribute> attrs;
    std::vector<Rectangle> rects;
};

struct PaceHolder {
    int x;
    int y;
    int width;
    int height;
    std::string image;
    PaceHolderMode mode;

    bool operator==(const PaceHolder& o) const noexcept {
        return x == o.x && y == o.y && width == o.width && height == o.height
               && image == o.image && mode == o.mode;
    };

    std::string to_string() {
        std::stringstream ss;
        ss << "PaceHolder {" << std::endl
           << "\t" << "x: " << x << std::endl
           << "\t" << "y: " << y << std::endl
           << "\t" << "width: " << width << std::endl
           << "\t" << "height: " << height << std::endl
           << "\t" << "image: " << image << std::endl
           << "\t" << "mode: " << teksto::to_string(mode) << std::endl
           << "}" << std::endl;
        return ss.str();
    }
};

// 空白区域
struct HollowArea {
    int x;
    int width;

    bool operator==(const HollowArea& o) const noexcept {
        return x == o.x && width == o.width;
    };
};

}  // namespace teksto
