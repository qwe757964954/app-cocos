#pragma once

#include "entry_filter.h"
#include "char_filter.h"

namespace boyaa_word_detector {

class WordDetector {
public:
    int64_t version() {return _normal_filter.version();}
    void add_entry(std::shared_ptr<Entry> entry);
    void add_entry(std::vector<std::shared_ptr<Entry>> entries);
    void delete_entry(const std::shared_ptr<Entry>& entry);
    void delete_entry(const std::vector<std::shared_ptr<Entry>>& entries);
    void clear_all_entries();

    std::vector<EntryResult> find_all(const std::u32string& text);
    std::pair<bool, EntryResult> find_first(const std::u32string& text);
    std::u32string replace_all(const std::u32string& text, const std::u32string& replacement);
private:
    EntryFilter<NormalFilter> _normal_filter;
    EntryFilter<PinYinFilter> _pinyin_filter;
    CharFilter _char_filter;
};

} // namespace boyaa_word_detector {