<?php

namespace app\api\service;

use app\api\model\LoginInfo;
use app\lib\exception\TokenException;

//因为登录的时候要发放令牌，所以继承Token
class UserToken extends Token
{
    public function get($account, $password)
    {
        $app = LoginInfo::check($account, $password);

        if (!$app) {
            throw new TokenException([
                'success' => false,
                'msg' => '授权失败',
                'errorCode' => 10004
            ]);
        } else {
            //与JWT不同的是，在这里根据用户的uid结合来生成token
            $uid = $app->id;
            $values = [
                'uid' => $uid
            ];
            $token = $this->saveToCache($values);
            return $token;
        }
    }

    private function saveToCache($values)
    {
        $token = self::generateToken();//基类里面的方法
        $expire_in = config('setting.token_expire_in');
        $result = cache($token, json_encode($values), $expire_in);
        if (!$result) {
            throw new TokenException([
                'msg' => '服务器缓存异常',
                'errorCode' => 10005
            ]);
        }
        return $token;
    }
}