<?php

namespace app\api\validate;

use app\lib\exception\ParameterException;
use think\Request;
use think\Validate;

class BaseValidate extends Validate
{
    public function goCheck()
    {
        $request = Request::instance();
        $params = $request->param();//获取所有参数


        $result = $this->batch()->check($params);//批量印出
        if (!$result) {
            $e = new ParameterException([
                'msg' => $this->error,
            ]);
            throw $e;
        } else {
            return true;
        }
    }

    protected function isPositiveInt($value, $rule = '', $data = '', $field = '')
    {
        //是不是数字？                    是不是整型？      是不是大于零的？
        if (is_numeric($value) && is_int($value + 0) && ($value + 0 > 0)) {
            return true;
        } else {
            return false;
            //return $field . '必须是整数';
        }
    }

    public function isNotEmpty($value, $rule = '', $data = '', $field = '')
    {
        if (empty($value)) {
            return false;
        } else {
            return true;
        }
    }

    //接收客户端传来的所有参数并在内部对参数变量进行过滤和筛选——通用
    public function getDataByRule($arrays)
    {
        if (array_key_exists('user_id', $arrays) | array_key_exists('uid', $arrays)) {
            //不允许包含user_id或uid，防止恶意覆盖user_id外键
            throw new ParameterException([
                'msg' => '参数中包含有非法的参数名user_id或者uid'
            ]);
        }
        $newArray = [];//用来保存客户端发送的变量
        foreach ($this->rule as $key => $value) {
            $newArray[$key] = $arrays[$key];
        }
        return $newArray;
    }

    public function isMobile($value)
    {
        $rule = '^1(3|4|5|7|8)[0-9]\d{8}$^';//使用正则表达式对手机号进行校验
        $result = preg_match($rule, $value);//匹配
        if ($result) {
            return true;
        } else {
            return false;
        }
    }
}