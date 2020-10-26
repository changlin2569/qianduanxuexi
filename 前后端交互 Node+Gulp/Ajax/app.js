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
// 解析url参数
// app.use(bodyParser.urlencoded());
// 解析json数据
// app.use(bodyParser.json());
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

// 添加路由
app.get('/first', (req, res) => {
    res.send('hello ajax');
    // res.send(path.join(__dirname,'public'))
})

app.get('/responseData', (req, res) => {
    res.send({
        'name': 'linuan'
    })
})

app.get('/get', (req, res) => {
    res.send(req.query)
    // req.query保存着请求的参数
})

app.post('/post', (req, res) => {
    res.send(req.body)
})

app.post('/json', (req, res) => {
    res.send(req.body)
})

app.get('/error', (req, res) => {
    res.status(400).send()
})

app.get('/cache', (req, res) => {
    fs.readFile('./test.txt', (err, result) => {
        res.send(result);
    })
})

// 验证邮箱地址唯一性
app.get('/verifyEmailAdress', (req, res) => {
    // res.send(url.parse(req.url,true))
    let params = url.parse(req.url, true)
    if (params.query.email == 'itheima@qq.com') {
        res.status(400).send({
            'message': '您输入的邮箱已被占用'
        })
    } else {
        res.send({
            'message': '邮箱输入正确'
        })
    }
})
// 搜索框自动提示
app.get('/searchAutoPrompt', (req, res) => {
    let params = url.parse(req.url, true);
    // res.send(params)
    if (params.query.key == '黑马') {
        res.send(['黑马程序员', '黑马程序员官网', '黑马程序员哔哩哔哩'])
    }
})

// 省市区三级联动
app.get('/province', (req, res) => {
    res.send([{
            id: '001',
            name: '陕西省'
        }, {
            id: '002',
            name: '四川省'
        },
        {
            id: '003',
            name: '河北省'
        }, {
            id: '004',
            name: '浙江省'
        }
    ])
})

app.get('/cities',(req,res) => {
    let params = url.parse(req.url,true);
    // res.send(params);
    // res.send(req.url);
    if(params.query.id == '001'){
        res.send([{
            id: '100',
            name: '西安市'
        },{
            id: '101',
            name: '安康市'
        },{
            id: '102',
            name: '延安市'
        }])
    }else if(params.query.id == '002'){
        res.send([{
            id: '200',
            name: '成都市'
        },{
            id: '201',
            name: '内江市'
        },{
            id: '202',
            name: '乐山市'
        }])
    }else if(params.query.id == '003'){
        res.send([{
            id: '300',
            name: '邯郸市'
        },{
            id: '301',
            name: '邢台市'
        },{
            id: '302',
            name: '张家口市'
        }])
    }else if(params.query.id == '004'){
        res.send([{
            id: '400',
            name: '杭州市'
        },{
            id: '401',
            name: '宁波市'
        },{
            id: '402',
            name: '嘉兴市'
        }])
    }
})

// formdata表单对象
app.post('/formdata',(req,res) => {
    //创建formidable表单解析对象
    let form = new formidable.IncomingForm();
    // 解析客户端传递过来的FormData对象
    // 第一个参数报讯错误对象，第二个保存表单对象普通请求信息，第三个文件上传相关信息
    form.parse(req,(err,fields,files) => {
        res.send(fields);
    })
})

// formdata上传二进制文件
app.post('/uploadfile',(req,res) => {
    //创建formidable表单解析对象
    let form = new formidable.IncomingForm();
    // 设置客户端上传文件的存储路径
    form.uploadDir = path.join(__dirname,'public','uploads');
    // 保留上传文件的后缀
    form.keepExtensions = true;
    // 解析客户端传递过来的FormData对象
    // 第一个参数报讯错误对象，第二个保存表单对象普通请求信息，第三个文件上传相关信息
    form.parse(req,(err,fields,files) => {
        res.send('上传成功');
    })
})
// 监听端口
app.listen(3000);

// 控制台输出
console.log('启动成功');
// console.log(path.join(__dirname,'public'));