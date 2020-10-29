// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 接收post请求参数
const formidable = require('formidable');
// 实现session功能
var session = require('express-session');
// 创建web服务器
const app = express();
// 接收post请求参数
// 实现session功能
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test',(req,res) => {
	let params = 'fn({name : "linlin"})';
	res.send(params);
})

// 函数名替换
app.get('/testProve',(req,res) => {
	// 拿到传递的参数中的函数名
	// let functionName = req.query.callback
	// let params = `${functionName}({name : "linlin"})`;
	// res.send(params);

	// 调用express框架下的jsonp方法
	res.jsonp({name: 'inlin'})
})
// 监听端口
app.listen(3001);
// 控制台提示输出
console.log('服务器启动成功');