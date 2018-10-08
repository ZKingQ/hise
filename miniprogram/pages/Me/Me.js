// var Bmob = require('../../utils/bmob.js');
var app = getApp();
var that;
Page({

  data: {
    userInfo: {},
    realName:null,
    className:null,
    studentId:null
  },

 
  onLoad: function () {
    that = this;
    //console.log(realName)
    const db = wx.cloud.database()
    db.collection('users').where({
      _openid: app.globalData.openid
    }).get({
      success:function(res){
        // console.log(res.data[0].realName)
        // console.log(res.data[0].className)
        // console.log(res.data[0].studentId)
        var realName = res.data[0].realName
        that.setData({
           realName:realName,
           className:res.data[0].className,
           studentId:res.data[0].studentId
        })
        
      }
    })
  },
  onShow: function () {
  
  },
 
})