<?php


namespace app\api\controller\v1;

use app\api\model\Bag as BagModel;
use app\api\validate\TypeException;

class Type
{
    public function getAllTypes()
    {
        $types = BagModel::all([], 'img');//也可以不用with的写法，换成这种写法
        if ($types->isEmpty()) {
            throw new TypeException();
        }
        return $types;
    }
}