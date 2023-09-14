
#include "utf8.h"
#include "word_detector_utf8.h"
#include "zh2py.h"
#include <iostream>
#include <codecvt>
namespace boyaa_word_detector {

static std::string utf32_to_utf8(const std::u32string& s) {
    std::string result;
    utf8::utf32to8(s.begin(), s.end(), back_inserter(result));
    return result;
}

static std::u32string utf8_to_utf32(const std::string& s) {
    std::u32string result;
    result.reserve(s.size());
    utf8::unchecked::utf8to32(s.begin(), s.end(), back_inserter(result));
    return result;
}

WordDetectorUTF8* WordDetectorUTF8::global_instance() {
    static WordDetectorUTF8 instance;
    return &instance;
}

void WordDetectorUTF8::add_entry(int64_t id, const std::string& text, 
                int sensitive_type, int match_mode, 
                int64_t version) {
    
    Entry en;
    en.id = id;
    en.word = utf8_to_utf32(text);
    en.sensitive_type = sensitive_type;
    en.match_mode = (MatchMode)match_mode;
    en.version = version;

    {
        std::lock_guard<std::mutex> guard(_mutex);
        _wd.add_entry(std::make_shared<Entry>(en));
    }

}

void WordDetectorUTF8::add_entries(const std::vector<std::tuple<int64_t, std::string, int, int, int64_t>>& entries) {
    std::vector<std::shared_ptr<Entry>> es;
    for (auto& e : entries) {
        Entry en;
        en.id = std::get<0>(e);
        en.word = utf8_to_utf32(std::get<1>(e));
        en.sensitive_type = std::get<2>(e);
        en.match_mode = (MatchMode)std::get<3>(e);
        en.version = std::get<4>(e);
        es.push_back(std::make_shared<Entry>(en));
    }
    {
        std::lock_guard<std::mutex> guard(_mutex);
        _wd.add_entry(std::move(es));
    }
}

void WordDetectorUTF8::delete_entry(int64_t id, const std::string& text, 
                int sensitive_type, int match_mode, 
                int64_t version) {
                    
    Entry en;
    en.id = id;
    en.word = utf8_to_utf32(text);
    en.sensitive_type = sensitive_type;
    en.match_mode = (MatchMode)match_mode;
    en.version = version;

    {
        std::lock_guard<std::mutex> guard(_mutex);
        _wd.delete_entry(std::make_shared<Entry>(en));
    }
}
void WordDetectorUTF8::clear_all_entries() {
    std::lock_guard<std::mutex> guard(_mutex);
    _wd.clear_all_entries();
}

bool WordDetectorUTF8::is_valid(const std::string& text) {
    auto u32_text = utf8_to_utf32(text);

    bool valid = false;
    {
        std::lock_guard<std::mutex> guard(_mutex);
        auto p = _wd.find_first(u32_text);
        valid = !p.first;
    }
    return valid;
}

std::string WordDetectorUTF8::replace_all(const std::string& text, const std::string& replacement) {
    auto u32_text = utf8_to_utf32(text);
    auto u32_replacement = utf8_to_utf32(replacement);
    
    std::u32string u32_result;
    {
        std::lock_guard<std::mutex> guard(_mutex);
        u32_result = _wd.replace_all(u32_text, u32_replacement);
    }

    return utf32_to_utf8(u32_result);
}

std::string WordDetectorUTF8::convert_to_pinyin(const std::string& text, const std::string rep) {
    auto u32 = zh2py(utf8_to_utf32(text), utf8_to_utf32(rep));
    return utf32_to_utf8(u32);
}

} //namespace boyaa_word_detector {^