var that;
var app = getApp();
Page({
  data: {
    score:0,
    loading:true,
  },


  onLoad: function (options) {
    that=this;
    // var currentUser = Bmob.User.current();
    // var currentUserId = currentUser.id;   
    var score = getApp().globalData.score
    that.setData({
      score: score
    })
    
    console.log(getSingleQuestionList);
    var saveSingleQuestionList=new Array();
    var saveMultiQuestionList = new Array();
    for(var i=0;i<20;i++){
      saveSingleQuestionList[i] = getSingleQuestionList[i].attributes;
      saveMultiQuestionList[i] = getMultiQuestionList[i].attributes;
    }
    console.log(saveMultiQuestionList)

    // that.deleteHistory(currentUserId, choseQuestionBank, currentUserId, score, saveSingleQuestionList, saveMultiQuestionList)
  },
  returnMainPage:function(){
    wx.switchTab({
      url: '../choiceMain/choiceMain'
    })
  },

 
})