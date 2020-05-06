<?php


namespace app\api\validate;


use app\lib\exception\BaseException;

class TypeException extends BaseException
{
    public $code = 404;
    public $msg = '指定的类不存在，请检查参数。';
    public $errorCode = 50000;

}