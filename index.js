'use strict';
var AV = require('leancloud-storage');

AV.init({
  appId: 'K5Rltwmfnxd5pYjMsOFFL0kT-gzGzoHsz',
  appKey: 'UseC5jvqLT7TIiQWI8nRPmEl',
});

var app = require('./app');

app.listen(3000, function () {
  console.log('Node app is running, port:', 3000);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error("Caught exception:", err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
  });
});
