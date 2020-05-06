<?php


namespace app\api\controller\v1;


use app\api\service\UserToken;
use app\api\service\Token4WX;
use app\api\validate\GetLoginInfo;
use app\api\validate\TokenGet;

class Token
{
    public function getToken($code = '')
    {
        (new TokenGet())->goCheck();
        $ut = new Token4WX($code);//给微信小程序用户颁发令牌
        $token = $ut->get();
        return [
            $token => $token
        ];
    }


    /**
     * 第三方应用获取令牌
     * @url /app_token?
     * @POST account=:ac password=:secret
     * 这里的名称一定要对应起来
     */
    public function getAppToken($account = '', $password = '')//需要账号和密码来换取令牌
    {
        (new GetLoginInfo())->goCheck();
        $app = new UserToken();
        $token = $app->get($account, $password);
        return [
            'token' => $token
        ];
    }

}