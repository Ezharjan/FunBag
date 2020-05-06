<?php


namespace app\api\controller\v1;


use app\api\controller\BaseController;
use app\api\model\User as UserModel;
use app\api\service\CheckMachine;
use app\api\service\Token as TokenService;
use app\api\validate\MachineOpenInfo;
use app\api\validate\ValidateMachineInfo;
use app\lib\exception\SuccessMessage;
use app\lib\exception\UserException;
use think\Db;

class Scan extends BaseController
{
    //方法中的形参名一定要跟前端数据一致！！！
    public function getBag($machine_type, $machine_id)
    {
        $creatTableCmd = 'CREATE TABLE IF NOT EXISTS machine_state(
                            id INT NOT NULL AUTO_INCREMENT,
                            state VARCHAR(100) NOT NULL,
                            machine_id VARCHAR(40) NOT NULL,
                            PRIMARY KEY ( id )
        );';

        $insertStateCmd = '
        INSERT INTO machine_state(state,machine_id) VALUES (?,?)
        ';

        Db::execute($creatTableCmd);

        $validate = new ValidateMachineInfo();
        $validate->goCheck();
        //根据Token获取uid
        //根据uid查找用户数据以判断其是否存在，不存在则抛出异常
        //获取用户从客户端提交的信息
        //根据用户地址信息是否存在来判断添加地址还是更新地址
        $uid = TokenService::getCurrentUid();
        $user = UserModel::get($uid);
        if (!$user) {
            throw new UserException();
        }

        $app = new CheckMachine();
        $state = $app->checkMachineExistion($machine_type, $machine_id);
//        echo 'state is : ' . $state;
        Db::execute($insertStateCmd, [$state, $machine_id]);
        return Json(new SuccessMessage(), 201);
    }

    //机器需携带用户令牌访问该接口；机器必须发送两个形参
        public function openMachine($state, $machine_id)
    {
        $deleteStateCmd = '
        DELETE FROM machine_state
        WHERE state= ?;
        ';

        //根据Token获取uid
        //根据uid查找用户数据以判断其是否存在，不存在则抛出异常
        //获取用户从客户端提交的信息
        //根据用户地址信息是否存在来判断添加地址还是更新地址
        $uid = TokenService::getCurrentUid();
        $user = UserModel::get($uid);
        if (!$user) {
            throw new UserException();//防止黑客冒充用户身份
        }

        $validate = new MachineOpenInfo();
        $validate->goCheck();

        $app = new CheckMachine();
        $app->checkMachineState($state, $machine_id);
        Db::execute($deleteStateCmd,[$state]);
        return Json(new SuccessMessage(), 201);
    }

}