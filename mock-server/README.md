# mock-server

## 功能
现如今，easy-mock已经挂掉，为了不耽误大家的学习，我特意开发了此mock-server，能够保证课程的接口正常调用。 

## Mock方法

1. 直接调用线上部署好的接口；
> 把前端代码中baseApi修改为：let baseApi = 'http://106.12.220.186:4000/api';
2. 本地搭建mock服务；
>  a. 下载此Git项目
>  b. cd mock-server
>  c. npm install 
>  d. node app.js

最后通过http://localhost:4000/api/table/list 即可访问到第一个接口