#include <memory>
#include <string>
#include <vector>
#include <string_view>

#include "attribute.h"
#include "canvas.h"
#include "context.h"
#include "teksto.h"

namespace teksto {

namespace impl {
class Layout;
}

class EXPORT Layout {
    using LayoutImpl = impl::Layout;

public:
    Layout(std::shared_ptr<Context> context);
    ~Layout();

    void set_html(const std::string& text);

    // 一次性设置，当设置的内容跟原内容一样的时候返回false
    bool set_text(const std::vector<Message>& texts);

    MessageString select(Vector from, Vector to, bool copy = false);

    std::string& text();

    bool add_paceholder(PaceHolder& pace_holder);
    void clear_paceholder();

    bool layout(int &width, int &height);
    // 测量文本实际分辨率，并使用该实际分辨率作为canvas的分辨率
    bool measure(int &width, int &height);
    bool render(Canvas &canvas);

    bool set_max_lines(int lines);
    int max_lines() const;

    // 行距(倍数)
    bool set_line_spacing(float line_spacing);
    float line_spacing() const;
    // 间距
    bool set_letter_spacing(int letter_spacing);
    int letter_spacing() const;

    // 省略号
    char32_t ellipsis_char() const;
    void set_ellipsis_char(char32_t ellipsis_char);

    bool set_line_break_mode(LineBreakMode mode);
    LineBreakMode line_break_mode() const;

    bool set_line_truncate_mode(LineTruncateMode mode);
    LineTruncateMode line_truncate_mode() const;

    bool set_line_alignment(LineAlignment alignment);
    LineAlignment line_alignment() const;

    bool set_text_alignment(TextAlignment alignment);
    TextAlignment text_alignment() const;

    bool set_layout_alignment(LayoutAlignment alignment);
    LayoutAlignment layout_alignment() const;

    int width() const;
    int height() const;

    bool get_cursor(SpaceVector& sv);
    bool set_cursor(int x, int y);
    bool begin();
    bool end();
    bool next();
    bool prev();
    bool next_line();
    bool prev_line();
    bool remove(int n);
    bool insert(std::string str);
    bool insert(const MessageString& mstr);

    std::shared_ptr<Context> &context();

private:
    std::shared_ptr<LayoutImpl> _impl;
};

}  // namespace teksto

