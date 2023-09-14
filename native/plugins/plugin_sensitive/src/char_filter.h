#pragma once

#include <string>
#include <vector>

namespace boyaa_word_detector {

struct CharFilterResult{
    std::u32string text;              // filter 之后的结果
    int invalid_count;                      // 过滤的总字符数
    std::vector<int> filter_info;   // 每个正常字符对应下标前过滤掉的字符数
};

class CharFilter {
public:
    bool is_invalid_char(char32_t c);
    bool contains_invalid_char(const std::u32string& text);
    std::u32string filter(const std::u32string& text);
    CharFilterResult filter_full_info(const std::u32string& text);
};

} // namespace boyaa_word_detector {