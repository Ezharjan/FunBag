<?php


namespace app\api\model;

class Bag extends BaseModel
{
    protected $hidden = [
        'delete_time', 'update_time', 'pivot', 'from', 'create_time'
    ];

    public function getMainImgUrlAttr($value, $data)
    {
        return $this->prefixImgUrl($value, $data);
    }

    //建立数据之间的关联
    public function img()
    {
        return $this->belongsTo('Image', 'topic_img_id', 'id');
    }

    public static function getMostRecent($count)
    {
        $bags = self::limit($count)
            ->order('create_time desc')//根据创建的时间进行排序，TP5自己为我们提供了排序函数
            ->select();
        return $bags;
    }

    public static function getBagsByType($type)
    {
        $bags = self::where('type', '=', $type)->select();
        return $bags;
    }
}