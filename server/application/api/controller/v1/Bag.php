<?php


namespace app\api\controller\v1;

use app\api\model\Bag as BagModel;
use app\api\validate\Count;
use app\api\validate\IDMustBePositiveInt;
use app\api\validate\ProductException;


class Bag
{
    public function getRecent($count = 15)//当不传入的时候会取默认值15
    {
        (new Count())->goCheck();
        $bags = BagModel::getMostRecent($count);
        if ($bags->isEmpty()) {
            throw new ProductException();
        }
        return $bags;
    }

    public function getAllInType($id)
    {
        (new IDMustBePositiveInt())->goCheck();
        $bag = BagModel::getBagsByType($id);
        if ($bag->isEmpty()) {
            throw new ProductException();
        }
        return $bag;
    }
}