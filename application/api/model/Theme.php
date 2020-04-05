<?php


namespace app\api\model;


class Theme extends BaseModel
{
    protected $hidden = ['delete_time', 'topic_img_id', 'update_time'];

    public function topicImg()
    {
//        $this->hasOne()//跟下面一样——都代表一对一
        return $this->belongsTo('Image', 'topic_img_id', 'id');
    }

    public function bags()
    {
        return $this->belongsToMany('Bag', 'theme_bag',//中间表的表名
            'bag_id', 'theme_id');
    }

    //先定义关联关系，然后去使用关联关系
    public static function getThemeWithBags($id)
    {
        $theme = self::with('bags,topicImg')->find($id);
        return $theme;
    }

}