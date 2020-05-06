<?php


namespace app\lib\exception;


class TokenException extends BaseException
{
    public $success = false;
    public $code = 401;
    public $msg = 'Token已过期或无效';
    public $errorCode = 10001;
}