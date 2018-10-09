var that;
var app = getApp()
Page({
  data: {
    score: 0,
    loading: true,
  },

  onLoad: function(options) {
    that = this;
    let score = getApp().globalData.score
    that.setData({
      score: score
    })
    if (score >= 16) {
      wx.cloud.callFunction({
        name: 'uploadScore',
        data: {
          openid: app.globalData.openid
        },
        complete: val => {
          that.setData({
            loading: false
          })
        }
      })
    } else {
      that.setData({
        loading: false
      })
    }
  },
  returnMainPage: function() {
    wx.switchTab({
      url: '../choiceMain/choiceMain'
    })
  },
})