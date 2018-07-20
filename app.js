//app.js
const static_data = require('./utils/static_data.js');
const request_util = require('./utils/request_util.js');
const api_util = require('./utils/api_util.js');
const toast = require('./utils/toast_util.js');
const common_util = require('./utils/util.js');
const WxParse = require('./plugin/wxParse/wxParse.js');
var loginStatus = true;
App({
        token: '',
        static_data: static_data,
        request_util: request_util,
        api_util: api_util,
        WxParse: WxParse,
        toast: toast,
        common_util: common_util,
        //获取会话失败的弹窗提醒
        getSessionError: function () {
                wx.showModal({
                        title: '提示',
                        content: '获取用户会话失败,请重新进入',
                        showCancel: false,
                        success: function (res) {
                                if (res.confirm) {

                                } else if (res.cancel) {

                                }
                        }
                })
        },
        /**
         * 获取转发票据
         */
        getShareTicket: function (ops) {
                var that = this;
                if (ops.scene == 1044) {
                        console.log("shareTicket:" + ops.shareTicket);
                        if (ops.shareTicket) {
                                // 获取转发详细信息
                                wx.getShareInfo({
                                        shareTicket: ops.shareTicket,
                                        success(res) {
                                                var errMsg = res.errMsg;
                                                var encryptedData = res.encryptedData;
                                                var iv = res.iv;
                                                var sessionkey = that.globalData.sessionkey;
                                                var token = that.globalData.token;
                                                console.log(encryptedData);
                                                console.log(iv);
                                                console.log(sessionkey);
                                                api_util.decodeinfo({
                                                        sessionkey: sessionkey,
                                                        encryptedData: encryptedData,
                                                        iv: iv
                                                }, "", function success(r) {
                                                        if (r.errcode == 0) {

                                                        }
                                                        console.log(r)
                                                }, function fail(r) {

                                                });
                                        },
                                        fail() { },
                                        complete() { }
                                });
                        }
                }
        },
        onShow: function (ops) {

        },
        /**
         * 强制授权操作
        */
        getPromission: function () {
                var that = this;
                if (!loginStatus) {
                        wx.openSetting({
                                success: function (data) {
                                        if (data) {
                                                if (data.authSetting["scope.userInfo"] == true) {
                                                        loginStatus = true;
                                                        wx.getUserInfo({
                                                                withCredentials: false,
                                                                success: function (data) {
                                                                        console.info("2成功获取用户返回数据");
                                                                        console.info(data.userInfo);
                                                                        that.synUserInfo(data.userInfo);
                                                                },
                                                                fail: function () {
                                                                        console.info("2授权失败返回数据");
                                                                }
                                                        });
                                                }
                                        }
                                },
                                fail: function () {
                                        console.info("设置失败返回数据");
                                }
                        });
                } else {
                        wx.login({
                                success: function (res) {
                                        if (res.code) {
                                                wx.getUserInfo({
                                                        withCredentials: false,
                                                        success: function (data) {
                                                                console.info("1成功获取用户返回数据");
                                                                console.info(data.userInfo);
                                                                that.synUserInfo(data.userInfo);
                                                        },
                                                        fail: function () {
                                                                console.info("1授权失败返回数据");
                                                                loginStatus = false;
                                                                // 显示提示弹窗
                                                                wx.showModal({
                                                                        title: '温馨提示',
                                                                        content: '为了更好的体验，请允许授权',
                                                                        showCancel: false,
                                                                        success: function (res) {
                                                                                wx.openSetting({
                                                                                        success: function (data) {
                                                                                                if (data) {
                                                                                                        if (data.authSetting["scope.userInfo"] == true) {
                                                                                                                loginStatus = true;
                                                                                                                wx.getUserInfo({
                                                                                                                        withCredentials: false,
                                                                                                                        success: function (data) {
                                                                                                                                console.info("3成功获取用户返回数据");
                                                                                                                                console.info(data.userInfo);
                                                                                                                                that.synUserInfo(data.userInfo);
                                                                                                                        },
                                                                                                                        fail: function () {
                                                                                                                                console.info("3授权失败返回数据");
                                                                                                                        }
                                                                                                                });
                                                                                                        }
                                                                                                }
                                                                                        },
                                                                                        fail: function () {
                                                                                                console.info("设置失败返回数据");
                                                                                        }
                                                                                });
                                                                        }
                                                                });
                                                        }
                                                });
                                        }
                                },
                                fail: function () {
                                        console.info("登录失败返回数据");
                                }
                        });
                }
        },
        /**
         * 同步服务器用户信息
         */
        synUserInfo: function (userInfo) {
          var that = this;
          var member = that.globalData.member;
          var memberData = {
            id: member.userInfo.id,
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            appid: member.appid,
            version: member.version,
            gender: userInfo.gender,
            city: userInfo.city,
            province: userInfo.province,
            country: userInfo.country,
            language: userInfo.language,
            openId: member.openId,
            createUserId: member.createUserId
          }
          that.globalData.member.userInfo = memberData;
          api_util.get_login(memberData, "", function success(data) {
            that.globalData.member.userInfo = memberData;
          }, function (data) {

          });
        },
        getUserInfo: function () {
                var that = this;
                var status = true;
                var member = wx.getStorageSync('member') || {};
                that.globalData.member = member;
                if (member.headUrl.length == 0) {
                        wx.setStorageSync('userid', member.id);
                        //获取用户信息
                        wx.getUserInfo({
                                success: function (res) {
                                        console.log("getUserInfo");
                                        console.log(res);
                                        var encryptedData = res.encryptedData;
                                        var iv = res.iv;
                                        var signature = res.signature;

                                        var userInfo = res.userInfo;
                                        that.globalData.userInfo = res.userInfo
                                        member.headUrl = userInfo.avatarUrl;
                                        member.name = userInfo.nickName;
                                        api_util.get_login(member, "", function (data) {
                                                console.log("授权了");
                                                console.log(data);
                                        }, function (data) {

                                        });
                                },
                                fail: function (res) {
                                        console.log("不授权了");
                                        wx.showModal({
                                                title: '提示',
                                                content: '为了更好的功能体验，请允许授权用户信息',
                                                success: function (res) {
                                                        that.getUserInfo();
                                                }
                                        })
                                }
                        })
                }
        },
        /**
         * 获取登录接口
         * */
        getSession: function (callback) {
                var that = this;
                wx.getExtConfig({
                        success: function (res) {
                                var appid = res.extConfig.appid;
                                var createUserId = res.extConfig.createUserId;
                                that.globalData.appid = appid
                                wx.login({
                                        success: function (res) {

                                                request_util.jscode2_session({
                                                        appid: appid,
                                                        js_code: res.code,
                                                        createUserId: createUserId
                                                }, function success(result) {
                                                        if (result.errcode == 0) {
                                                                // that.getShareTicket(callback);
                                                                var openid = result.result.openid;
                                                                var sessionkey = result.result.session_key;
                                                                var member = result.result.member;
                                                                that.globalData.sessionkey = sessionkey;
                                                                var token = result.result.token;
                                                                that.globalData.token = token;
                                                                console.log(token)
                                                                wx.setStorageSync('token', token);
                                                                wx.setStorageSync('openid', openid);
                                                                wx.setStorageSync('sessionkey', sessionkey);
                                                                wx.setStorageSync('member', member);
                                                                wx.setStorage({
                                                                        key: "token",
                                                                        data: token
                                                                });
                                                                that.globalData.token = token;
                                                                that.globalData.member = member;
                                                                that.globalData.createUserId = createUserId;
                                                                if (that.userInfoReadyCallback) {
                                                                        that.userInfoReadyCallback(res)
                                                                }
                                                        } else {
                                                             
                                                          that.getSessionError();
                                                        }
                                                      
                                                        
                                                }, function fail(result) {
                                               
                                                });
                                        }
                                })
                        }
                })
        },
        onLaunch: function (ops) {
                // 展示本地存储能力
                console.log("onLaunch");
                var logs = wx.getStorageSync('logs') || []
                logs.unshift(Date.now())
                wx.setStorageSync('logs', logs)
                this.getSession({});
        },
        globalData: {
                token: '',
                userInfo: null,
                createUserId: 0,
                isPayPattern: 0,
                kfMobile: '',
                appid: '',
                sessionkey: '',
                member: null,
                shopInfo:null,
                groupId:'',
                saveOrder: [],//下单的数据
        },
        //多张图片上传
        uploadimg: function (data, dirs) {
                var that = this;
                var paths = '';
                for (var i = 0; i < data.path.length; i++) {
                        paths = data.path[i]
                }
                wx.uploadFile({
                        url: data.url,
                        filePath: paths,
                        name: 'image', //文件对应的参数名字(key)  
                        formData: data,  //其它的表单信息  
                        success: function (res) {
                                var data = JSON.parse(res.data);;
                                var imgs = dirs;
                                for (var i = 0; i < data.files.length; i++) {
                                        imgs.push(data.files[i].dir)
                                }
                                console.log(data)
                        }
                })
        },
})