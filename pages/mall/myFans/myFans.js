// pages/vote/voteBoard/voteBoard.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileDomain: app.static_data.file_domain_url,
    shopInfo: {},
    member:{},
    list:[],//粉丝列表
    size:10,
    number:1,
    hasMoreData: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
  var shopInfo = app.globalData.shopInfo;
  app.common_util.setBarColor(shopInfo.tone);
  that.setData({
    shopInfo: shopInfo,
    member: app.globalData.member
  })
  that.relation();
  },
  //获取粉丝数据
  relation:function(msg){
   var that=this;
   var data={
     size:that.data.size,
     number:that.data.number,
     memberId:app.globalData.member.id
   }
   app.api_util.relation(data, '加载中..', function success(res) {
     if (res.content.length>0) {
       var contentlistTem = that.data.list;
       if (that.data.number == 1) {
         contentlistTem = [];
       }
       var list = res.content;
       console.log(res.content);
       if (list.length < that.data.size) {
         that.setData({
           list: contentlistTem.concat(list),
           hasMoreData: false,
         })
       } else {
         that.setData({
           list: contentlistTem.concat(list),
           hasMoreData: true,
           number: that.data.number + 1,
         })
       }
       that.setData({
         list: list
       })
     }
   }, function fail(res) {

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
    this.data.number = 1
    this.relation('正在刷新数据')
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.relation('加载更多数据');
    } else {
      app.toast.warn("没有更多数据", 1000);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})