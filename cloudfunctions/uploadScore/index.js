// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  if(!event.openid) 
    return {
      status: "error",
      errMsg: "empty openid"
    }
  let res = await db.collection('users').where({
    _openid: event.openid
  }).get()
  let id = res.data[0]._id
  await db.collection('users').doc(id).update({
    data: {
      score: _.inc(1)
    }
  })
  return {
    status: "success"
  }
}