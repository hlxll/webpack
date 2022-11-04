//劫持并监听所有属性
function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function (data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function (data, key, val) {
        var dep = new Dep();
        observe(val);
        //进行拦截处理一些方法，返回数据靠外部拦截器
        Object.defineProperty(data, key, {
            enumerable: true,//可枚举
            configurable: true,//可配置
            get: function getter() {
                //只有在定义watcher的时候，这个target才存在，解析器中解析，对于data数据New一个watcher，然后执行自己的get方法，内部执行当前这个拦截器，实现添加到Dep操作
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function setter(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
};
Dep.target = null;
