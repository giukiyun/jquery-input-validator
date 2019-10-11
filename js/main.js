$(function () {
    'use strict';

    /* 测试：通过实例化validator输入规则  */
    // var validator=new Validator('~*&ewrewr',{pattern:'^[0-9a-z]*$'});
    // // var result=validator.validate_minlength();
    // // var result=validator.validate_required();
    // var result=validator.validate_pattern();
    // console.log("result",result); 

    /* 测试：通过实例化input对象对输入内容进行验证 */
    //var test =new Input('#test');
    //var valid=test.validator.is_valid();
    //console.log('valid',valid);

    /*选中页面中所有的input[data-rule]*/
    var $inputs = $('[data-rule]'),
        $form = $('#signup'),
        inputs = [];

    $inputs.each(function (index, node) {
        /*解析每一个input的验证规则*/
        var tmp = new Input(node);
        inputs.push(tmp);
    })

    $form.on('submit', function (e) {
        e.preventDefault();
        $inputs.trigger('blur');

        for (var i = 0; i < inputs.length; i++) {
            var item = inputs[i];
            var r = item.validator.is_valid();
            if (!r) {
                alert('invalid');
                return;
            }
        }

        alert('注册成功');
    })

    function signup() {
        //$.post('/api/signup',{...})
    }
})