//
//  geometry.h
//  ghost
//
//  Created by VicentGong on 14-3-11.
//  Copyright (c) 2014 GongWenzhu. All rights reserved.
//

#pragma once

#define CLAMP(a, mn, mx) (a) < (mn) ? (mn) : ((a) > (mx) ? (mx) : (a))

namespace teksto {

struct Colorf;
/**
* @brief Color
*/
struct Color
{
    unsigned char r;
    unsigned char g;
    unsigned char b;
    unsigned char a;

    Color(unsigned char _r = 255, unsigned char _g = 255, unsigned char _b = 255, unsigned char _a = 255) :
        r(_r), g(_g), b(_b), a(_a) {}

    Color(const Colorf& c);
    Colorf to_colorf() const;

    Color(unsigned int color)
    {
        a = (color & 0xFF000000) >> 24;
        r = (color & 0xFF0000) >> 16;
        g = (color & 0xFF00) >> 8;
        b = (color & 0xFF);
    }

    Color(const Color& other)
    {
        r = other.r;
        g = other.g;
        b = other.b;
        a = other.a;
    }

    bool operator==(const Color& other) const
    {
        return r == other.r
            && g == other.g
            && b == other.b
            && a == other.a;
    }

    bool operator!=(const Color& other) const
    {
        return !(*this == other);
    }

    Color operator*(const Color& other) const
    {
        Color ret = *this;
        ret *= other;
        return ret;
    }

    Color& operator*=(const Color& other)
    {
        r = r * other.r / 255;
        g = g * other.g / 255;
        b = b * other.b / 255;
        a = a * other.a / 255;
        return *this;
    }

    Color interpolate(const Color& other, float f) const
    {
        return{
            (unsigned char)(r + (other.r - r) * f),
            (unsigned char)(g + (other.g - g) * f),
            (unsigned char)(b + (other.b - b) * f),
            (unsigned char)(a + (other.a - a) * f),
        };
    }
    std::string to_string() const {
        std::ostringstream o;
        o << "Color(" << (int)r << "," << (int)g << "," << (int)b << "," << (int)a << ")";
        return o.str();
    }

    operator bool() const {
        return r > 0 || g > 0 || b > 0 || a > 0;
    }
};

/**
* @brief Colorf
*/
struct Colorf
{
    float r;
    float g;
    float b;
    float a;

    Colorf(float _r = 1.f, float _g = 1.f, float _b = 1.f, float _a = 1.f) :
        r(_r), g(_g), b(_b), a(_a) {}

    Colorf(const Color& c)
    {
        r = (float)c.r / 255;
        g = (float)c.g / 255;
        b = (float)c.b / 255;
        a = (float)c.a / 255;
    }

    Colorf(const Colorf& other)
    {
        r = other.r;
        g = other.g;
        b = other.b;
        a = other.a;
    }
    static Colorf hsla(float h, float s, float l, float a = 1.f);

    void operator=(const Colorf& other) {
        r = other.r;
        g = other.g;
        b = other.b;
        a = other.a;
    }

    bool operator==(const Colorf& other) const
    {
        return r == other.r
            && g == other.g
            && b == other.b
            && a == other.a;
    }

    bool operator!=(const Colorf& other) const
    {
        return !(*this == other);
    }

    Colorf operator+(const Colorf& other) const
    {
        return{
            r + other.r,
            g + other.g,
            b + other.b,
            a + other.a,
        };
    }

    Colorf operator-(const Colorf& other) const
    {
        return{
            r - other.r,
            g - other.g,
            b - other.b,
            a - other.a,
        };
    }

    Colorf operator*(const Colorf& other) const
    {
        Colorf ret = *this;
        ret *= other;
        return ret;
    }

    Colorf& operator*=(const Colorf& other)
    {
        r = r * other.r;
        g = g * other.g;
        b = b * other.b;
        a = a * other.a;
        return *this;
    }

    Colorf operator*(float other) const
    {
        Colorf ret = *this;
        return ret *= other;
    }

    Colorf& operator*=(float other)
    {
        r *= other;
        g *= other;
        b *= other;
        a *= other;
        return *this;
    }

    Colorf interpolate(const Colorf& other, float f) const
    {
        return{
            r + (other.r - r) * f,
            g + (other.g - g) * f,
            b + (other.b - b) * f,
            a + (other.a - a) * f,
        };
    }
    std::string to_string() const {
        std::ostringstream o;
        o << "Colorf(" << r << "," << g << "," << b << "," << a << ")";
        return o.str();
    }

    Color to_color() const {
        return Color(*this);
    }

    operator bool() const {
        return r > 0.f || g > 0.f || b > 0.f || a > 0.f;
    }

    void clamp(float min = 0.f, float max = 1.f) {
        r = CLAMP(r, min, max);
        g = CLAMP(g, min, max);
        b = CLAMP(b, min, max);
        a = CLAMP(a, min, max);
    }

    float sum_rgb() const {
        return r + g + b;
    }
};

const Color black = { 0,0,0 };
const Color white = { 255,255,255 };
const Color red = { 255,0,0 };
const Color green = { 0,255,0 };
const Color blue = { 0,0,255 };
const Color gray = { 0xDB,0xDD,0xDE };

const Colorf f_black = { 0.f,0.f,0.f };
const Colorf f_white = { 1.f,1.f,1.f };
const Colorf f_red = { 1.f,0.f,0.f };
const Colorf f_green = { 0.f,1.f,0.f };
const Colorf f_blue = { 0.f,0.f,1.f };
const Colorf f_gray = { 0xDB / 255.f, 0xDD / 255.f, 0xDE / 255.f };

inline Colorf operator*(float c, const Colorf& q) {
    return Colorf(c * q.r, c * q.g, c * q.b, c * q.a);
}

} // end namespace teksto
