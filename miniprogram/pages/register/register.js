var that;
var app=getApp()
Page({

  data: {
    currentUserId: null
  },

  onLoad: function() {

  },


  onShow: function() {

  },
  
  registerSuccess: function(e) {
    var currentUserId = this.data.currentUserId;
    var realName = e.detail.value.realName;
    var className = e.detail.value.className;
    var studentId = e.detail.value.studentId;

    if(realName&&className&&studentId){
      const db = wx.cloud.database()

      // db.collection('users').where({
      //   _ioenid:''
      // })

      db.collection('users').add({
        data: {
          // userId: currentUserId,
          realName: realName,
          className: className,
          studentId: studentId
        },
        success: function (res) {
          console.log(res)
        }
      })
    } 
    if (!realName) {
      wx.showToast({
        title: '请填写您的姓名',
        image: '../../images/warn.png',
        duration: 2000
      })
    } else if (!className) {
      wx.showToast({
        title: '请填写您的班级',
        image: '../../images/warn.png',
        duration: 2000
      })
    } else if (!studentId) {
      wx.showToast({
        title: '请填写您的学号',
        image: '../../images/warn.png',
        duration: 2000
      })
     
    } 
    else {
      console.log("111");
      wx.switchTab({
        url: '../choiceMain/choiceMain'
      })
    }
  },
})