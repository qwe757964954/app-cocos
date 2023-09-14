#include "char_filter.h"

namespace boyaa_word_detector {

bool CharFilter::is_invalid_char(char32_t c) {
    return !(c >= 0x4e00 && c <= 0x9f5a) // 汉字
        && !(c >= U'0' && c <= U'9') // 数字
        && !(c >= U'a' && c <= U'z') // 英文字母
        && !(c >= U'A' && c <= U'Z'); // 英文字母
}

bool CharFilter::contains_invalid_char(const std::u32string& text) {
    for (auto c : text) {
        if (is_invalid_char(c)) {
            return true;
        }
    }

    return false;
}

std::u32string CharFilter::filter(const std::u32string& text) {
    std::u32string ret;
    ret.reserve(text.size());

    for (auto c : text) {
        if (!is_invalid_char(c)) {
            ret.push_back(c);
        }
    }

    return ret;
}

CharFilterResult CharFilter::filter_full_info(const std::u32string& text) {
    CharFilterResult ret;
    ret.invalid_count = 0;
    ret.filter_info = std::vector<int>(text.size(), 0);
    // CharFilterResult ret = {
    //     invalid_count : 0,
    //     filter_info : std::vector<int>(text.size(), 0),
    // };
    ret.text.reserve(text.size());

    int valid_count = 0;
    for (auto i=0; i<text.size(); ++i) {
        if (!is_invalid_char(text[i])) {
            ret.text.push_back(text[i]);
            ++valid_count;
        } else {
            ++ret.invalid_count;
            ++ret.filter_info[valid_count];
        }
    }

    ret.filter_info.resize(valid_count);
    for (auto i=1; i<ret.filter_info.size(); ++i) {
        ret.filter_info[i] += ret.filter_info[i-1];
    }

    return ret;
}

} //namespace boyaa_word_detector {