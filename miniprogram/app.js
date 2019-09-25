App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },
  globalData: { 
    userInfo: null,
    singleChoiceNumber: 30,
    multiChoiceNumber: 10,
    trueOrFalseNumber: 20,
    score:0, // 答对分数
    rightCnt:0, // 答对题数
    openid:null,
    realName: '',
    className: '',
    studentId: '',
    totalScore: 0,
    isDoneCount: 0,
    startTime: null,
    useTime: 0,
  }
})