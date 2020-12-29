import $ from 'jquery';
import './css/a1.css';
import './css/a1.less';

$(function() {
    $('li:odd').css('backgroundColor', 'yellow')
    $('li:even').css('backgroundColor', 'skyblue')
})