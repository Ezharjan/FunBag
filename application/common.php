<?php
// +----------------------------------------------------------------------
// | Copyright (c) 2020~2021 All rights reserved.
// +----------------------------------------------------------------------
// | Author: Alexadner Ezharjan <bjutsoft@sina.com>
// +----------------------------------------------------------------------

// 应用公共文件
/**
 * @param string $url get 请求地址
 * @param int $httpCode 返回状态码
 * @return mixed
 */
function curl_get($url, $httpCode = 0)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);//不做整数校验
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    $file_contents = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $file_contents;
}

function getRandChars($length)
{
    $str = null;
    $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    $max = strlen($strPol) - 1;

    for ($i = 0; $i < $length; $i++) {
        $str .= $strPol[rand(0, $max)];
    }
    return $str;
}