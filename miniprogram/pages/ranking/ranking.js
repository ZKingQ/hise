var that;
Page({
  data: {
    ranking_list: []
  },

  onPullDownRefresh: function(options) {
    that.getRank()
  },

  onLoad: function(options) {
    that = this;
    that.getRank()
  },

  getRank: function() {
    const db = wx.cloud.database()
    db.collection('users')
      .orderBy('score', 'desc')
      .limit(20)
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
          wx.stopPullDownRefresh()
        },
        fail: function(err) {
          console.log(err)
        }
      })
  }
})