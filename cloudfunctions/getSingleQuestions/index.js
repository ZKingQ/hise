// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let start = Math.floor(Math.random() * 50) + 1
  return db.collection('questions').where({
    singleChoice: 1,
  })
  .skip(start)
  .get()
}