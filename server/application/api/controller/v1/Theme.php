<?php

namespace app\api\controller\v1;

use app\api\model\Theme as ThemeModel;
use app\api\validate\IDCollection;
use app\api\validate\IDMustBePositiveInt;
use app\lib\exception\ThemeException;

class Theme
{
    /**
     * @url /theme?ids=id1,id2,id3,...
     * @return 一组theme模型
     * @throws \app\lib\exception\ParameterException
     */
    public function getSimpleList($ids = '')
    {
        (new IDCollection())->goCheck();
//        return 'success';//调试使用
        $ids = explode(',', $ids);
        $result = ThemeModel::with('topicImg')
            ->select($ids);
        if ($result->isEmpty()) {
            throw new ThemeException();
        }
        return $result;
    }

    /**
     * @url /theme/:id
     * @param $id
     * @throws \app\lib\exception\ParameterException
     */
    public function getComplexOne($id)
    {
        (new IDMustBePositiveInt())->goCheck();
        $theme = ThemeModel::getThemeWithBags($id);
        if (!$theme){
            throw new ThemeException();
        }
        return $theme;
    }

}
