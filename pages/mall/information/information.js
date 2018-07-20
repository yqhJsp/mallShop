// pages/mall/information/information.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileDomain: app.static_data.file_domain_url,
    list:[],
    size:10,
    number: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.informationlist();
    app.common_util.setBarColor(app.globalData.shopInfo.tone);
  },
  //资讯
  informationlist: function () {
    var that = this;
    var size = that.data.size;
    var number = that.data.number;
    app.api_util.informationlist({ size: size, number: number }, "加载中", function success(res) {
      if (res.errcode == 0) {
        that.setData({
          informationlist: res.result.content
        })
      } else {

      }
    }, function fail(res) {

    });
  },
  
  //详情
  goInfoDetail:function(e){
  var that=this;
  var id=e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '../infodetail/infodetail?id='+id
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