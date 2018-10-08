var code
var openid
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    wx.login({
      success:function(res){
        if(res.code){
          console.log(code)
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
            data: {
              code:res.code
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },

            success: function (res) {
              openid = res.data.openid
              console.log(openid)
            }
          })
        }
        
      }

    })
    // var newOpenid = wx.getStorageSync('openid')
    // if (!newOpenid) {
    //   wx.login({
    //     success: function (res) {
    //       user.loginWithWeapp(res.code).then(function (user) {
    //         var openid = user.get("authData").weapp.openid;
    //         console.log(user, 'user', user.id, res);

    //         if (user.get("nickName")) {
    //           // 第二次访问
    //           console.log(user.get("nickName"), 'res.get("nickName")');

    //           wx.setStorageSync('openid', openid)
    //         } else {
    //           var User = Bmob.Object.extend("_User");
    //           var queryUser = new Bmob.Query(User);
    //           queryUser.get(user.id, {
    //             success: function (result) {
    //               result.set("register", false);
    //               result.save();

    //             },
    //             error: function (result, error) {
      
    //             }
    //           });

    //                 }
    //               });

    //             }
    //           });
    // }



  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: { 
    userInfo: null,
    singleChoiceAnswerNow:[],
    multiChoiceAnswerNow: [],
    // choseQuestionBank:'',
    score:0,
    openid:null
  }
})