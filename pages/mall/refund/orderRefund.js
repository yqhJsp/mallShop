// pages/mall/refund/orderRefund.js
const app = getApp();
Page({

        /**
         * 页面的初始数据
         */
        data: {
                orderInfo: {},
                orderId: '',
                fileDomain: app.static_data.file_domain_url,
                showModalStatus: false,
                showStatus: false,
                showTextarea:true,//是否显示文本框
                retype: '',
                type_des: '点击选择退款类型',
                reson_des: '点击选择退款原因',
                reson: '',
                iselect: 1,
                cause_desc: '',
                iselectReson: 1,
                focus:false,//聚焦
                img_arr: [],
                dirs: [],
                cause_reson: '',
                resonArr: ["质量问题", "卖家发错货", "货物与描述不符", "不喜欢/效果不好", "多拍/拍错/不想要", '其他'],
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                app.common_util.setBarColor(app.globalData.shopInfo.tone);
                var that = this;
                wx.setNavigationBarTitle({
                        title: '申请退款'
                })
                wx.getStorage({
                        key: 'refundOrder',
                        success: function (res) {
                                that.setData({
                                        orderInfo: res.data
                                })
                        }
                })
        },
        /*获取文本域的内容*/
        bindResonInput: function (e) {
                var value = e.detail.value;
                if (value > 0 || value.length > 0) {
                        this.setData({
                                cause_reson: value,
                        })
                }
        },
        bindKeyInput: function (e) {
                var value = e.detail.value;
                if (value > 0 || value.length > 0) {
                        this.setData({
                                cause_desc: value,
                        })
                }
        },
        /*选择退款类型*/
        selectType: function () {
                var that = this;
                that.setData({
                        showModalStatus: true,
                        showTextarea:false
                })
        },
        selectCause: function () {
                var that = this;
                that.setData({
                        showStatus: true,
                        showTextarea: false
                })
        },
        //更新member
        updateMember: function () {
          var that = this;
          var id = that.data.member.id;
          app.api_util.updateMembers({ id: id }, '', function succes(res) {
            if (res.errcode == 0) {
              app.globalData.member = res.result;
            }
          }, function fail(res) {

          })
        },
        modalOk: function () {
                var that = this;
                if (that.data.iselect == 1) {
                        app.toast.warn("请选择退款类型", 1000);
                        return;
                }
                else {
                        if (that.data.retype == 1) {
                                that.setData({
                                        type_des: '退款（无需退货）'
                                })
                        } else {
                                that.setData({
                                        type_des: '退款退货'
                                })
                        }
                        that.setData({
                                showModalStatus: false,//隐藏遮罩 
                                showTextarea:true      
                        })
                }
        },
        chooseType: function (options) {
                var that = this;
                var id = options.currentTarget.dataset.id;
                if (id != that.data.retype) {
                        that.setData({
                                retype: id,
                                iselect: 0
                        })
                }
        },
        modalconfirm: function () {
                var that = this;
                if (that.data.iselectReson == 1) {
                        app.toast.warn("请选择原因", 1000);
                        return;
                }
                var reson = that.data.reson;
                var arr = that.data.resonArr;
                for (var i = 0; i < arr.length; i++) {
                        if (reson >= i) {
                                that.setData({
                                        reson_des: arr[i]
                                })
                        }
                }
                console.log(that.data.reson_des);
                that.setData({
                        showStatus: false,//隐藏遮罩
                        showTextarea: true             
                })
        },
        chooseReson: function (options) {
                var that = this;
                var id = options.currentTarget.dataset.idx;
                        that.setData({
                                reson: id+1,
                                iselectReson: 0
                        })
                        console.log(that.data.reson)
        },
        //选取图片的方法
        upimg: function () {
                var that = this,
                        img_arr = that.data.img_arr;
                var dirs = that.data.dirs;
                if (img_arr.length < 3) {
                        wx.chooseImage({
                                count: 3 - img_arr.length, // 最多可以选择的图片张数，默认9
                                sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
                                sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
                                success: function (res) {
                                        var imgsrc = res.tempFilePaths;
                                        app.uploadimg({
                                                url: app.static_data.source_domain_url + '/attachment/upload', //这里是你图片上传的接口
                                                path: imgsrc//这里是选取的图片的地址数组
                                        }, dirs);
                                        img_arr = img_arr.concat(imgsrc);
                                        that.setData({
                                                img_arr: img_arr
                                        });
                                },
                                fail: function () {

                                },
                                complete: function () {

                                }
                        })
                } else {
                        app.toast.warn("最多上传三张图片", 1000);
                }

        },
        /*申请退款*/
        refund: function () {
                var that = this;
                var types = that.data.retype;
                var member = app.globalData.member;
                if (types == 0) {
                        app.toast.warn("请选择退款类型", 1000);
                        return;
                }
                var causeType = that.data.reson;
                var causeDesc = that.data.cause_desc;
                var imageIds = [];
                imageIds = that.data.dirs;
          
                                var data = {
                                        memberId: member.id,
                                        productId: that.data.orderInfo.productId,
                                        orderId: that.data.orderInfo.id,
                                        money: that.data.orderInfo.money,
                                        type: types,
                                        causeType: causeType,
                                        causeDesc: causeDesc,
                                        imageIds: imageIds.toString(),
                                        createUserId: app.globalData.createUserId
                                }
                                app.api_util.order_refund(data, '', function success(res) {
                                        if (res.errcode == 0) {
                                                console.log(res.result)
                                                app.toast.success("提交退款成功", 2000);
                                                that.updateMember();
                                                wx.redirectTo({
                                                        url: '/pages/user/mineOrder/orderItems?id=' + 5
                                                })
                                        } else {
                                                app.toast.warn("网络异常", 2000);
                                        }
                                }, function fail(res) {
                                        app.toast.warn("网络异常", 2000);
                                }
                                )
        
        },
        /*隐藏弹窗*/
        hideModal: function (data) {
                var that = this;
                that.setData({
                        showModalStatus: false,//隐藏遮罩 
                        showStatus: false,
                        showTextarea:true
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