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

// express框架拦截所有请求,避免重复为CORS请求设置响应参数
app.use((req,res,next) => {
	// 允许那些二客户端访问我，* 表示都可以访问
	res.header('Access-Control-Allow-Origin','*');
	// 允许使用那些请求访问我
	res.header('Access-Control-Allow-Methods','get,post');
	next();
})

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

// CORS访问非同源
app.get('/cross',(req,res) => {
	// 允许那些二客户端访问我，* 表示都可以访问
	// res.header('Access-Control-Allow-Origin','*');
	// 允许使用那些请求访问我
	// res.header('Access-Control-Allow-Methods','get,post');
	res.send('访问成功');
})

// $.aiax方法发送jsonp请求
app.get('/jsonp',(req,res) => {
	// res.jsonp({name: '林林',age: 20});
	// 修改函数的名称
	let params = req.query.cb;
	res.send(`${params}({name: "linlin",age: 20})`);
})
// 监听端口
app.listen(3001);
// 控制台提示输出
console.log('服务器启动成功');