<?php


namespace app\api\controller\v1;

use app\api\service\CheckUser;
use think\Db;

class Register
{
    public function registerAccount($account, $password)
    {
        $creatTableCmd = 'CREATE TABLE IF NOT EXISTS login_info(
                            id INT NOT NULL AUTO_INCREMENT,
                            account VARCHAR(100) NOT NULL,
                            password VARCHAR(40) NOT NULL,
                            PRIMARY KEY ( id )
        );';

        $insertAccountCmd = '
        INSERT INTO login_info(account,password) VALUES (?,?)
        ';

        $createUidTableCmd = '
        CREATE TABLE IF NOT EXISTS user(
                            id INT NOT NULL AUTO_INCREMENT,
                            openid INT,
                            nickname VARCHAR(40),
                            PRIMARY KEY ( id )
        );';

        $insertUidCmd = '
        INSERT INTO user(openid,nickname) VALUES (null,null)
        ';

        Db::execute($creatTableCmd);
        Db::execute($createUidTableCmd);

        $app = new CheckUser();
        $existSameUser = $app->checkUserExistion($account, $password);
        if (!$existSameUser) {
            Db::execute($insertAccountCmd, [$account, $password]);
            Db::execute($insertUidCmd);
            return [
                'success' => true,
                'code' => 201,
                'msg' => '注册成功！',
            ];
        }
    }
}