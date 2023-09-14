#pragma once

namespace boyaa_word_detector {

struct Range {
    int start = 0;
    int end = 0;

    Range() = default;
    Range(int s, int e): start(s), end(e) {}

    operator bool() {
        return start < end;
    }

    bool operator==(const Range& other) const {
        return start == other.start && end == other.end;
    }

    bool operator!=(const Range& other) const {
        return !(*this == other);
    }

    bool operator<(const Range& other) const {
        if (start == other.start) {
            return end <= other.end;
        }

        return start < other.start;
    }

    bool operator>(const Range& other) const {
        return !operator<(other);
    }
};

}