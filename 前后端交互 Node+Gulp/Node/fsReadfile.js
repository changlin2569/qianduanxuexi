let fs = require('fs');

// fs.readFile('./nodehello world.js','utf8',function(err,doc){
//     if(err == null){
//         console.log(doc);
//     }
// })

fs.readFile('./nodehello world.js','utf8',(err,doc)=>{
    if(err == null){
        console.log(doc);
    }
})

