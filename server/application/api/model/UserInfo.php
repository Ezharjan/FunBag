<?php


namespace app\api\model;


class UserInfo extends BaseModel
{
    protected $hidden = ['id', 'update_time','create_time','delete_time', 'user_id'];
}