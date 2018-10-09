var app = getApp();
var that;
Page({

  data: {
    userInfo: {},
    realName: '',
    className: '',
    studentId: '',
  },

 
  onLoad: function () {
    that = this;
    wx.showLoading()
    // console.log(realName)
    const db = wx.cloud.database()
    db.collection('users').where({
      _openid: app.globalData.openid
    }).get({
      success:function(res){
        var realName = res.data[0].realName
        that.setData({
           realName:realName,
           className:res.data[0].className,
           studentId:res.data[0].studentId
        })
      },
      fail: function(err) {
        console.log(err)
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },
  onShow: function () {
  
  },
 
})