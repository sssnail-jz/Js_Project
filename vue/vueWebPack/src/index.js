import $ from 'jquery'
import './css/base.css'
import './css/base.less'
import './css/base.scss'

$(function() {
    $("li:odd").css('backgroundColor', 'red');
    $("li:even").css('backgroundColor', 'lightblue');
})

class Person {
    static info = 'aaa'
}

console.log(Person.info);

//------------------------------
import Vue from 'vue'
import App from './components/App.vue'

const vm = new Vue({
    el: '#app',
    render: h => h(App)
});