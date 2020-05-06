<?php


namespace app\api\validate;


class ValidateMachineInfo extends BaseValidate
{
    protected $rule = [
        'machine_type' => 'require|isNotEmpty',
        'machine_id' => 'require|isPositiveInt',
        //注意！用户的UID绝对不能从这里获取！！！传入了也不能在这里用！
    ];
}