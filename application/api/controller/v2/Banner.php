<?php

namespace app\api\controller\v2;

class Banner
{
    /**
     * 获取指定id的Banner信息
     * @url /banner/:id
     * @http GET
     * @id Banner的id号
     */
    public function getBanner($id)
    {
        return 'This is V2 version.';
    }
}