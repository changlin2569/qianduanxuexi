let fs = require('fs');

fs.writeFile('./demo.txt','我爱你有种左灯右行的冲动',err => {
    if(err != null){
        console.log(err);
        return;
    }
    console.log('文件写入成功');
})