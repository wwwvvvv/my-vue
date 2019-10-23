// function init() {
//     var vm = new Vue({
//         el: '#app',
//         data() {
//             return {
//                 msg: '你好, 当前的数字是',
//                 count: 0,
//                 color: 'grey',
//                 val2: 'test',
//                 info: {
//                     content: 'my name is test'
//                 },
//                 // list: {
//                 //     t1: 'question1',
//                 //     t2: 'question2',
//                 //     t3: 'question3'
//                 // }
//                 list: [
//                     {
//                         name: '张三',
//                         age: 16,
//                         gender: 'girl',
//                         other: {
//                             info: 'There are some infos.'
//                         }
//                     },{
//                         name: '张三',
//                         age: 16,
//                         gender: 'girl'
//                     },{
//                         name: '张三',
//                         age: 16,
//                         gender: 'girl'
//                     }
//                 ]
//             }
//         },
//         computed: {
//             countMsg: {
//                 get() {
//                     return this.msg + this.count + '!'
//                 },
//                 set(val) {
//                     this.msg = val;
//                 }
//             }
//         },
//         methods: {
//             addCount(event) {
//                 console.log('event', event);
//                 this.count++;
//                 // this.list[1] = 'hello~~~'
//                 // this.list[0].other.info='ok'
//                 // this.list[0].other.grade='ok'
//                 setTimeout(() => {
//                     // this.list[0].other.info='ok'
//                     // this.list[0].other.grade='ok'
//                     // this.info.test = 'hahaha'
//                     this.$set(this.info,'test' ,'hahahhahaha')
//                 },1500)
//                 // this.$set(this.list[0].other, 'grade' , '高三')
//             }
//         },
//         watch: {
//             count(newVal, oldVal){
//                 console.log('newVal is %s, oldVal is %s', newVal, oldVal);
//                 if (this.count < 2) {
//                     this.color = 'pink';
//                 } else if(this.count < 4) {
//                     this.color = 'blue'
//                 } else {
//                     this.color = 'yellow'
//                 }
//             }
//         }
//         // data() {
//         //     return {
//         //         msg: 'hello world！'
//         //     }
//         // }
//     });
// }
//
// (function () {
//     init();
// }());