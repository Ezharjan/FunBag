<?php


namespace app\api\model;


class MachineState extends BaseModel
{
    public static function check($state,$machine_id)//查看账号密码是否匹配
    {
        $app = self::where('state', '=', $state)
            ->where('machine_id', '=', $machine_id)
            ->find();
        return $app;
    }
}