<?php

namespace app\api\model;

use think\Model;

class Image extends BaseModel
{
    protected $hidden = ['update_time', 'delete_time', 'from', 'id'];

    public function getUrlAttr($value, $data)//当模型字段需要时才获取
    {
        return $this->prefixImgUrl($value, $data);//调用业务逻辑的封装
    }
}
