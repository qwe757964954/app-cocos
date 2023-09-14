#pragma once

#include "word_detector.h"
#include <mutex>
#include "simple_thread_pool.h"

namespace boyaa_word_detector {

	class WordDetectorUTF8 : public std::enable_shared_from_this<WordDetectorUTF8> {
	public:
		static WordDetectorUTF8* global_instance();

	public:
		SimpleThreadPool threadPool;
		int64_t version() { return _wd.version(); }

		void add_entry(int64_t id, const std::string& text,
			int sensitive_type, int match_mode,
			int64_t version);
		void add_entries(const std::vector<std::tuple<int64_t, std::string, int, int, int64_t>>& entries);

		void delete_entry(int64_t id, const std::string& text,
			int sensitive_type, int match_mode,
			int64_t version);
		void clear_all_entries();

		bool is_valid(const std::string& text);
		std::string replace_all(const std::string& text, const std::string& replacement);
		std::string convert_to_pinyin(const std::string& text, const std::string rep);

	private:
		WordDetector _wd;
		std::mutex _mutex;
	};

} // namespace boyaa_word_detector {