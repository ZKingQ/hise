var app=getApp();
var that;

Page({
  data: {
    currentUserId: null,
    questionList: [],
    nowQuestion: {},
    nowQuestionNumber: 0,
    userChose: '',
    score: 0,
    loading: true
  },

  getQuestions: function() {
    wx.cloud.callFunction({
      name: 'getSingleQuestions',
      data: {},
      success: res => {
        // console.log('[云函数] [getSingleQuestions] ', res.result.data)
        let allquestions = res.result.data
        let questionList = []
        let ranNum = 15;
        for (var i = 0; i < ranNum; i++) {
          let ran = Math.floor(Math.random() * (allquestions.length - i));
          questionList.push(allquestions[ran]);
          let center = allquestions[ran];
          allquestions[ran] = allquestions[allquestions.length - i - 1];
          allquestions[allquestions.length - i - 1] = center;
        }
        // console.log(questionList, questionList.length)
        that.setData({
          questionList: questionList,
          loading: false
        })
        that.showNextQuestion()
      },
      fail: err => {
        console.error('[云函数] [getSingleQuestions] 调用失败', err)
      }
    })
  },

  showNextQuestion: function() {
    if (that.data.nowQuestionNumber == 15) {
      that.overSingleChoice()
      return
    }
    var nowQuestion = that.data.questionList[that.data.nowQuestionNumber]
    // console.log(nowQuestion)
    nowQuestion.options = []
    nowQuestion.options[0] = {
      name: 'A',
      detail: nowQuestion.A
    }
    nowQuestion.options[1] = {
      name: 'B',
      detail: nowQuestion.B
    }
    nowQuestion.options[2] = {
      name: 'C',
      detail: nowQuestion.C
    }
    nowQuestion.options[3] = {
      name: 'D',
      detail: nowQuestion.D
    }
    that.setData({
      userChose: null,
      nowQuestion: nowQuestion,
      nowQuestionNumber: that.data.nowQuestionNumber + 1
    })
  },

  onLoad: function() {
    that = this;
    this.getQuestions()
  },

  getRandomSingleChoice: function(arr, count) {
    var shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },

  onShow: function() {

  },

  chose: function(event) {
    // console.log(event)
    var answer = that.data.nowQuestion.answer;
    var userChose = event.currentTarget.dataset.option
    that.setData({
      userChose: userChose
    })
    if (userChose == answer) {
      getApp().globalData.score++;
      setTimeout(that.showNextQuestion, 300)
    }
  },

  frontQuestion: function() {},

  overSingleChoice: function(questionNumber) {
    wx.redirectTo({
      // url: '../result/result'
      url: '../multiChoiceExplain/multiChoiceExplain'
    });
  }

})