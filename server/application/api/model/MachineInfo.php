<?php


namespace app\api\model;


class MachineInfo extends BaseModel
{
    public static function check($machine_type,$machine_id)//查看账号密码是否匹配
    {
        $app = self::where('machine_type', '=', $machine_type)
            ->where('machine_id', '=', $machine_id)
            ->find();
        return $app;
    }
}