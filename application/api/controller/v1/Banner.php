<?php

namespace app\api\controller\v1;

use app\api\model\Banner as BannerModel;
use app\api\validate\IDMustBePositiveInt;
use app\lib\exception\BannerMissException;

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
        (new IDMustBePositiveInt())->goCheck();

        $banner = BannerModel::getBannerByID($id);
        if (!$banner) {
            throw new BannerMissException();
        }
        return $banner;//使用think内部的基类时不必使用json去接
    }
}