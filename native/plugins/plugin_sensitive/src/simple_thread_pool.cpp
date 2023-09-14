#include "simple_thread_pool.h"

void SimpleThreadPool::push(Task task)
{
	std::lock_guard lock(this->mtx);
	this->tasks.push(task);
	if (!this->thread) {
		this->startThread();
	}
}

void SimpleThreadPool::startThread()
{
	if (this->thread) {
		return;
	}
	auto fun = [this]()->void {
		while (true) {
			Task task;
			{
				std::lock_guard lock(this->mtx);
				if (this->tasks.empty()) {
					this->thread = nullptr;
					break;
				}
				task = this->tasks.front();
				this->tasks.pop();
			}
			if (task) {
				task();
			}
		}
	};
	this->thread = new std::thread(fun);
}

