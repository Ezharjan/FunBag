<?php


namespace app\lib\exception;


class OrderException extends BaseException
{
    public $code = 404;
    public $msg = '商品不存在，请检查ID';
    public $errorCode = 80000;
}