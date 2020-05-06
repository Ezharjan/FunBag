<?php


namespace app\api\validate;


class UserNew extends BaseValidate
{
    protected $rule = [
        'user_name' => 'require|isNotEmpty',
        'user_phone' => 'require|isMobile',
        'user_address' => 'require|isNotEmpty',
        'user_type' => 'require|isNotEmpty',
        'wallet' => 'require|isNotEmpty'
        //注意！用户的UID绝对不能从这里获取！！！传入了也不能在这里用！
    ];
}