#pragma once

#include <queue>
#include <mutex>
#include <condition_variable>
#include <functional>
#include <atomic>
#include <thread>
#include "sqlite3.h"
#include "bindings/sebind/sebind.h"
#include "cocos.h"  

typedef std::vector<std::string> StringArray;
typedef std::pair<StringArray, StringArray> KeysValues;
typedef std::function<void()> VoidFunction;




class ExecTask : public std::enable_shared_from_this< ExecTask> {
public:
	sqlite3* db;
	std::string sql;
	se::Value cb;
	bool callOnce;
	cc::BaseEngine::SchedulerPtr scheduler;
	std::vector<KeysValues> rows;

	ExecTask(sqlite3* db, std::string sql, se::Value cb, bool callOnce);
	void operator()();
};

class DbThread {
private:
	std::thread* thread;
	std::mutex mutex;
	std::queue<VoidFunction> queue;
	std::condition_variable cond;
	bool running;
public:
	DbThread();
	~DbThread();
	void start();
	void stop();
	void push(VoidFunction task);
};