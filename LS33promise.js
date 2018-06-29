// Promise构造函数用于实例化Promise对象
// Promise构造函数接受一个函数（执行器）作为参数，创建Promise对象时，执行器会立即执行
// 该执行器的两个参数分别是resolve函数和reject函数。
// resolve和reject这两个函数，由 JavaScript 引擎提供，不用自己部署。

// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved）
// 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected）
// 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数


// Promise案例一
var myFirstPromise = new Promise(function(resolve, reject){
    //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
    //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
    console.log("step1");
    setTimeout(function(){
        resolve("成功!"); // 思考：如果改为 reject("失败");
    }, 2500);
    //简写的方式  setTimeout(resolve,2500,"成功!");//等效于上面3行
    console.log("step2");
});

myFirstPromise.then(function(successMessage){
    //successMessage的值是上面调用resolve(...)方法传入的值.
    console.log("Yes! " + successMessage);
},function(errorMessage){
	console.log("No! " + errorMessage);
});




//Promise 案例二
var promise = new Promise(function (resolve, reject) {
    console.log("创建Promise对象时，执行器会立即执行");
    var a = "xxx";
    setTimeout(() => { 
        if (a == "abc") {
            resolve(a);
        } else {
            reject(new Error("error"));
        }
    }, 2000);//2秒后执行（异步执行）
    a = "abc";//试试改为 a = "yyy";
});
promise.then(function (val) { //切换到fulfilled状态后调用，接收resolve的参数
    console.log(val);
}, function (err) { //切换到rejected状态后调用，接收reject的参数
    console.log(err);
});
//创建Promise对象时，执行器会立即执行
//Promise {<pending>}
//abc


new Promise((a,b)=>{
	setTimeout(a,1000,"x");//setTimeout(b,1000,"x");
}).then(
	(v)=>{console.log("v1:",v)},
	(e)=>{console.log("e1:",e)}
).then(
	(v)=>{console.log("v2:",v)},
	(e)=>{console.log("e2:",e)}
)
//v1：x      v2：undefined






//Promise的原型方法，Promise.prototype.then
//then的基本案例 Part1
function promiseTest(ms) {
    return new Promise((resolve, reject) => {
		console.log(111);
		setTimeout(resolve, ms, 'done');//setTimeout(reject, ms, 'failed');
		//return setTimeout(resolve, ms, 'done');//若不想输出222，则需要立即返回
		console.log(222);
    });
}
promiseTest(2000).then(
    (val) => { console.log('this is success callback:',val) },
    (err) => { console.log('this is fail callback:',err) }
)
//111   222     Promise{<pending>}     this is success callback:done



//then的链式调用 Part2
var p = new Promise(function(resolved,rejected){
	console.log("11");
	resolved("22");//思考：rejected("22");
	console.log("33");
});
p.then(function(v1){
	console.log("44",v1);
},function(e1){
	console.log("55",e1);
})
.then(function(v2){
	console.log("66",v2);
},function(e2){
	console.log("77",e2);
})
.then(function(v3){
	console.log("88",v3);
},function(e3){
	console.log("99",e3);
});
//11
//33 
//44   22
//66  undefined
//88   undefined





//执行的顺序 案例一
var promise = new Promise(function (resolve, reject) {
    console.log('111');
    resolve();
  });
  promise.then(function () {
    console.log('222');
  });
  console.log('333');
  //111   333    222




  new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
  }).then(r => console.log(r));
//2   1  




// then()中返回promise的情况
//由于then()本身就会返回一个新的promise，
//所以后一个then()针对的永远是一个新的promise，
//但是像上面代码中我们自己手动返回p4，
//那么我们就可以在返回的promise中再次通过 resolve() 和 reject() 来改变状态
let p3 = new Promise ( (resolve, reject) => {
    resolve("111");
  } )
  let p4 = new Promise ((resolve, reject) => {
  resolve("222");
  })
  p3.then((value_1) => {console.log(value_1);return p4;})
  .then((value_2) => {console.log(value_2);});
//111    222







