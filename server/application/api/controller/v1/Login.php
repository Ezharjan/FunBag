<?php


namespace app\api\controller\v1;


use app\api\service\UserToken;
use app\api\validate\GetLoginInfo;

class Login
{
    //这里的名称一定要对应起来
    public function getAppToken($account = '', $password = '')//需要账号和密码来换取令牌
    {
        (new GetLoginInfo())->goCheck();
        $app = new UserToken();
        $token = $app->get($account, $password);
        return [
            'success' => true,
            'msg' => '登录成功',
            'token' => $token
        ];
    }
}