const menuList = [
    {
        title: '登录',
        key: '/form/login'
    },
    {
        title: '注册',
        key: '/form/reg'
    },
    {
        title: '首页',
        key: '/home'
    },
    {
        title: '趣袋画廊',
        key: '/ui/gallery'
    },
    // {
    //     title: '表格',
    //     key: '/table',
    //     children: [
    //         {
    //             title: '基础表格',
    //             key: '/table/basic',
    //         },
    //         {
    //             title: '高级表格',
    //             key: '/table/high',
    //         }
    //     ]
    // },
    {
        title: '商城管理',
        key: '/city'
    },
    // {
    //     title: '机器管理',
    //     key: '/city'
    // },
    {
        title: '订单管理',
        key: '/order',
        btnList: [
            {
                title: '订单详情',
                key: 'detail'
            },
            {
                title: '结束订单',
                key: 'finish'
            }
        ]
    },
    {
        title: '用户管理',
        key: '/user'
    },
    {
        title: '取袋机地图',
        key: '/bikeMap'
    },
    {
        title: '数据统计',
        key: '/charts',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar'
            },
            {
                title: '饼图',
                key: '/charts/pie'
            },
            {
                title: '折线图',
                key: '/charts/line'
            },
        ]
    },
    {
        title: '权限设置',
        key: '/permission'
    },
];
export default menuList;