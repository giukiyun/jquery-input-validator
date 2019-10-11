$(function () {
    'use strict';
    //通过选择器找到页面中的所属的input
    window.Input = function (selector) {
        var $ele, $error_ele, me = this,
            rule = {
                required: true
            }

        /* 为input对象生成验证器 */
        this.load_validator = function () {
            var val =this.get_val();
            this.validator = new Validator(val, rule)
        }

        /* 获取输入的数据 */
        this.get_val=function() {
            return $ele.val();
        }

        /* 初始化 */
        function init() {
            find_ele();
            get_error_ele();
            parse_rule();
            me.load_validator();
            listen();
        }

        /* 监听输入数据，验证规则 */
        function listen() {
            $ele.on('blur', function () {
                var valid = me.validator.is_valid(me.get_val());
                if (valid)
                    $error_ele.hide();
                else
                    $error_ele.show();
            })
        }

        /* 找到错误提示选择器 转成jQuery对象 */
        function get_error_ele() {
            $error_ele = $(get_error_selector());
        }

        /* 找到错误提示选择器 */
        function get_error_selector() {
            return '#' + $ele.attr('name') + '-input-error';
        }

        /* 找到元素选择器，并转换成jQuery对象 */
        function find_ele() {
            /* 如果传进来的是一个选好的jQuery对象，直接绑定，无需重新选择。*/
            if (selector instanceof jQuery) {
                $ele = selector;
            } else {
                $ele = $(selector);
            }
        }

        /* 解析规则 */
        function parse_rule() {
            var i;
            var rule_str = $ele.data('rule');
            if (!rule_str) return;

            var rule_arr = rule_str.split('|'); // [ 'min:18', 'maxlength:10']
            for (i = 0; i < rule_arr.length; i++) {
                var item_str = rule_arr[i];
                var item_arr = item_str.split(':'); // ['min','18']
                rule[item_arr[0]] = JSON.parse(item_arr[1]); // {min: 18}
            }
        }
        init();
    }
})