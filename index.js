var http = require('http');

http.createServer(function (req, res) {

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
        case "charge.succeeded":
          // 开发者在此处加入对支付异步通知的处理代码
          console.log("get Event: charge.succeeded")
          return resp("OK", 200);
          break;
        case "refund.succeeded":
          // 开发者在此处加入对退款异步通知的处理代码
          console.log("get Event: refund.succeeded")
          return resp("OK", 200);
          break;
        default:
          console.log("get Event: 未知 Event 类型")
          return resp("未知 Event 类型", 400);
          break;
      }
    } catch (err) {
      return resp('JSON 解析失败', 400);
    }
  });
}).listen(3000, "127.0.0.1");

console.log('Server running on port 3000.');
