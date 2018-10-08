var that;

Page({


  data: {
    choseQuestionBank:''
  },

  onLoad: function () {

  },


  onShow: function () {
  
  },

  action: function () {
    
    wx.redirectTo({
      url: '../singleChoiceDetail/singleChoiceDetail'
      // url: '../singleChoiceDetail/singleChoiceDetail?choseQuestionBank=' + choseQuestionBank
    });
  }





})