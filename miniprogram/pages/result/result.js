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
    const db = wx.cloud.database()
    db.collection('records').add({
      data: {
        realName: app.globalData.realName,
        className: app.globalData.className,
        studentId: app.globalData.studentId,
        score: app.globalData.score * 5,
        time: new Date()
      },
      success: function (res) {
        // console.log(res)
      }
    })
    if (score >= 16) {
      wx.cloud.callFunction({
        name: 'uploadScore',
        data: {
          openid: app.globalData.openid
        },
        complete: val => {
          ++app.globalData.totalScore
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