<?php


namespace app\api\validate;


use think\Validate;

class TestValidate extends Validate
{
    //验证规则
    protected $rule = [
        'name' => 'require|max:10',
        'email' => 'email'
    ];
}