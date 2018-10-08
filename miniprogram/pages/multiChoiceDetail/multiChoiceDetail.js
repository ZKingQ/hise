var that;
Page({
  data: {
    choseQuestionBank: '',
    currentUserId: null,
    questionList: [],
    nowQuestion: [],
    nowQuestionNumber: '',
    choseCharacter: [],
    score: 0,
    choseA: false,
    choseB: false,
    choseC: false,
    choseD: false
  },


  onLoad: function () {
    that = this;
  },


  onShow: function () {
  
  },

  getQuestions: function () {
    wx.cloud.callFunction({
      name: 'getQuestions',
      data: {
        num: that.data.singleChoiceNumber,
        singleChoice: 0
      },
      success: res => {
        // console.log('[云函数] [getQuestions] ', res.result)
        let questionList = res.result
        // console.log(questionList, questionList.length)
        that.setData({
          questionList: questionList,
          loading: false
        })
        that.showNextQuestion()
      },
      fail: err => {
        console.error('[云函数] [getQuestions] 调用失败', err)
      }
    })
  },

  choseA: function () {
    
  },

  notChoseA: function () {
    
  },

  submit:function(){
    wx.redirectTo({
      url: '../result/result'
    });
  }




  


})