var that;
// var Bmob = require('../../utils/bmob.js');
const app = getApp()
// userLogin();

// function userLogin() {
//   console.log('userLogin-------用户登录---')
//   wx.login({
//     success: res => {
//       var code = res.code;
//       if (code) {
//         console.log('code :' + code)
//         getOpenId(code)
//       } else {
//         console.log('获取用户登录态失败！' + res.errMsg)
//         util.showToastFail('获取用户登录态失败！' + res.errMsg)
//       }
//     },

//     fail: function (res) {
//       util.showToastFail('登录失败')
//       console.log('登录失败');
//     }
//   })
// }  

Page({
  data: { 

    startSrc:'../register/register',
    userInfo:{},
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
    
    // choseQuestionBank:"点击选择",

    // array: ['大学计算机期末考试题库', '计算机二级office题库', '毛概期末考试题库', '中国近代史期末考试题库', '马克思原理期末考试题库','形式与政策'],


    // objectArray: [
    //   {
    //     id: 0,
    //     name: '大学计算机期末考试题库'
    //   },
    //   {
    //     id: 1,
    //     name: '计算机二级office题库'
    //   },
    //   {
    //     id: 2,
    //     name: '毛概期末考试题库'
    //   },
    //   {
    //     id: 3,
    //     name: '中国近代史期末考试题库'
    //   },
    //   {
    //     id: 4,
    //     name: '马克思原理期末考试题库'
    //   },
    //   {
    //     id: 5,
    //     name: '形式与政策'
    //   }
    // ],
    // index: 0,
    // loading: true,
    // currentUserId:''
  },

  start: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  // bindViewTap:function(){
  //   wx.navigateTo({
  //     url: '',
  //   })
  // }

  onLoad: function () {
    that = this; 
    wx.getUserInfo({
      success:function(res){
        console.log(res);
          var avatarUrl='userInfo.avatarUrl';
          var nickName='userInfo.nickName';
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
        })
      }
    })
  },
   
    // if(app.globalData.userInfo){
    //   that.setData({
    //     userInfo:app.globalData.userInfon,
    //     hasUserinfo:true
    //   })
    // }
    // else if(that.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // }
    // else{
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // } 
  // },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  // onShow: function () {

  // },

  // startAnswer:function(){
  //   wx.navigateTo({
  //     url: '../register/register'
  //   })
  // },

  // bindPickerChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index: e.detail.value,
  //     choseQuestionBank: that.data.array[e.detail.value]
  //   })
  // },

  // chose:function(){
  //   var currentUser = Bmob.User.current();
  //   var currentUserId = currentUser.id;
  //   var User = Bmob.Object.extend("_User");
  //   var queryUser = new Bmob.Query(User);
  //   queryUser.get(currentUserId, {
  //     success: function (result) {
  //       var register = result.get("register");
  //       console.log(register)
  //       if (register==true){
  //         var choseQuestionBank = that.data.choseQuestionBank;
  //         if (choseQuestionBank != "点击选择") {
  //           getApp().globalData.choseQuestionBank = choseQuestionBank;
  //         

  //           wx.navigateTo({
  //             url: '../singleChoiceExplain/singleChoiceExplain'
  //           });
  //         }
  //         else if (choseQuestionBank == "点击选择") {
  //           wx.showToast({
  //             title: '请选择题库',
  //             image: '../../images/warn.png',
  //             duration: 2000
  //           })
  //         }
  //       }
  //       else{
  //         wx.showModal({
  //           title: '尚未完善信息',
  //           content: '请放心填写，您的隐私绝不会被泄露',
  //           confirmText: '立即注册',
  //           confirmColor: '#1bd0bd',
  //           showCancel:false,
  //           success: function (res) {
  //             if (res.confirm) {
  //               wx.navigateTo({
  //                 url: '../register/register'
  //               })
  //             } else if (res.cancel) {
  //             }
  //           }
  //         })
  //       }
  //       that.setData({
  //         loading: false
  //       })
  //     },
  //     error: function (object, error) {
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