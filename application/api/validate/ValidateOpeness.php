<?php


namespace app\api\validate;


use app\lib\exception\BaseException;

class ValidateOpeness extends BaseException
{
    public $code = 111;
    public $msg = '请尝试持续发送直至用户付款。';
    public $errorCode = 88888;
}