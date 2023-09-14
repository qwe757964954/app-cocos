#include "common.h"
#include "cocos/bindings/sebind/sebind.h"
#include "miniz.h"
#include "cocos/platform/FileUtils.h"


bool p_zip_unzip(se::State& state) {
	se::Value& rtn = state.rval();
	const se::ValueArray& args = state.args();
	std::string src;
	std::string dst;
	bool ok = true;
	ok = ok && sevalue_to_native(args[0], &src);
	ok = ok && sevalue_to_native(args[1], &dst);

	auto fs = cc::FileUtils::getInstance();
	if (!ok) {
		rtn.setString("param error");
		return false;
	}
	if (!fs->isFileExist(src)) {
		rtn.setString("src not exists");
		return false;
	}


	if (dst[dst.length() - 1] != '/') {
		dst = dst + '/';
	}

	if (fs->isFileExist(dst)) {
		rtn.setString("dst is not directory");
		return false;
	}
	if (!fs->isDirectoryExist(dst)) {
		fs->createDirectory(dst);
	}
	mz_zip_archive archive;
	memset(&archive, 0, sizeof archive);
	auto result = mz_zip_reader_init_file(&archive, src.c_str(), 0);
	if (result != MZ_TRUE) {
		rtn.setString("init failed " + std::to_string(result));
		return false;
	}
	int count = mz_zip_reader_get_num_files(&archive);
	for (int index = 0; index < count; index++) {
		char fileName[1024];
		mz_zip_reader_get_filename(&archive, index, fileName, 1024);
		mz_zip_archive_file_stat stat;
		memset(&stat, 0, sizeof stat);
		auto result = mz_zip_reader_file_stat(&archive, index, &stat);
		if (result != MZ_TRUE) {
			rtn.setString("extract failed :" + std::string(fileName) + " " + std::to_string(result));
			mz_zip_end(&archive);
			return false;
		}
		if (stat.m_is_directory) {
			continue;
		}
		auto dstFile = dst + fileName;
		auto dir = fs->getFileDir(dstFile);
		if (!fs->isDirectoryExist(dir)) {
			fs->createDirectory(dir);
		}
		result = mz_zip_reader_extract_file_to_file(&archive, fileName, dstFile.c_str(), 0);
		if (result != MZ_TRUE) {
			rtn.setString("extract failed: " + std::string(fileName) + " " + std::to_string(result));
			return false;
		}
	}
	mz_zip_end(&archive);
	return true;
}