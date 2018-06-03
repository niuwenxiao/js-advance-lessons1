var xhr = new XMLHttpRequest();//创建对象
// if (!xhr) {
//     console.log("xhr 创建失败！！");
// }//创建不成功回应
xhr.onreadystatechange = function () {
    //console.log(xhr.readyState,xhr.status);
    if (xhr.readyState == 4) {//响应数据接受成功
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
            var message = xhr.responseText;
            console.log(message);
        }
    }
};
xhr.open("get", "http://127.0.0.1:8080?getInfo=MyGetInformation", true);
//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//post需增加
xhr.send();
//先open，再send，最后onreadystatechange







var http = require("http");
var url = require("url");
http.createServer(function (req, res) {//创建服务器，第一个参数是回调函数，直到listen前面。req请求，res响应。
    //console.log(Object.keys(req),"___",Object.keys(res));
    //console.log("req.url：",req.url);
    // var getDataObj = url.parse(req.url,true).query;//parse函数中第二个参数为true的话返回一个对象
    var getDataStr = url.parse(req.url).query;//parse函数中第二个参数为true的话返回一个对象

    //解决跨域问题
    res.writeHead(200, {
        "Content-Type": "text/plain",
        // res.writeHead(200, {"Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*", //在后端支持跨域访问的设置，响应头中的设置
        "Access-Control-Allow-Methods": "GET, POST"
    });
    //扔回数据
    setTimeout(function () {
        res.end("你好，我已收到你发的信息："+getDataStr);
    },20000*Math.random());
    //res.end("你的输入信息是："+getDataStr);
}).listen(8080,"127.0.0.1");
console.log("start server!");
