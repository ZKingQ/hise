var that;
Page({
  data: {
    ranking_list: []
  },

  onLoad: function(options) {
    that = this;
    const db = wx.cloud.database()
    db.collection('users')
      .orderBy('score', 'desc')
      .limit(10)
      .get({
        success: function(res) {
          // console.log(res)
          let tmp = res.data
          let rank = 1
          for (let i in tmp) {
            tmp[i].rank = rank++
          }
          that.setData({
            ranking_list: tmp
          })
        },
        fail: function(err) {
          console.log(err)
        }
      })
  }
})