<?php

namespace app\api\model;

use think\Model;

class BaseModel extends Model
{
//    public function getUrlAttr($value, $data)//会被自动识别成读取器
    protected function prefixImgUrl($value, $data)//只能被子类继承
    {//value是url的地址名，data是具体的数组，自动传入
        $finalUrl = $value;
        if ($data['from'] == 1) {
            $finalUrl = config('settings.img_prefix') . $value;
        }//当且仅当from为1的时候才返回本地路劲拼接结果，否则直接返回源地址（网络地址）
        return $finalUrl;
    }
}
