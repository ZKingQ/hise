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

    wx.cloud.callFunction({
      name: 'uploadScore',
      data: {
        openid: app.globalData.openid,
        score: score * 2
      },
    }).then(res => {
      // console.log(res)
      if (res.result.status === "success") {
        app.globalData.totalScore += res.result.data.score
      }
      that.setData({
        loading: false
      })
    })
  },
  returnMainPage: function() {
    wx.switchTab({
      url: '../choiceMain/choiceMain'
    })
  },
})