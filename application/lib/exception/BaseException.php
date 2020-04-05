<?php


namespace app\lib\exception;


use think\Exception;

class BaseException extends Exception
{
    public $success = false;

    //HTTP状态码
    public $code = 400;

    //错误的具体信息
    public $msg = 'Content Error';

    //自定义错误码
    public $errorCode = 10000;

    //构造结构体用于提示错误信息
    public function __construct($params = []){
        if (!is_array($params)){
            return '参数必须是数组';//下种方式也行,根据业务逻辑来选择
            //throw new Exception('参数必须是数组');
        }
        if(array_key_exists('success',$params)){
            $this->success = $params['success'];//保持不变
        }
        if(array_key_exists('code',$params)){
            $this->code = $params['code'];//保持不变
        }
        if(array_key_exists('msg',$params)){
            $this->msg = $params['msg'];//保持不变
        }
        if(array_key_exists('errorCode',$params)){
            $this->errorCode = $params['errorCode'];//保持不变
        }
    }
}