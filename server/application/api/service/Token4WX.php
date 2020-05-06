<?php


namespace app\api\service;


use app\api\model\User as UserModel;
use app\lib\enum\ScopeEnum;
use app\lib\exception\TokenException;
use app\lib\exception\WechatException;
use think\Exception;

class Token4WX extends Token
{
    protected $code;
    protected $wxAppID;
    protected $wxAppSecret;
    protected $wxLoginUrl;

    public function __construct($code)
    {
        $this->code = $code;
        $this->wxAppID = config('wx.app_id');
        $this->wxAppSecret = config('wx.app_secret');
        //sprintf()为PHP的填入占位符方法
        $this->wxLoginUrl = sprintf(config('wx.login_url'),
            $this->wxAppID, $this->wxAppSecret, $this->code);
    }

    public function get()
    {
        $result = curl_get($this->wxLoginUrl);
        $wxResult = json_decode($result, true);//将字符串变为数组，不加true参数时会变对象
        if (empty($wxResult)) {//判断微信调用失败，空就是失败——经验；
            //异常处理，因为是服务器内部错误，所以不用返回到客户端去；经验性写法。
            throw new Exception('获取session_key及app_id时异常，微信内部错误。');
        } else {
            $loginFail = array_key_exists('errcode', $wxResult);//经验
            if ($loginFail) {
                $this->processLoginError($wxResult);
            } else {
                //success
                return $this->grantToken($wxResult);
            }
        }
    }

    private function grantToken($wxResult)
    {
        //拿到openID
        //去数据库查询openID是否存在——存在则不处理，不存在的话新增一条记录
        //生成令牌，准备缓存数据，写入缓存
        //将令牌返回到客户端
        //key: 令牌
        //value: wxResult, uid, scope(权限级别)
        $openid = $wxResult['openid'];
        $user = UserModel::getByOpenID($openid);
        if ($user) {//用存在——直接获取id号
            $uid = $user->id;
        } else {//用户不存在——先创建用户再获取id号
            $uid = $this->newUser($openid);
        }
        $cacheValue = $this->prepareCachedValue($wxResult, $uid);
        $token = $this->saveToCache($cacheValue);
        return $token;
    }

    private function saveToCache($cachedValue)
    {
        $key = self::generateToken();
        $value = json_encode($cachedValue);
        $expire_in = config('settings.token_expire_in');

        //写入TP5自带的缓存中
        $request = cache($key, $value, $expire_in);
        if (!$request) {
            throw new TokenException([
                'success' => false,
                'msg' => '服务器缓存异常',
                'errorCode' => 10005]);
        }
        return $key;//将令牌返回到客户端去
    }


    private function prepareCachedValue($wxResult, $uid)
    {
        $cachedValue = $wxResult;
        $cachedValue['uid'] = $uid;
        //scope=16代表App用户的权限值；32代表CMS用户的权限
        $cachedValue['scope'] = ScopeEnum::User;//作用域、权限
//        $cachedValue['scope'] = 15;//调试Scope权限——记得获取新的令牌！
        return $cachedValue;

    }

    private function newUser($openid)//根据微信公id创建用户
    {
        $user = UserModel::create([
            'openid' => $openid
        ]);
        return $user->id;

    }

    //只要是需要返回到客户端的异常，都要在lib下建立Exception类
    private function processLoginError($wxResult)
    {
        throw new WechatException([
            'success' => false,
            'msg' => '微信调用码不合法——' . $wxResult['errmsg'],
            'errorCode' => $wxResult['errcode']
        ]);
    }
}