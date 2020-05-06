<?php

namespace app\api\model;

class BannerItem extends BaseModel
{
    protected $hidden = ['id','image_id','banner_id','update_time','delete_time'];
    public function Img()//定义关联关系
    {
        return $this->belongsTo('Image', 'img_id', 'id');
    }
}
