// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  let singleChoice = (event.singleChoice == 0 ? 0 : 1)
  let totalQuestions = await db.collection('questions').where({
    singleChoice: singleChoice
  }).count()
  totalQuestions = totalQuestions.total
  let ranNum = event.num;
  let start = Math.floor(Math.random() * Math.max(0, totalQuestions - ranNum)) + 1
  let res = await db.collection('questions')
    .where({
      singleChoice: singleChoice
    })
    .skip(10)
    .get()
  let arr = res.data
  let questionList = []
  for (var i = 0; i < ranNum; i++) {
    let ran = Math.floor(Math.random() * (arr.length - i));
    questionList.push(arr[ran]);
    let tmp = arr[ran];
    arr[ran] = arr[arr.length - i - 1];
    arr[arr.length - i - 1] = tmp;
  }
  return questionList
}