<?php


namespace app\api\service;


use app\api\model\LoginInfo;
use app\api\model\MachineInfo;
use app\api\model\MachineState;
use app\api\validate\ValidateOpeness;
use app\lib\exception\MachineNotExist;
use app\lib\exception\UserExistException;

class CheckMachine extends Token
{
    public function checkMachineExistion($machine_type, $machine_id)
    {

        $app = MachineInfo::check($machine_type, $machine_id);

        if (!$app) {
            throw new  MachineNotExist();
        } else {
            return 666;//机器的状态信息
        }
    }

    public function checkMachineState($state, $machine_id)
    {
        $app = MachineState::check($state, $machine_id);
        if (!$app) {
            throw new  ValidateOpeness();
        } else {
            return 666;//机器的状态信息
        }
    }

}