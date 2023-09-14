#pragma once

#include "teksto.h"

namespace teksto {

class EXPORT Canvas {
public:
    virtual int width() const = 0;
    virtual int height() const = 0;

    virtual void render_bitmap(Bitmap *bitmap, int left, int top, int x_advance, int y_advance) = 0;
    virtual void render_vector(VectorType type, int height) = 0;
    virtual void render_pace_holder(std::string image, int width, int height) = 0;

    virtual void begin_bitmap_pass(const std::optional<Color> &color) = 0;
    virtual void end_bitmap_pass() = 0;
    virtual void begin_vector_pass(const std::optional<Color> &color) = 0;
    virtual void end_vector_pass() = 0;

    virtual void begin_block(int width, int ascender, int descender,
                           const std::optional<Color> &bg_color) = 0;
    virtual void end_block() = 0;

    virtual std::pair<int /*x*/, int /*y*/> cur_pen_pos() = 0;
    virtual void set_pen_pos(int x, int y) = 0;
    virtual void advance_pen_pos(int x, int y) = 0;
};

}  // namespace teksto
