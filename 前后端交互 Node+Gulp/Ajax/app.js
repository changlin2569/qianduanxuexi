// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
//接收post请求参数
const bodyParser = require('body-parser');
// 创建文本服务器
const app = express();
// 文件操作
const fs = require('fs');
// 引入url模块
const url = require('url');
// const { url } = require('inspector');
// 解析url参数
app.use(bodyParser.urlencoded());
// 解析json数据
app.use(bodyParser.json());
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

app.get('/get',(req,res) => {
    res.send(req.query)
    // req.query保存着请求的参数
})

app.post('/post',(req,res) => {
    res.send(req.body)
})

app.post('/json',(req,res) => {
    res.send(req.body)
})

app.get('/error',(req,res) => {
    res.status(400).send()
})

app.get('/cache',(req,res) => {
    fs.readFile('./test.txt',(err,result) => {
        res.send(result);
    })
})

// 验证邮箱地址唯一性
app.get('/verifyEmailAdress',(req,res) => {
    // res.send(url.parse(req.url,true))
    let params = url.parse(req.url,true)
    if(params.query.email == 'itheima@qq.com'){
        res.status(400).send({'message': '您输入的邮箱已被占用'})
    }else{
        res.send({'message': '邮箱输入正确'})
    }
})

// 监听端口
app.listen(3000);

// 控制台输出
console.log('启动成功');
// console.log(path.join(__dirname,'public'));