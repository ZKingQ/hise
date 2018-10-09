var that;
const app = getApp()
Page({
  data: {
    // startSrc: '../register/register',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  start: function() {
    wx.navigateTo({
      url: '../singleChoiceExplain/singleChoiceExplain',
    })
  },

  onLoad: function() {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        const db = wx.cloud.database()
        db.collection('users').where({
          _openid: app.globalData.openid
        }).get({
          success: function(res) {
            // console.log(res)
            if (!res.data.length) {
              wx.redirectTo({
                url: '../register/register',
              })
            }
          },
          fail: function(err) {
            console.log(err)
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  }
})