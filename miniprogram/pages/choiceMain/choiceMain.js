var that;
const app = getApp()
Page({
  data: {
    startSrc: '../register/register',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  start: function() {
    // const db = wx.cloud.database()
    // db.collection('users').where({
    //   _openid: app.globalData.openid
    // }).get({
    //   success: function(res) {
    //     console.log(res.data.length)
    //     console.log(app.globalData.openid)
    //     if (res.data.length)
    //       wx.navigateTo({
    //         url: '../singleChoiceExplain/singleChoiceExplain',
    //       })
    //     else {
    //       wx.navigateTo({
    //         url: '../register/register',
    //       })
    //     }
    //   }
    // })
      wx.navigateTo({
            url: '../singleChoiceExplain/singleChoiceExplain',
          })
  },


  onLoad: function() {
    const db = wx.cloud.database()
    db.collection('users').where({
      _openid: app.globalData.openid
    }).get({
      success: function(res) {
        if(!res.data.length) {
          wx.navigateTo({
            url: '../register/register',
          })
        }
      }
    })

    that = this;

    

    wx.getSetting({

      success: res => {
        // console.log("11");
        // if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: function(res) {

            var avatarUrl = 'userInfo.avatarUrl';
            var nickName = 'userInfo.nickName';
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
      // }
    })


    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        //console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    wx.login({

    })

  },

})