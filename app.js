/**
 * Created by wanpeng on 2017/3/30.
 */
'use strict';
var express = require('express');
var AV = require('leancloud-storage');


var app = express();


// app.use(function(req, res, next) {
//   // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
//   if (!res.headersSent) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   }
// });

app.use(function (req, res) {
  req.setEncoding('utf8');
  var postData = "";
  req.addListener("data", function (chunk) {
    postData += chunk;
  });
  req.addListener("end", function () {
    var resp = function (ret, status_code) {
      res.writeHead(status_code, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      res.end(ret);
    }
    try {
      var event = JSON.parse(postData);
      if (event.type === undefined) {
        return resp('Event 对象中缺少 type 字段', 400);
      }
      switch (event.type) {
        case "summary.daily.available":
          console.log("summary.daily.available")
          break;
        case "summary.weekly.available":
          console.log("summary.weekly.available")
          break;
        case "summary.monthly.available":
          console.log("summary.monthly.available")
          break;
        case "charge.succeeded":
          var params = {
            data: event.data,
          }
          AV.Cloud.run('hLifePaymentEvent', params).then(() => {
            console.log("leancloud处理付款成功消息成功")
            resp("OK", 200)
          }).catch((error) => {
            console.log("leancloud处理付款成功消息失败", error)
            resp("charge.succeeded process failed!", 500)
          })
          break;
        case "transfer.succeeded":
          var params = {
            data: event.data,
          }
          AV.Cloud.run('hLifeTransfersEvent', params).then(() => {
            console.log("leancloud处理提现成功消息成功")
            resp("OK", 200)
          }).catch((error) => {
            console.log("leancloud处理提现成功消息失败", error)
            resp("transfer.succeeded process failed!", 500)
          })
          break;
        case "refund.succeeded":
          console.log("get event: refund.succeeded")
          // 开发者在此处加入对退款异步通知的处理代码
          return resp("OK", 200);
          break;
        case "red_envelope.sent":
          console.log("red_envelope.sent")
          break;
        case "red_envelope.received":
          console.log("get event: red_envelope.received")
          break;
        case "batch_transfer.succeeded":
          console.log("get event: batch_transfer.succeeded")
          break;
        case "customs.succeeded":
          console.log("get event: customs.succeeded")
          break;
        case "batch_refund.succeeded":
        console.log("get event: batch_refund.succeeded")
          break;
        default:
          console.log("未知 Event 类型")
          return resp("未知 Event 类型", 400);
          break;
      }
    } catch (err) {
      return resp('JSON 解析失败', 400);
    }
  });
})

module.exports = app;
