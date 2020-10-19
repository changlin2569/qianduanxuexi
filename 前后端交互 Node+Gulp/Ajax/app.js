// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 创建文本服务器
const app = express();

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname,'public')));

// 添加路由
app.get('/first',(req,res) => {
    res.send('hello ajax');
    // res.send(path.join(__dirname,'public'))
})

app.get('/responseData',(req,res) => {
    res.send({'name':'linuan'})
})
// 监听端口
app.listen(3000);

// 控制台输出
console.log('启动成功');
// console.log(path.join(__dirname,'public'));