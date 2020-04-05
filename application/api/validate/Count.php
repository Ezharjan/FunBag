<?php


namespace app\api\validate;


class Count extends BaseValidate
{
    protected $rule = [
        'count' => 'isPositiveInt|between:1,15'//传入范围
    ];
}