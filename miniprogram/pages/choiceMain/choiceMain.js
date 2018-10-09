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
    const db = wx.cloud.database()
    db.collection('users').where({
      _openid: app.globalData.openid
    }).get({
      success: function(res) {
        console.log(res.data[0]._openid)
        console.log(res.data.length)
        if(!res.data.length) {
          wx.navigateTo({
            url: '../register/register',
          })
        }
      }
    })

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  //   wx.login({
  //       success:res=>{
  //         app.globalData.code=res.code
  //         app.globalData.userInfo=wx.getStorageSync('userInfo')
  //         wx.getSetting({
  //           success:(res)=>{
  //             if(res.authSetting['scope.userInfo']){
  //               that.setData({
  //                 shwoModel:true
  //               })
  //             }else{
  //               that.setData({
  //                 shwoModel:false
  //               })
  //               wx.showLoading({
  //                 title:'Loding',
  //               })
  //               that.getOP(app.globalData.userInfo)
  //             }
  //           },
  //           fail:function(){
  //             wx.showToast({
  //               title: 'Please check your network',
  //               icon:'warn',
  //               duration:1500,
  //             })
  //           }
  //         })
  //       },
  //       fail:function(){
  //         wx.showToast({
  //           title: 'Please check your network',
  //           icon: 'warn',
  //           duration: 1500,
  //         })
  //       }
  //   })
  // },
  // agreeGetUser:function(e){
  //   try{
  //     wx.setStorageSync('userInfo', e.detail.userInfo)
  //   }catch(e){
  //     wx.showToast({
  //       title: 'Please check your network',
  //       icon:'warn',
  //       duration:1500,
  //     })
  //   }
  //   wx.showLoading({
  //     title: 'Loading',
  //   })
  //   that.setData({
  //     showModel:false
  //   })
  //   that.getOP(e.detail.userInfo)
  // },
  // getOP:function(res){
  //   let that=this
  //   let userInfo=res
  //   app.globalData.userInfo=userInfo
  //   wx.request({
  //     url: 'https://xcx.xiancaijun.cn/tigerlogin/tgLogin',
  //     method:'post',
  //     data:{
  //       "code":app.globalData.code,
  //       'userInfo':userInfo
  //     },
  //     success:function(res){
  //       if(res.data.respcode=='0'){
  //         app.gl
  //       }
  //     }
  //   })
   }

})