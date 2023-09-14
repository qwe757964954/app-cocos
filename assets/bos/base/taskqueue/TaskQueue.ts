class Task {
    target?: any
    executor: Function
    args?: any

    private _result: any
    private _resolve: (value: unknown) => void

    constructor(props: Properties<Task>) {
        Object.assign(this, props)
    }

    resolve(data: any) {
        this._result = data
        this._resolve?.call(this.target, data)
    }

    async finish() {
        if (this._result) {
            return this._result
        }
        return new Promise((resolve)=>{
            this._resolve = resolve
        })
    }
}

class TaskQueue {
    private taskList = new Array<Task>();
    private curTask? : Task;
    private running = false;

    constructor() {

    }

    start() {
        this.running = true
        this.tick()
    }

    stop() {
        this.running = false
    }

    push(task: Properties<Task>) {
        let t = new Task(task)
        this.taskList.push(t)
        this.tick()
        return t
    }

    async tick() {
        if (!this.running) {
            return
        }
        if (this.curTask) {
            return
        }
        let task = this.taskList.shift();
        if(!task) {
            return
        }
        this.curTask = task
        let result = await task.executor.call(task.target, task.args)
        task.resolve(result)
        this.curTask = null
        this.tick()
    }

    reset() {
        this.taskList = new Array<Task>()
    }
}

export {TaskQueue}