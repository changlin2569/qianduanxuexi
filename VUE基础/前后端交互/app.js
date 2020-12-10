// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
//接收post请求参数
// const bodyParser = require('body-parser');
// 读取formdata数据
const formidable = require('formidable'); 
// 创建文本服务器
const app = express();
// 文件操作
const fs = require('fs');
// 引入url模块
const url = require('url');
// const { url } = require('inspector');
const bodyParser = require('body-parser')
// 解析url参数
app.use(bodyParser.urlencoded());
// 解析json数据
app.use(bodyParser.json());
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data',(req,res) => {
    res.send('hello world');
});

app.get('/data1',(req,res) => {
    res.send('hello china');
});

app.get('/data2',(req,res) => {
    res.send('hello xupt');
});

app.get('/p1',(req,res) => {
    setTimeout(() => {
        res.send('hello world');
    },1000)
});

app.get('/p2',(req,res) => {
    setTimeout(() => {
        res.send('hello china');
    },2000)
});

app.get('/p3',(req,res) => {
    setTimeout(() => {
        res.send('hello xupt');
    },3000)
});

app.get('/fetch',(req,res) => {
    // res.send({
    //     name: 'fetch',
    //     age: 36,
    // });
    res.json({
        name: 'fetch',
        age: 36,
    });
});

app.get('/axios',(req,res) => {
    res.send('hello axios');
});

app.get('/axiosget',(req,res) => {
    res.send(req.query);
});

app.get('/axiosget/:id',(req,res) => {
    res.send(req.params);
});

app.post('/axiospost',(req,res) => {
    res.send(req.body);
});

app.get('/async',(req,res) => {
    res.send('hello world');
});

app.get('/asyncTwo',(req,res) => {
    res.send(req.query);
});
// 监听端口
app.listen(3000);

// 控制台输出
console.log('启动成功');
// console.log(path.join(__dirname,'public'));