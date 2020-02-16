///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function startMove(ele, attrObj, callback) {

    clearInterval(ele.timer);

    let iSpeed = null,
        iCur = null;

    ele.timer = setInterval(function () {

        let bStop = true;

        for (var prop in attrObj) {

            if (prop == 'opacity') {

                iCur = parseFloat(getStyle(ele, prop)) * 100;

            } else {

                iCur = parseInt(getStyle(ele, prop));
            }

            iSpeed = (attrObj[prop] - iCur) / 7;

            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (prop == 'opacity') {

                ele.style.opacity = (iCur + iSpeed) / 100;

            } else {

                ele.style[prop] = iCur + iSpeed + 'px';

            }

            if (iCur != attrObj[prop]) {

                bStop = false;
            }
        }

        if (bStop) {

            clearInterval(ele.timer);

            typeof callback == 'function' && callback();
        }

    }, 30);
}

//-------------------------------------------------------------------------------------------------------------------//


(function () {

    function jQuery(selector) {

        return new jQuery.prototype.init(selector);
    }

    jQuery.prototype.init = function (selector) {

        /**
         * 模拟 id & class 选择器 jquery 包装类
         *
         * 内部原理由另一家公司创建的，jquery 直接拿来用的
         *
         *
         */

        // this{}

        // selector = nul || undefined;

        if (selector == null) {

            return this;
        }

        let dom;

        this.length = 0;

        if (typeof selector == 'string' && selector.indexOf('.' != '-1')) {

            dom = document.getElementsByClassName(selector.slice(1));

        } else if (typeof selector == 'string' && selector.indexOf('#') != '-1') {

            dom = document.getElementById(selector.slice1);
        }

        if (selector instanceof Element || dom.length == undefined) {                      // selector == 'id'

            this[0] = dom || selector;

            this.length++;

        } else {                                            // selector == 'class'

            for (let i = 0; i < dom.length; i++) {

                this[i] = dom[i];

                this.length++;
            }
        }

        // return this;                                     // default return
    };

    jQuery.prototype.css = function (config) {

        for (let i = 0; i < this.length; i++) {

            for (let attr in config) {

                if (isNaN(config[attr])) {

                    this[i].style[attr] = config[attr];

                } else {

                    this[i].style[attr] = config[attr] + 'px';
                }
            }
        }

        /**
         * 利用 this 返回修改后的对象
         *
         * 所以可继续操作
         */

        return this;                                        // 链式操作
    };

    jQuery.prototype.init.prototype = jQuery.prototype;     // 解决

    window.$ = window.jQuery = jQuery;

}());


//-------------------------------------------------------------------------------------------------------------------//


jQuery.prototype.pushStack = function () {

    // this = newObj;

    if (dom.constructor != jQuery) {

        dom = jQuery(dom);
    }

    dom.prevObj = this;

    return dom;
};


//-------------------------------------------------------------------------------------------------------------------//


jQuery.prototype.get = function (num) {

    // if (num == null) {           // num == undefined => num == null && num = undefined
    //
    //     // Array.prototype.slice.call(this, 0) == [].slice.call(this, 0);         // object+array => array
    //
    //     return [].slice.call(this, 0);
    //
    // } else {
    //
    //     if (num >= 0) {
    //
    //         return this[num];
    //
    //     } else {
    //
    //         return this[num + this.length];
    //     }
    // }

    return num != null ? (num >= 0 ? this[num] : this[num + this.length]) : [].slice.call(this, 0);

};


//-------------------------------------------------------------------------------------------------------------------//


jQuery.prototype.eq = function (num) {

    let dom = num != null ? (num >= 0 ? this[num] : this[num + this.length]) : null;

    this.pushStack(dom);

    return jQuery(dom);
}


//-------------------------------------------------------------------------------------------------------------------//


jQuery.prototype.add = function (selector) {

    let curObj = jQuery(selector),
        prevObj = this,
        newObj = jQuery();

    for (let i = 0; i < curObj.length; i++) {

        newObj[newObj.length++] = curObj[i];
    }

    for (let i = 0; i < prevObj.length; i++) {

        newObj[newObj.length++] = prevObj[i];
    }

    this.pushStack(newObj);

    return newObj;
};


//-------------------------------------------------------------------------------------------------------------------//


jQuery.prototype.end = function () {

    return this.prevObj;
};


//-------------------------------------------------------------------------------------------------------------------//


jQuery.prototype.myOn = function (type, handle) {

    for (let i = 0; i < this.length; i++) {

        if (!this[i].cacheEvent) {

            this[i].cacheEvent = {};
        }

        if (!this[i].cacheEvent[type]) {

            this[i].cacheEvent[type] = [handle];

        } else {

            this[i].cacheEvent[type].push(handle);
        }
    }
};


//-------------------------------------------------------------------------------------------------------------------//


jQuery.prototype.myTrigger = function (type) {

    let params = arguments.length > 1 ? [].slice.call(arguments, 1) : [],
        self = this;

    for (let i = 0; i < this.length; i++) {

        if (this[i].cacheEvent[type]) {

            this[i].cacheEvent[type].forEach(function (value, index) {

                value.apply(self, params);
            });
        }
    }
}


//-------------------------------------------------------------------------------------------------------------------//


jQuery.prototype.myQueue = function (type, handle) {

    let queueObj = this,
        queueName = arguments[0] || 'fx',               // 'fx' 使系统内部的 队列
        addFn = arguments[1] || null,
        len = arguments.length;

    // get queue

    if (len == 1) {

        return queueObj[0][queueName];
    }

    // create or add fn in queue

    queueObj[0][queueName] == undefined ? queueObj[0][queueName] = [addFn] : queueObj[0][queueName].push(addFn);

    return this;

};


//-------------------------------------------------------------------------------------------------------------------//


jQuery.prototype.myDequeue = function (type) {

    let queueName = arguments[0] || 'fx',
        queueArr = this.myQueue(queueName),
        currFn = queueArr.shift(),
        self = this,
        next;

    if (currFn == undefined) {

        return;
    }

    next = function () {

        self.myQueue(queueName);

    };

    currFn(next);

    return this;
};


//-------------------------------------------------------------------------------------------------------------------//


jQuery.prototype.myAnimate = function (prop, callback) {

    let len = this.length,
        self = this,
        baseFn;

    baseFn = function () {

        let times = 0;

        for (let i = 0; i < len; i++) {

            starttMove(self[i], prop, function (next) {

                times++;

                if (times == len) {

                    callback && callback();

                    next();
                }

            });
        }
    };

    this.myQueue('fx', baseFn);

    if (this.myQueue.length == 1) {

        this.myDequeue('fx');
    }
};


//-------------------------------------------------------------------------------------------------------------------//


jQuery.prototype.myDelay = function (duration) {

    let queueArr = this[0]['fx'];

    queueArr.push(function (next) {

        setTimeout(function () {

            next();

        }, duration);
    });
};








///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
