<?php


namespace app\lib\exception;


class ThemeException extends BaseException
{
    public $code = 404;
    public $msg = '指定的主题栏位不存在，请检查主题id';
    public $errorCode = 30000;
}