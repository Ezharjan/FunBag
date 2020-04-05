<?php


namespace app\lib\exception;


class UserExistException extends BaseException
{
    public $code = 407;
    public $msg = '检测到用户的注册信息，请直接登录。';
    public $errorCode = 66666;
}