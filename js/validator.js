$(function () {
    'use strict';
    /* 创建一个构造器，根据传入的值和规则的不同，返回不同的对象 */
    window.Validator = function (val, rule) {
        /*
            {
              max: 10,
              min: 2
            }
            */
        this.is_valid = function (new_val) {

            var key;
            if (new_val !== undefined)
                val = new_val;

            /* 如果不是必填项且用户未填写任何内容则判定为合法 */
            if (!rule.required && !val) {
                return true;
            }
            for (key in rule) {
                /*防止重复检查*/
                if (key === 'required')
                    continue;

                /*调用rule中相对应的方法*/
                var r = this['validate_' + key](); //比如 this.validate_max()

                /*如果其中有一条规则不满足规则，直接返回false*/
                if (!r) return false;
            }
            /*如果规则全部满足，则返回ture*/
            return true;
        }

        this.validate_max = function () {
            pre_max_min();
            return val <= rule.max;
        }
        this.validate_min = function () {
            pre_max_min();
            return val >= rule.min;
        }
        this.validate_maxlength = function () {
            pre_length();
            return val.length <= rule.maxlength;
        }
        this.validate_minlength = function () {
            pre_length();
            return val.length >= rule.minlength;
        }
        this.validate_numeric = function () {
            return $.isNumeric(val);
        }
        this.validate_required = function () {
            var real = $.trim(val);
            if (!real && real !== 0) {
                return false;
            }
            return true;
        }
        /* 数据量大及迭代次数较多的地方不宜用正则，正则功能强大，但耗费资源 */
        this.validate_pattern = function () {
            var reg = new RegExp(rule.pattern);
            return reg.test(val);
        }
        /*用于完成this.validate_max或
          this.validate_min的前置工作
        */
        function pre_max_min() {
            val = parseFloat(val);
        };
        /*用于完成this.validate_maxlength或
          this.validate_minlength的前置工作
        */
        function pre_length() {
            val = val.toString();
        };

    }
});