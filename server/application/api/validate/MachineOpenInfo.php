<?php


namespace app\api\validate;


class MachineOpenInfo extends BaseValidate
{
    protected $rule = [
        'state' => 'require|isNotEmpty',
        'machine_id' => 'require|isPositiveInt'
    ];
}