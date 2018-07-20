// pages/mall/list/shopList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileDomain: app.static_data.file_domain_url,
    list: [],
    pageNo: 1,
    size: 10,
    searchName: '',
    hidden: false,
    isHideLoadMore: false,
    focus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var liketitle = options.likeTitle;
      that.setData({
        searchName: liketitle,
      })
    that.get_shopList();
    app.common_util.setBarColor(app.globalData.shopInfo.tone);
  },
  /*商品列表*/
  get_shopList: function () {
    var that = this;
    var types = 1;
    var pageNo = that.data.pageNo;
    var likeTitle = that.data.searchName;
    var shopList = {
      size: that.data.size,
      number: pageNo,
      type: types,
      likeTitle: likeTitle
    }
    app.api_util.getProductList(shopList, "加载中", function sussess(res) {
      console.log(res);
      if (res.errcode == 0) {
        if (res.result.content.length != 0 && res.result.content != '') {
          var list = res.result.content;
          if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
              var l = list[i];
              var s = l.imageIds.split(",");
              l.imageIds = s[0];
            }
          }
            that.setData({
              list: list
            })
        }
        else{
          that.setData({
            list:[]
          })
        }

      }
    }, function fail(res) {

    });
  },
  bindKeyInput: function (e) {
    var value = e.detail.value;
    console.log(value +"value")
    if (value!='') {
      this.setData({
        searchName: value,
      })
    }
    else{
      this.setData({
        searchName:'',
      }) 
    }
    console.log(this.data.searchName + "ffvalue")
  },
  /*搜索商品*/
  searchShop: function () {
    this.get_shopList();
  },
  /*商品详情*/
  goDetail: function (options) {
    var shopId = options.currentTarget.id;
    wx.navigateTo({
      url: '../detail/mall_detail?id=' + shopId
    })
  },
  /*跳转到消息通知*/
  openMessage: function () {
    wx.navigateTo({
      url: '../message/message'
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    setTimeout(function () {
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})