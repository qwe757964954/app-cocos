#include "db_thread.h"


DbThread::DbThread()
	:running(false),
	thread(nullptr)
{
}

DbThread::~DbThread() {
	this->stop();
}

void DbThread::start() {
	if (this->running) {
		return;
	}
	auto fun = [this]()->void {
		while (this->running) {
			std::unique_lock lock(this->mutex);
			if (this->queue.empty()) {
				this->cond.wait(lock);
				continue;
			}
			auto task = this->queue.front();
			this->queue.pop();
			if (task) {
				task();
			}
		}
	};
	this->running = true;
	this->thread = new std::thread(fun);
}

void DbThread::stop() {
	if (!this->thread) {
		return;
	}
	this->running = false;
	this->cond.notify_all();
	this->thread->join();
	delete this->thread;
	this->thread = nullptr;
}


void DbThread::push(VoidFunction task) {
	if (!this->running) {
		return;
	}
	std::unique_lock lock(this->mutex);
	this->queue.push(task);
	this->cond.notify_all();
}
