// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  if (!event.openid || event.score === null)
    return {
      status: "error",
      errMsg: "empty openid"
    }
  let t = new Date()
  t.setHours(t.getUTCHours() + 8)
  t = t.toString()
  db.collection('records').add({
    data: {
      _openid: event.openid,
      score: event.score,
      time: t
    }
  })

  if (event.useTime >= 2400) {
    event.score = event.score*(-1) - 10000
  }

  let res = await db.collection('users').where({
    _openid: event.openid
  }).get()
  let id = res.data[0]._id

  await db.collection('users').doc(id).update({
    data: {
      score: event.score,
      isDoneCount: event.isDoneCount,
      useTime: event.useTime
    }
  })
  return {
    status: "success",
    errMsg: "document.update:ok",
    data: {
      score: event.score
    }
  }
}