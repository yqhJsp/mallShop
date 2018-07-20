var API_DOMAIN_URL = "https://spa.sefve.com/mall/mini";
var FILE_DOMAIN_URL = "https://file.sefve.com/";
var SOURCE_DOMAIN_URL = "https://spa.sefve.com/mall/";
var MEMBER_DOMAIN_URL = "https://spa.sefve.com/member/mini";
module.exports = {
    file_domain_url: FILE_DOMAIN_URL,
    api_domain_url: API_DOMAIN_URL,
    source_domain_url: SOURCE_DOMAIN_URL,
    config_version: 1.0,
    appid: '',
    secret:'',

    decodeinfo_url: API_DOMAIN_URL + '/v1/decodeinfo',     

    unifiedorder_url: SOURCE_DOMAIN_URL +'wxpay/v1/unifiedorder',
    orderquery_url: SOURCE_DOMAIN_URL +'wxpay/v1/orderquery',

    //用户登录
    login_url: MEMBER_DOMAIN_URL + '/v2/session/login',
    jscode2session_url: MEMBER_DOMAIN_URL + '/v2/session/jscode2session',
    //更新member
    updateMembers_url: MEMBER_DOMAIN_URL + '/v2/session/getmember',
    //获取手机号码
    decodeinfo_url: MEMBER_DOMAIN_URL + '/v2/session/decodeinfo',
    //获取推广码
    promocode_url: MEMBER_DOMAIN_URL + '/v2/session/promocode',   

    //秒杀拼团接口地址
    marketing_seckilllist_url: API_DOMAIN_URL +'/v1/marketing/seckilllist',
    marketing_grouplist_url: API_DOMAIN_URL + '/v1/marketing/grouplist',
    marketing_insertsponsor_url: API_DOMAIN_URL + '/v1/marketing/insertsponsor',
    marketing_sponsorlist_url: API_DOMAIN_URL + '/v1/marketing/sponsorlist',
    marketing_insertgrouporder_url: API_DOMAIN_URL + '/v1/marketing/insertgrouporder',
    //秒杀下单
    marketing_insertseckill_url: API_DOMAIN_URL + '/v1/order/insertseckill',
    //拼团
    marketing_insertgroup_url: API_DOMAIN_URL + '/v1/order/insertgroup',
    //拼团发起信息
    marketing_getsponsor_url: API_DOMAIN_URL + '/v1/marketing/getsponsor', 

    //用户收货地址接口地址
    address_queryone_url: MEMBER_DOMAIN_URL + '/v2/address/query/one/',
    address_querylist_url: MEMBER_DOMAIN_URL + '/v2/address/query/list',
    address_insert_url: MEMBER_DOMAIN_URL + '/v2/address/insert',
    address_update_url: MEMBER_DOMAIN_URL + '/v2/address/update',
    address_delete_url: MEMBER_DOMAIN_URL + '/v2/address/delete/',

    //首页接口地址
    home_data_url: API_DOMAIN_URL + '/v1/home',

    //获取快捷入口
    getquickentry_url: API_DOMAIN_URL + '/v1/getquickentry',

    get_notice_list_url: API_DOMAIN_URL + '/v1/getNoticeList',
    get_message_url: API_DOMAIN_URL + '/v1/getMessage',
    message_read_url: API_DOMAIN_URL + '/v1/MessageRead',
    get_groupid_list_url: API_DOMAIN_URL + '/v1/getGroupIdList',
    get_product_list_url: API_DOMAIN_URL + '/v1/getProductList',
    get_product_info_url: API_DOMAIN_URL + '/v1/getProductInfo',
    get_member_info_url: MEMBER_DOMAIN_URL + '/v2/session/getmember',

    //订单接口地址
    order_insert_url: API_DOMAIN_URL + '/v1/order/insert',
    order_close_url: API_DOMAIN_URL + '/v1/order/close',
    order_pendingshipment_url: API_DOMAIN_URL + '/v1/order/pendingshipment',
    order_receipt_url: API_DOMAIN_URL + '/v1/order/receipt',
    order_list_url: API_DOMAIN_URL + '/v1/order/list',
    order_get_one_url: API_DOMAIN_URL + '/v1/order/one',
    order_refund_url: API_DOMAIN_URL + '/v1/order/refund',
    order_update_refund_url: API_DOMAIN_URL + '/v1/order/updateRefund',
    order_evaluate_url: API_DOMAIN_URL + '/v1/order/evaluate',
    order_refund_detail_url: API_DOMAIN_URL + '/v1/order/refundDetail',
    order_close_refund_url: API_DOMAIN_URL + '/v1/order/closeRefund',
    order_get_order_status_count_url: API_DOMAIN_URL + '/v1/order/getOrderStatusCount',

    //购物车
    trolley_list: API_DOMAIN_URL + '/v1/trolley/query/list',
    trolley_insert: API_DOMAIN_URL + '/v1/trolley/insert',
    trolley_update: API_DOMAIN_URL + '/v1/trolley/update',
    trolley_delete: API_DOMAIN_URL + '/v1/trolley/delete/',

    //咨询
    insertsubscribe_url: API_DOMAIN_URL + '/v1/insertsubscribe',
    subscribeliste_url: API_DOMAIN_URL + '/v1/subscribelist',
    updatesubscribe_url: API_DOMAIN_URL + '/v1/updatesubscribe',

    //资讯
    informationlist_url: API_DOMAIN_URL + '/v1/informationlist',
    information_url: API_DOMAIN_URL + '/v1/information',
    
    //优惠券列表
     getcouponlist_url: API_DOMAIN_URL + '/v1/getcouponlist',
     insertcouponuser_url: API_DOMAIN_URL + '/v1/insertcouponuser',
     //修改优惠券为已使用
     updatecouponuser_url: API_DOMAIN_URL + '/v1/updatecouponuser',

     //用户优惠券列表
     getusercouponlist_url: API_DOMAIN_URL + '/v1/getusercouponlist',
     //用户优惠券详情信息
     getusercoupon_url: API_DOMAIN_URL + '/v1/getusercoupon',

     //积分录入
     insertintegrallog_url: API_DOMAIN_URL + '/v1/order/insertintegrallog',
     integralloglist_url: API_DOMAIN_URL + '/v1/order/integralloglist',

     //提交分销商审核
     insertdistributoraudit_url: API_DOMAIN_URL + '/v1/insertdistributoraudit',
     //提交提现
     insertbrokerageapply_url: API_DOMAIN_URL + '/v1/insertbrokerageapply',
     //获取提现列表列表
     brokerageapplylist_url: API_DOMAIN_URL + '/v1/brokerageapplylist',
     //获取收益列表
     brokerageloglist_url: API_DOMAIN_URL + '/v1/brokerageloglist',
     //分销关系插入
     insertbrokeragerelation_url: API_DOMAIN_URL + '/v1/insertbrokeragerelation',
     //获取审核状态
     getdistributoraudit_url: API_DOMAIN_URL + '/v1/getdistributoraudit',
     
     //领取会员信息
     getmember_url: MEMBER_DOMAIN_URL + '/v2/session/getmember',
     addmember_url: MEMBER_DOMAIN_URL + '/v2/session/addmember',
     //置顶秒杀
     seckill_url: API_DOMAIN_URL + '/v1/marketing/seckill/stick',
     //置顶团购
     group_url: API_DOMAIN_URL + '/v1/marketing/group/stick',
     //获取手机短信
     sendsms_url: MEMBER_DOMAIN_URL + '/v2/session/sendsms',

     //取消订单删除开团
     deletesponsor_url: API_DOMAIN_URL + '/v1/marketing/deletesponsor',
     //粉丝管理
     relation_url: API_DOMAIN_URL + '/v1/brokerage/relation',
};