import $ from 'jquery';
import './css/a1.css';
import './css/a1.less';

$(function() {
    $('li:odd').css('backgroundColor', 'yellow')
    $('li:even').css('backgroundColor', 'skyblue')
})

class Parson {
   static name = 'parson';
}

console.log(Parson.name);

// 使用vue
// 导入vue构造函数
import Vue from 'vue';
// 导入 App 根组件
import App from './components/App.vue';

const vm = new Vue({
    // 指定vm实例控制的页面区域
    el: '#app',
    // 通过render函数，把指定的组件渲染到el区域中
    render: h => h(App)
})