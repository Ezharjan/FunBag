<?php


namespace app\lib\exception;


class BannerMissException extends BaseException
{
    public $code = 404;
    public $msg = '请求的Banner不存在';
    public $errCode = 40000;//自定义的异常状态码体系

}