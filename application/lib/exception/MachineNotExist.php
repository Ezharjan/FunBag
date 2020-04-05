<?php


namespace app\lib\exception;


class MachineNotExist extends BaseException
{
    public $code = 407;
    public $msg = '机器不存在。';
    public $errorCode = 77700;
}