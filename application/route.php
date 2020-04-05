<?php
// +----------------------------------------------------------------------
// | Copyright (c) 2020~2021 All rights reserved.
// +----------------------------------------------------------------------
// | Author: Alexadner <bjutsoft@sina.com>
// +----------------------------------------------------------------------

use think\Route;

/**
 * 公共资源目录示例——替dui 换public后面的资源名称即可
 * @url:http://localhost:88/funbag/public/images/banner1.png
 */

/**
 * 获取信息:不需要令牌校验
 * @GET
 */
//获取首页需要放置的图片
Route::get('api/:version/banner/:id', 'api/:version.Banner/getBanner');
//用法：http://localhost:88/funbag/public/index.php/api/v1/banner/1

//根据id串获取多个视图栏位的简要信息
Route::get('api/:version/theme', 'api/:version.Theme/getSimpleList');
//用法：http://localhost:88/funbag/public/index.php/api/v1/theme?ids=1,2,3

//根据指定id获取单个栏位视图的详细信息
Route::get('api/:version/theme/:id', 'api/:version.Theme/getComplexOne');
//用法：http://localhost:88/funbag/public/index.php/api/v1/theme/1

//按后台最近更新的顺序获取所有袋子的详细信息予以呈现
Route::get('api/:version/bag/recent', 'api/:version.Bag/getRecent');
//用法：http://localhost:88/funbag/public/index.php/api/v1/bag/recent

//获取所有袋子的信息
Route::get('api/:version/type/all', 'api/:version.Type/getAllTypes');
//用法：http://localhost:88/funbag/public/index.php/api/v1/type/all

//根据指定的id获取指定种类袋子的详细信息
Route::get('api/:version/bag/by_type', 'api/:version.Bag/getAllInType');
//用法：http://localhost:88/funbag/public/index.php/api/v1/bag/by_type?id=3

/**
 * 登录及注册:不需要令牌校验
 * @POST
 */
//登录账号并获取令牌
Route::post('api/:version/login', 'api/:version.Login/getAppToken');
//用法：http://localhost:88/funbag/public/index.php/api/v1/login

//专门用于获取令牌的接口
Route::post('api/:version/get_token', 'api/:version.Token/getAppToken');
//用法：http://localhost:88/funbag/public/index.php/api/v1/get_token

//注册账号，后台校验账号冗余性
Route::post('api/:version/register', 'api/:version.Register/registerAccount');
//用法：http://localhost:88/funbag/public/index.php/api/v1/register

//微信用户获取令牌的方式（微信坂测试）
Route::post('api/:version/token/wx_user', 'api/:version.Token/getToken');
//用法：http://localhost:88/funbag/public/index.php/api/v1/token/wx_user



/**
 * 用户特殊行为:需要令牌校验
 * @POST
 */
//给指定的用户增加个人信息
Route::post('api/:version/add_user_info', 'api/:version.UserInfo/createOrUpdateUser');
//用法：http://localhost:88/funbag/public/index.php/api/v1/add_user_info

//获取指定用户的个人信息(注意：body里不传参，需在headers传uid即可)
Route::post('api/:version/get_user_info', 'api/:version.UserInfo/getUserInfo');
//用法：http://localhost:88/funbag/public/index.php/api/v1/get_user_info

//用户携带令牌和机身信息调用本接口以取袋
Route::post('api/:version/scan','api/:version.Scan/getBag');
//用法：http://localhost:88/funbag/public/index.php/api/v1/scan

//机器携带用户的令牌调用本接口以判断是否需要开机送袋
Route::post('api/:version/open','api/:version.Scan/openMachine');
//用法：http://localhost:88/funbag/public/index.php/api/v1/open


//获取指定用户的下单请求并改变双边数据
Route::post('api/:version/order', 'api/:version.Order/placeOrder');

