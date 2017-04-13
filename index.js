'use strict';
var AV = require('leancloud-storage');

const LC_DEV_APP_ID = 'K5Rltwmfnxd5pYjMsOFFL0kT-gzGzoHsz'
const LC_DEV_APP_KEY = 'UseC5jvqLT7TIiQWI8nRPmEl'

const LC_PRO_APP_ID = 'TUVjJ5HHNmopfJeREa4IcB1T-gzGzoHsz'
const LC_PRO_APP_KEY = 'XYSEQ5K4FYtMp7P8HXT8Vz63'

AV.init({
  appId: LC_DEV_APP_ID,
  appKey: LC_DEV_APP_KEY,
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
