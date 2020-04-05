<?php


namespace app\api\validate;


class IDMustBePositiveInt extends BaseValidate
{
    protected $rule = [
        'id' => 'require|isPositiveInt',//字符串之间不要有空格，方法和属性名称要正确对应父类
    ];

    protected $message = [
        'id' =>'id必须是整数'
    ];
}