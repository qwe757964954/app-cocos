#pragma once

#include <unordered_map>
#include <set>
#include <string>
#include <vector>
#include <cstdlib>
#include <iostream>
#include <memory>
#include "utils.h"

namespace boyaa_word_detector {

template <class Container>
class Trie
{
    typedef typename Container::value_type T;
    typedef typename Container::const_iterator It;
public:
    // Trie(bool is_leaf=false) : _is_leaf(is_leaf) {}

    bool insert(const Container& key);
    void remove(const Container& key);
    bool search(const Container& key);
    
    Container replace(const Container& paragraph, const T& w);
    Container filter(const Container& paragraph);

    std::pair<bool, Range> validate(const Container& paragraph);
    std::vector<Range> find_all(const Container& paragraph);

    bool is_leaf() {return _is_leaf;}
    bool has_children() {return !_children.empty();}

private:
    bool _insert(It first, It last);
    bool _remove(It first, It last);
    Trie* child(const T& wc);

private:
    bool _is_leaf = false;
    std::unordered_map<T, std::unique_ptr<Trie>> _children;
};

template <class Container>
bool Trie<Container>::insert(const Container& c) {
    return _insert(c.begin(), c.end());
}

template <class Container>
void Trie<Container>::remove(const Container& key) {
    _remove(key.begin(), key.end());
}

template <class Container>
bool Trie<Container>::search(const Container& key) {
    Trie* curr = this;
    for (const auto& wc : key) {
        // go to the next node
        curr = curr->child(wc);

         // if the string is invalid (reached end of a path in the Trie)
        if (curr == nullptr) {
            return false;
        }
    }
 
    // return true if the current node is a leaf and the
    // end of the string is reached
    return curr->_is_leaf;
}

template <class Container>
Container Trie<Container>::replace(const Container& paragraph, const T& w) {
    Container ret = paragraph;
    auto ret_curr = ret.begin();

    auto left = paragraph.begin();
    while (left < paragraph.end()) {
        Trie* curr = this;

        auto to_be_verified = left;
        for (auto p=left; p<paragraph.end(); ++p) {
            curr = curr->child(*p);
            // match no paragraph
            if (!curr) {
                // ++left;
                // ++ret_curr;
                break;
            }
            // got a match, replace it and skip the paragraph
            else if (curr->is_leaf()) {
                for (auto i=left; i<=p; ++i) {
                    *ret_curr = w;
                    ++ret_curr;
                }
                // p is verified
                to_be_verified = p + 1;
            }
        }
        // left must be verified to be false, after the loop
        if (to_be_verified == left) {
            ++left;
            ++ret_curr;
        } else {
            left = to_be_verified;
        }
    }

    return ret;
}

template <class Container>
Container Trie<Container>::filter(const Container& paragraph) {
    Container ret;
    ret.reserve(paragraph.size());

    auto left = paragraph.begin();
    while (left < paragraph.end()) {
        Trie* curr = this;

        auto to_be_verified = left;
        for (auto p=left; p<paragraph.end(); ++p) {
            curr = curr->child(*p);
            // match no paragraph, start from next paragraph
            if (!curr) {
                break;
            }
            // got a match, skip it
            else if (curr->is_leaf()) {
                // p is verified
                to_be_verified = p + 1;
            }
        }
        // left must be verified to be false, after the loop
        if (to_be_verified == left) {
            ret.push_back(*left);
            ++left;
        } else {
            left = to_be_verified;
        }
    }

    return ret;
}

template <class Container>
std::pair<bool, Range> Trie<Container>::validate(const Container& paragraph) {
    auto left = paragraph.begin();
    while (left < paragraph.end()) {
        Trie* curr = this;

        auto to_be_verified = left;
        for (auto p=left; p<paragraph.end(); ++p) {
            curr = curr->child(*p);
            // match no paragraph
            if (!curr) {
                break;
            }
            // got a match, return it
            else if (curr->is_leaf()) {
                return std::make_pair(false, 
                    Range(left - paragraph.begin(), 
                        p - paragraph.begin() + 1));
            }
        }
        // left must be verified after the loop
        left = to_be_verified + 1;
    }

    return std::make_pair(true, Range());
}

template <class Container>
std::vector<Range> Trie<Container>::find_all(const Container& paragraph) {
    std::vector<Range> ret;

    auto left = paragraph.begin();
    while (left < paragraph.end()) {
        Trie* curr = this;

        auto to_be_verified = left;
        for (auto p=left; p<paragraph.end(); ++p) {
            curr = curr->child(*p);
            // match no paragraph
            if (!curr) {
                break;
            }
            // got a match, push it to the result
            else if (curr->is_leaf()) {
                ret.push_back(Range(left - paragraph.begin(), 
                        p - paragraph.begin() + 1));
                // p is verified
                to_be_verified = p + 1; 
            }
        }
        // left must be verified after the loop
        if (to_be_verified == left) {
            ++left;
        } else {
            left = to_be_verified;
        }
    }

    return ret;
}

template <class Container>
bool Trie<Container>::_insert(It first, It last) {
    if (first >= last) {
        _is_leaf = true;
        return true;
    }
    
    Trie* curr = child(*first);
    if (curr == nullptr) {
        auto pair = _children.emplace(*first, std::make_unique<Trie>());
        if (!pair.second) {
            return false;
        }

        curr = pair.first->second.get();
    }
    
    return curr->_insert(++first, last);
}

template <class Container>
bool Trie<Container>::_remove(It first, It last) {
    if (first >= last) {
        return false;
    }

    const auto& key = *first;
    auto cur_child = child(key);
    if (cur_child == nullptr) {
        return false;
    }
    
    auto next = ++first;
    // if the end of the key is not reached
    if (next != last) {
        // recur for the node corresponding to the next character in the key
        // and if it returns true, delete the current node (if it is non-leaf)
 
        if (cur_child->_remove(next, last) && !cur_child->_is_leaf) {
            if (!cur_child->has_children()) {
                // delete the current node
                _children.erase(key);
 
                // delete the non-leaf parent nodes
                return true;
            }

            return false;
        }

        return false;
    }
 
    // if the end of the key is reached
    if (next == last && cur_child->_is_leaf ) {
        // if the current node is a leaf node and doesn't have any children
        if (!cur_child->has_children()) {
            // delete the current node
            _children.erase(key);
 
            // delete the non-leaf parent nodes
            return true;
        }

        // if the current node is a leaf node and has children
        // mark the current node as a non-leaf node (DON'T DELETE IT)
        cur_child->_is_leaf = false;

        // don't delete its parent nodes
        return false;
    }
 
    return false;
}

template <class Container>
Trie<Container>* Trie<Container>::child(const T& wc) {
    auto it = _children.find(wc);
    if (it != _children.end()) {
        return it->second.get();
    }

    return nullptr;
}

} // namespace boyaa_word_detector {
