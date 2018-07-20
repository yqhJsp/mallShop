// pages/mall/infodetail/infodetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileDomain: app.static_data.file_domain_url,
    info:{},
    article: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    app.common_util.setBarColor(app.globalData.shopInfo.tone);
    app.api_util.information(id, '', function success(res) {
      if (res.errcode == 0) {
        var article = res.result.content;
        console.log(res.result.content)
        that.setData({
          info: res.result,
          article: app.WxParse.wxParse('article', 'html', article, that, 0)
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