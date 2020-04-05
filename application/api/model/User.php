<?php


namespace app\api\model;


class User extends BaseModel
{
    //关联属性
    public function user()
    {
        //一对一的关系（有方向，与belongs to不同；拥有外键的一方要关联的话使用belongsTo!!!
        return $this->hasOne('UserInfo', 'user_id', 'id');
    }

    //查询用户是否存在
    public static function getByOpenID($openid)
    {
        $user = self::where('openid', '=', $openid)
            ->find();
        return $user;
    }

}