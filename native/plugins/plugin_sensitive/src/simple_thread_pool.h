#pragma once


#include <functional>
#include <thread>
#include <condition_variable>
#include <mutex>
#include <queue>

typedef std::function<void()> Task;
typedef std::shared_ptr<Task> TaskPtr;

class SimpleThreadPool {
public:
	void push(Task task);
	std::thread* thread;
	std::queue<Task> tasks;
	std::mutex mtx;
	void startThread();
};