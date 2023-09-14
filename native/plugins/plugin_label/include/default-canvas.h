#pragma once

#include <optional>
#include <string>

#include "canvas.h"
#include "teksto.h"

namespace teksto {

enum class CanvasMode {
    AI88 = 0,
    RGBA8888 = 1,
};

class EXPORT DefaultCanvas : public Canvas {
public:
    DefaultCanvas(int width, int height, CanvasMode mode);
    virtual ~DefaultCanvas() = default;

    int width() const override { return _width; }
    int height() const override { return _height; }

    void render_bitmap(Bitmap *bitmap, int left, int top, int x_advance,
                int y_advance) override;

    void render_vector(VectorType type, int height) override {}

    void render_pace_holder(std::string image, int width, int height) override {}

    void begin_bitmap_pass(const std::optional<Color> &color) override {
        _context_color = color;
    }
    void end_bitmap_pass() override {}

    void begin_vector_pass(const std::optional<Color> &color) override {}
    void end_vector_pass() override {}

    void begin_block(int width, int ascender, int descender,
                     const std::optional<Color> &bg_color) override;
    void end_block() override;

    std::pair<int, int> cur_pen_pos() override {
        return std::make_pair(_pen_cur_x, _pen_cur_y);
    }

    void set_pen_pos(int x, int y) override {
        _pen_cur_x = x;
        _pen_cur_y = y;
    }
    void advance_pen_pos(int x, int y) override {
        _pen_cur_x += x;
        _pen_cur_y += y;
    }

    std::string &buffer() { return _buf; }

    bool save(const char *path) const;

private:
    int _width;
    int _height;
    CanvasMode _mode;
    std::string _buf;

    std::optional<Color> _context_color;

    int _pen_cur_x = 0;
    int _pen_cur_y = 0;
};

}  // namespace teksto
