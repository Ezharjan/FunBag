<?php

namespace app\api\validate;

class GetLoginInfo extends BaseValidate
{
    protected $rule = [
        'account' => 'require|isNotEmpty',
        'password' => 'require|isNotEmpty'
    ];
}
