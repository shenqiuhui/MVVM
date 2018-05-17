// 观察者的目的就是给需要变化的那个元素增加一个观察者，当数据变化后执行对应的方法
class Watcher {
    constructor (vm, exp, callback) {
        this.vm = vm;
        this.exp = exp;
        this.callback = callback;
        // 先获取一下老的值
        this.value = this.get();
    }
    get () { // 获取实例上老值得方法
        Dep.target = this;
        let value = CompileUtil.getVal(this.vm, this.exp);
        Dep.target = null;
        return value;
    }
    update () {
        let newValue = CompileUtil.getVal(this.vm, this.exp);
        let oldValue = this.value;
        if(newValue !== oldValue) {
            this.callback(newValue); // 如果修改后得新旧值不等就执行回调
        }
    }
}

// 用新值和老值进行对比，如果变化，就调用更新方法