#include "common.h"
#include "miniz.h"
#include "cocos/platform/FileUtils.h"

bool p_zip_zip(se::State& state) {
	se::Value& rtn = state.rval();
	const se::ValueArray& args = state.args();
	std::string src;
	std::string dst;
	int level = MZ_DEFAULT_LEVEL;
	bool ok = true;
	ok = ok && sevalue_to_native(args[0], &src);
	ok = ok && sevalue_to_native(args[1], &dst);
	if (!ok) {
		rtn.setString("param error");
		return false;
	}
	if (args.size() >= 3) {
		sevalue_to_native(args[2], &level);
	}
	if (src[src.length() - 1] != '/') {
		src = src + '/';
	}

	auto fs = cc::FileUtils::getInstance();
	if (!fs->isDirectoryExist(src)) {
		rtn.setString("src not exists");
		return false;
	}
	if (level < 0 || level > 10) {
		rtn.setString("level: 0-10");
		return false;
	}
	auto dir = fs->getFileDir(dst);
	if (!fs->isDirectoryExist(dir)) {
		fs->createDirectory(dir);
	}
	mz_zip_archive archive;
	memset(&archive, 0, sizeof archive);
	auto result = mz_zip_writer_init_file(&archive, dst.c_str(), 0);
	if (result != MZ_TRUE) {
		rtn.setString("init failed " + std::to_string(result));
		return false;
	}
	auto rootDir = src;
	std::vector<std::string> files;
	fs->listFilesRecursively(rootDir, &files);
	for (auto it = files.begin(); it != files.end(); it++) {
		auto src = *it;
		if (fs->isFileExist(src)) {
			auto rel = src.substr(rootDir.length());
			auto result = mz_zip_writer_add_file(
				&archive,
				rel.c_str(),
				src.c_str(),
				nullptr, 0,
				level
			);
			if (result != MZ_TRUE) {
				rtn.setString("compress failed: " + src + " " + std::to_string(result));
				mz_zip_end(&archive);
				fs->removeFile(dst);
				return false;
			}
		}
	}
	mz_zip_writer_finalize_archive(&archive);
	mz_zip_end(&archive);
	return true;
}