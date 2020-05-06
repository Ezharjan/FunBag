<?php


namespace app\api\validate;


class IDCollection extends BaseValidate
{
    protected $rule = [
        'ids' => 'require|checkIDs'
    ];

    protected $message = [
        'ids' => 'ids必须是以逗号分隔的多个正整数'
    ];
    protected function checkIDs($value)
    {
        $values = explode(',', $value);//将客户端传进来的数组分割成逗号分隔的形式
        if ((empty($values))) {
            return false;
        }
        foreach ($values as $id) {
            if (!$this->isPositiveInt($id)){
                return false;
            }
            return true;
        }

    }
}