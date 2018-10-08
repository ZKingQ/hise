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
        console.log(res.data[0].realName)
        console.log(res.data[0].className)
        console.log(res.data[0].studentId)
        var realName = res.data[0].realName
        that.setData({
           realName:realName,
           className:res.data[0].className,
           studentId:res.data[0].studentId
        })
        
      }
    })
    console.log(this.realName)
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onShow: function () {
  
  },

  // testHistory:function(){
  //   var currentUserId = that.data.currentUserId;
  //   var User = Bmob.Object.extend("_User");
  //   var queryUser = new Bmob.Query(User);
  //   queryUser.get(currentUserId, {
  //     success: function (result) {
  //       var register = result.get("register");
  //       if (register==false){
  //         wx.navigateTo({
  //           url: '../register/register'
  //         })
  //       }
  //       else{
  //         wx.navigateTo({
  //           url: '../testHistory/testHistory'
  //         })
  //       }
  //     },
  //     error: function (object, error) {
  //       // 查询失败
  //     }
  //   });
  // },

  // personalInformation: function () {
  //   var currentUserId = that.data.currentUserId;
  //   var User = Bmob.Object.extend("_User");
  //   var queryUser = new Bmob.Query(User);
  //   queryUser.get(currentUserId, {
  //     success: function (result) {
  //       var register = result.get("register");
  //       if (register == false) {
  //         wx.navigateTo({
  //           url: '../register/register'
  //         })
  //       }
  //       else {
  //         wx.navigateTo({
  //           url: '../personalInformation/personalInformation'
  //         })
  //       }
  //     },
  //     error: function (object, error) {
  //       // 查询失败
  //     }
  //   });
  // },

  // onShareAppMessage: function (res) {
  //   if (res.from === 'button') {
  //     console.log(res.target)
  //   }
  //   return {
  //     title: '大学考试题库',
  //     path: '/pages/choiceMain/choiceMain',
  //     success: function (res) {
  //       // 转发成功
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //     }
  //   }
  // }
 
})