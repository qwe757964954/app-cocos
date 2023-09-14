#pragma once

#include <map>
#include <string>

#include "trie.h"
#include "utils.h"
#include "zh2py.h"
#include <memory>
namespace boyaa_word_detector {

typedef int SensitiveType;

enum MatchMode {
    MatchModeDefault = 0,
    MatchModeNormal,
    MatchModePinyin,
};

struct Entry {
    int64_t id;
    std::u32string word;
    SensitiveType sensitive_type;
    MatchMode match_mode;
    int64_t version;
    int64_t delete_at = 0;

    bool deleted() {
        return delete_at > 0;
    }
};

struct EntryResult {
    Range range;
    std::shared_ptr<Entry> entry;
};

struct PinYinFilter{
    typedef std::vector<std::u32string> TreeContainerType;
    typedef TreeContainerType ToTreeContainerReturnType;
    typedef std::u32string WordMapKeyType;
    typedef WordMapKeyType ToWordMapKeyReturnType;
};

struct NormalFilter {
    typedef std::u32string TreeContainerType;
    typedef const TreeContainerType& ToTreeContainerReturnType;
    typedef std::u32string WordMapKeyType;
    typedef const WordMapKeyType& ToWordMapKeyReturnType;
};

template <class Filter>
class EntryFilter {
    typedef typename Filter::TreeContainerType TreeContainerType;
    typedef typename TreeContainerType::value_type T;
    typedef typename TreeContainerType::const_iterator It;

    typedef typename Filter::ToTreeContainerReturnType ToTreeContainerReturnType;
    typedef typename Filter::WordMapKeyType WordMapKeyType;
    typedef typename Filter::ToWordMapKeyReturnType ToWordMapKeyReturnType;
public:
    void add_entry(std::shared_ptr<Entry> entry);
    void delete_entry(const std::shared_ptr<Entry>& entry);
    void clear_all_entries();

    std::vector<EntryResult> find_all(const std::u32string& text);
    std::pair<bool, EntryResult> find_first(const std::u32string& text);
    std::u32string replace_all(const std::u32string& text,
                            const std::u32string& replacement);

    int64_t version() {return _version;}

private:
    void add_pinyin_entry(std::shared_ptr<Entry> entry);
    void delete_pinyin_entry(const std::shared_ptr<Entry>& entry);
    
    void key_range_to_text_range(std::vector<Range>& ranges,
                                 const std::u32string& text);

    ToWordMapKeyReturnType to_word_map_key(const std::u32string& key);
    ToTreeContainerReturnType to_tree_key(const std::u32string& key);

private:
    Trie<TreeContainerType> _trie;
    std::map<int64_t, std::shared_ptr<Entry>> _id_map;
    std::map<WordMapKeyType, std::shared_ptr<Entry>> _word_map;
    int64_t _version = 0;
};

template <class Filter>
void EntryFilter<Filter>::add_entry(std::shared_ptr<Entry> entry) {
    if (entry->deleted()) {
        return;
    }

    auto it = _id_map.find(entry->id);
    if (it != _id_map.end()) {
        if (entry->version <= it->second->version) {
            return;
        }

        delete_entry(it->second);
    }

    _id_map.emplace(entry->id, entry);
    _word_map.emplace(to_word_map_key(entry->word), entry);
    _trie.insert(to_tree_key(entry->word));

    add_pinyin_entry(entry);

    if (_version < entry->version) {
        _version = entry->version;
    }
}

template <class Filter>
void EntryFilter<Filter>::delete_entry(const std::shared_ptr<Entry>& entry) {
    auto it = _id_map.find(entry->id);
    if (it != _id_map.end()) {
        if (entry->version < it->second->version) {
            return;
        }
    }

    _id_map.erase(entry->id);
    _word_map.erase(to_word_map_key(entry->word));
    _trie.remove(to_tree_key(entry->word));

    delete_pinyin_entry(entry);
}

template <class Filter>
void EntryFilter<Filter>::clear_all_entries() {
    while (!_id_map.empty()) {
        auto entry = _id_map.begin()->second;
        delete_entry(entry);
    }
}

template <class Filter>
std::vector<EntryResult> EntryFilter<Filter>::find_all(const std::u32string& text) {
    std::vector<EntryResult> ret;

    auto ranges = _trie.find_all(to_tree_key(text));
    key_range_to_text_range(ranges, text);
    
    for (auto& r : ranges) {
        if (!r) {
            continue;
        }

        auto key = text.substr(r.start, r.end - r.start);
        auto it = _word_map.find(to_word_map_key(key));
        if (it == _word_map.end()){
            continue;
        }
    
        if (it->second->delete_at > 0) {
            continue;
        }
        EntryResult er;
        er.range = r;
        er.entry = it->second;
        ret.push_back(er);
        // ret.push_back(EntryResult{r,it->second});
        // ret.push_back(EntryResult{
        //     .range = r,
        //     .entry = it->second,
        // });
    }

    return ret;
}

template <class Filter>
std::pair<bool, EntryResult> EntryFilter<Filter>::find_first(const std::u32string& text) {
    auto pair = _trie.validate(to_tree_key(text));
    if (pair.first) {
        return std::make_pair(false, EntryResult());
    }

    auto r = pair.second;
    auto ranges = std::vector<Range>{r};
    key_range_to_text_range(ranges, text);
    r = ranges[0];
    auto key = text.substr(r.start, r.end - r.start);
    auto it = _word_map.find(to_word_map_key(key));
    if (it == _word_map.end() || it->second->delete_at > 0) {
        return std::make_pair(false, EntryResult());
    }
    // ret.push_back(EntryResult{r,it->second});
    EntryResult er;
    er.range = r;
    er.entry = it->second;
    return std::make_pair(true,er);
    // return std::make_pair(true, EntryResult{r,it->second});
}

template <class Filter>
std::u32string EntryFilter<Filter>::replace_all(const std::u32string& text,
                            const std::u32string& replacement) {
    auto ranges = _trie.find_all(to_tree_key(text));
    key_range_to_text_range(ranges, text);
    
    std::vector<bool> bitmap(text.size(), false);
    for (auto& r : ranges) {
        for (auto i=r.start; i<r.end; ++i) {
            bitmap[i] = true;
        }
    }

    std::u32string ret;
    ret.reserve(text.size());
    for (auto i=0; i<text.size(); ++i) {
        if (bitmap[i]) {
            ret += replacement;
        } else {
            ret.push_back(text[i]);
        }
    }

    return ret;
}

template <class Filter>
void EntryFilter<Filter>::add_pinyin_entry(std::shared_ptr<Entry> entry) {
    if (entry->match_mode == MatchModePinyin) {
        auto pinyin = zh2py(entry->word);
        _word_map.emplace(pinyin, std::move(entry));
        _trie.insert(pinyin);
    }
}

template <>
inline void EntryFilter<PinYinFilter>::add_pinyin_entry(std::shared_ptr<Entry> entry) {
}

template <class Filter>
void EntryFilter<Filter>::delete_pinyin_entry(const std::shared_ptr<Entry>& entry) {
    if (entry->match_mode == MatchModePinyin) {
        auto pinyin = zh2py(entry->word);
        _word_map.erase(pinyin);
        _trie.remove(pinyin);
    }
}

template <>
inline void EntryFilter<PinYinFilter>::delete_pinyin_entry(const std::shared_ptr<Entry>& entry) {
}


template <class Filter>
typename EntryFilter<Filter>::ToWordMapKeyReturnType 
EntryFilter<Filter>::to_word_map_key(const std::u32string& key) {
    return key;
}

template <>
typename EntryFilter<PinYinFilter>::ToWordMapKeyReturnType 
inline EntryFilter<PinYinFilter>::to_word_map_key(const std::u32string& key) {
    return zh2py(key, U"-");
}

template <class Filter>
typename EntryFilter<Filter>::ToTreeContainerReturnType 
EntryFilter<Filter>::to_tree_key(const std::u32string& key) {
    return key;
}

template <>
typename EntryFilter<PinYinFilter>::ToTreeContainerReturnType 
inline EntryFilter<PinYinFilter>::to_tree_key(const std::u32string& key) {
    return zh2pyarray(key);
}

template <class Filter>
void EntryFilter<Filter>::key_range_to_text_range(std::vector<Range>& ranges,
                                                  const std::u32string& text) {
}

template <>
inline void EntryFilter<PinYinFilter>::key_range_to_text_range(std::vector<Range>& ranges,
                                                        const std::u32string& text) {
    auto seg = zh2pysegment(text);
    for (auto& r : ranges) {
        r.start = seg[r.start].range.start;
        r.end = seg[r.end-1].range.end;
    }
}

} //namespace boyaa_word_detector {