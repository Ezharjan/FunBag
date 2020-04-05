<?php


namespace app\api\model;

class Banner extends BaseModel
{
    protected $hidden = ['delete_time','update_time'];//这样之后会自动隐藏id

    public function items(){//做模型关联
        return $this->hasMany('Banner_item','banner_id','id');
    }

    public static function getBannerByID($id)
    {
        $banner = self::with(['items','items.img'])->find($id);//使用数组表示嵌套关系
        return $banner;
    }
}