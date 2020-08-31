var div = document.querySelector('div');

        function animate(obj,target,callback){
            //点击次数越多就会开启很多定时器
            clearInterval(obj.timer)
          
            // console.log(callback);
            
            //为不同元素设置不同定时器
             obj.timer = setInterval(function(){
                
                 //步长值,取整数，避免小数

            var step =(target - obj.offsetLeft) / 10 ;
            //回退时判断是否小于零，小于零取小的数
            step = step<0 ? Math.floor(step):Math.ceil(step);
            if(obj.offsetLeft == target){
                clearInterval(obj.timer);
                if(callback){
                    callback();
                }
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        },15)
        }
