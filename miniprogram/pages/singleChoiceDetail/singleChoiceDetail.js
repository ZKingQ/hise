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
    loadding: true
  },

  getQuestions: function() {
    const db = wx.cloud.database()
    db.collection('questions')
      .where({
        singleChoice: 1
      })
      .get()
      .then(res => {
        // console.log(res.data)
        that.setData({
          questionList: res.data,
          loadding: false
        })
        that.showNextQuestion()
      })
      .catch(err => {
        console.error(err)
      })
  },

  showNextQuestion: function() {
    if (that.data.nowQuestionNumber > 19) {
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

  //答题卡
//Updated upstream
//   answerCard: function() {
//     getApp().globalData.singleChoiceAnswerNow = that.data.questionList,
//       getApp().globalData.multiChoiceAnswerNow = that.data.newMultiQuestionList;

//   answerCard:function(){
//     // getApp().globalData.singleChoiceAnswerNow = that.data.questionList,
//     // getApp().globalData.multiChoiceAnswerNow = that.data.newMultiQuestionList;
// >>>>>>> Stashed changes
//     wx.navigateTo({
//       url: '../answerCard/answerCard'
//     });
//   },

  overSingleChoice: function(questionNumber) {
    wx.redirectTo({
      url: '../result/result'
    });
  }

})