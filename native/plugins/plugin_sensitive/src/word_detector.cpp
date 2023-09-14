#include <algorithm>
#include <set>

#include "word_detector.h"

namespace boyaa_word_detector {

void WordDetector::add_entry(std::shared_ptr<Entry> entry) {
    if (entry->match_mode == MatchModePinyin) {
        _pinyin_filter.add_entry(entry);
    }
    _normal_filter.add_entry(std::move(entry));
}

void WordDetector::add_entry(std::vector<std::shared_ptr<Entry>> entries) {
    for (auto i=0; i<entries.size(); ++i) {
        add_entry(std::move(entries[i]));
    }
}

void WordDetector::delete_entry(const std::shared_ptr<Entry>& entry) {
    _normal_filter.delete_entry(entry);
    if (entry->match_mode == MatchModePinyin) {
        _pinyin_filter.delete_entry(entry);
    }
}

void WordDetector::delete_entry(const std::vector<std::shared_ptr<Entry>>& entries) {
    for (auto& e : entries) {
        delete_entry(e);
    }
}

void WordDetector::clear_all_entries() {
    _normal_filter.clear_all_entries();
    _pinyin_filter.clear_all_entries();
}

struct EntryResultCmp {
    bool operator()(const EntryResult& lhs, const EntryResult& rhs) const { 
        return lhs.range < rhs.range;
    }
};

static void fix_range_after_char_filter(const CharFilterResult& char_filter_result, 
                                        EntryResult& entry_result) {
    // TODO: 更好的方式是不是应该考虑，将中间过滤的部分拆分出来？
    auto& char_filter_info = char_filter_result.filter_info;
    entry_result.range.start += char_filter_info[entry_result.range.start];
    entry_result.range.end += char_filter_info[entry_result.range.end -1];
}

static void fix_ranges_after_char_filter(const CharFilterResult& char_filter_result, 
                                        std::vector<EntryResult>& entry_results) {
    for (auto& r : entry_results) {
        fix_range_after_char_filter(char_filter_result, r);
    }
}

std::vector<EntryResult> WordDetector::find_all(const std::u32string& text) {
    auto pinyin_result = _pinyin_filter.find_all(text);
    auto normal_result = _normal_filter.find_all(text);
    
    std::set<EntryResult, EntryResultCmp> set_results(pinyin_result.begin(), pinyin_result.end());
    set_results.insert(normal_result.begin(), normal_result.end());

    // Char filter
    if (_char_filter.contains_invalid_char(text)) {
        auto char_filter_result = _char_filter.filter_full_info(text);

        auto filter_normal_result = _normal_filter.find_all(char_filter_result.text);
        fix_ranges_after_char_filter(char_filter_result, filter_normal_result);
        set_results.insert(filter_normal_result.begin(), filter_normal_result.end());

        auto filter_pinyin_result = _pinyin_filter.find_all(char_filter_result.text);
        fix_ranges_after_char_filter(char_filter_result, filter_pinyin_result);
        set_results.insert(filter_pinyin_result.begin(), filter_pinyin_result.end());
    }

    std::vector<EntryResult> results(set_results.begin(), set_results.end());
    std::sort(results.begin(), results.end(), EntryResultCmp());

    return results;
}

std::pair<bool, EntryResult> WordDetector::find_first(const std::u32string& text) {
    auto pinyin_result = _pinyin_filter.find_first(text);
    if (pinyin_result.first) {
        return pinyin_result;
    }

    auto normal_result = _normal_filter.find_first(text);
    if (normal_result.first) {
        return normal_result;
    }

    // Char filter
    if (_char_filter.contains_invalid_char(text)) {
        auto char_filter_result = _char_filter.filter_full_info(text);
        auto filter_normal_result = _normal_filter.find_first(char_filter_result.text);
        fix_range_after_char_filter(char_filter_result, filter_normal_result.second);

        return filter_normal_result;
    }

    return std::make_pair(false, EntryResult());
}

std::u32string WordDetector::replace_all(const std::u32string& text, const std::u32string& replacement) {
    auto entry_results = find_all(text);
    if (entry_results.empty()) {
        return text;
    }

    std::vector<bool> bitmap(text.size(), false);
    for (auto& r : entry_results) {
        for (auto i=r.range.start; i<r.range.end; ++i) {
            bitmap[i] = true;
        }
    }

    std::u32string ret;
    for (auto i=0; i<text.size(); ++i) {
        if (bitmap[i]) {
            ret.append(replacement);
        } else {
            ret.push_back(text[i]);
        }
    }

    return ret;
}

} // namespace boyaa_word_detector {