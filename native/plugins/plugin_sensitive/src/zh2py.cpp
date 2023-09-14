#include <string>
#include <vector>

#include "zh2py.h"
#include "pinyin_map.h"

namespace boyaa_word_detector {

static bool is_han(char32_t wc) {
    return wc >= 0x4E00 && wc <= 0x9FA5;
}

std::u32string zh2py(const std::u32string& text, const std::u32string& sep) {
    constexpr size_t len = sizeof(listPY) / sizeof(const char*);

    if (text.empty()) {
        return text;
    }

    std::u32string pinyin;
    
    for (auto i=0; i<text.size(); ++i) {
        if (is_han(text[i])) {
            auto index = text[i] - 0x4E00;
            if (index < len) {
                pinyin.append(listPY[index]);
                pinyin.append(sep);
            }
        } else {
            bool last_is_space = false;
            while (i<text.size() && !is_han(text[i])) {
                if (!iswspace(text[i])) {
                    last_is_space = false;
                    pinyin.push_back(text[i++]);
                } else {
                    ++i;
                    if (!last_is_space) {
                        pinyin.append(sep);
                    }
                    last_is_space = true;
                }
            }
            pinyin.append(sep);
        }
    }

    return pinyin;
}

std::vector<std::u32string> zh2pyarray(const std::u32string& text) {
    constexpr size_t len = sizeof(listPY) / sizeof(const char*);

    std::vector<std::u32string> ret;
    std::u32string pinyin;
    for (auto wc : text) {
        if (wc >= 0x4E00 && wc <= 0x9FA5) {
            auto index = wc - 0x4E00;
            if (index < len) {
                if (!pinyin.empty()) {
                    ret.push_back(pinyin);
                    pinyin.clear();
                }
                ret.push_back(listPY[index]);
            }
        } else {
            if (!iswspace(wc)) {
                pinyin.push_back(wc);
            } else {
                if (!pinyin.empty()){
                    ret.push_back(pinyin);
                    pinyin.clear();
                }
            }
        }
    }
    if (!pinyin.empty()) {
        ret.push_back(pinyin);
    }

    return ret;
}

std::vector<PinyinSegment> zh2pysegment(const std::u32string& text) {
    constexpr size_t len = sizeof(listPY) / sizeof(const char*);

    std::vector<PinyinSegment> ret;
    std::u32string pinyin;
    int seg_beg = 0;
    for (auto i=0; i<text.size(); ++i) {
        auto wc = text[i];
        if (wc >= 0x4E00 && wc <= 0x9FA5) {
            auto index = wc - 0x4E00;
            if (index < len) {
                if (!pinyin.empty()) {
                    PinyinSegment ps;
                    ps.pinyin = pinyin;
                    ps.range = Range{seg_beg, i};
                    ret.push_back(ps);
                    // ret.push_back(PinyinSegment{pinyin,Range{seg_beg, i}});
                    // ret.push_back(PinyinSegment{
                    //     .pinyin = pinyin,
                    //     .range = Range{seg_beg, i},
                    // });
                    pinyin.clear();
                    seg_beg = i;
                }
                PinyinSegment ps;
                ps.pinyin = listPY[index];
                ps.range = Range{seg_beg, i+1};
                ret.push_back(ps);
                // ret.push_back(PinyinSegment{,Range{seg_beg, i+1}});
                // ret.push_back(PinyinSegment{
                //     .pinyin = listPY[index],
                //     .range = Range{seg_beg, i+1},
                // });
                seg_beg = i+1;
            }
        } else {
            if (!iswspace(wc)) {
                pinyin.push_back(wc);
            } else {
                if (!pinyin.empty()){
                    PinyinSegment ps;
                    ps.pinyin = pinyin;
                    ps.range = Range{seg_beg, i};
                    ret.push_back(ps);


                    // ret.push_back(PinyinSegment{pinyin,Range{seg_beg, i}});
                    // ret.push_back(PinyinSegment{
                    //     .pinyin = pinyin,
                    //     .range = Range{seg_beg, i},
                    // });
                    pinyin.clear();
                }
                seg_beg = i;
            }
            
        }
    }
    
    if (!pinyin.empty()) {
        PinyinSegment ps;
        ps.pinyin = pinyin;
        ps.range = Range{seg_beg, static_cast<int>(text.size())};
        ret.push_back(ps);

        // ret.push_back(PinyinSegment{pinyin,Range{seg_beg, static_cast<int>(text.size())}});
        // ret.push_back(PinyinSegment{
        //                 .pinyin = pinyin,
        //                 .range = Range{seg_beg, static_cast<int>(text.size())},
        //             });
    }

    return ret;
}

} // namespace boyaa_word_detector { 