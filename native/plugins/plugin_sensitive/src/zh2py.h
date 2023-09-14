#pragma once

#include "utils.h"

namespace boyaa_word_detector {

struct PinyinSegment {
    std::u32string pinyin;
    Range range; // range in origin text
};

std::u32string zh2py(const std::u32string& text, const std::u32string& sep=U"");
std::vector<std::u32string> zh2pyarray(const std::u32string& text);
std::vector<PinyinSegment> zh2pysegment(const std::u32string& text);

} // namespace boyaa_word_detector {