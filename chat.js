var express = require('express')
var app = express()

var server = require('http').createServer(app);//server是http服务器
var io = require('socket.io')(server);//io是socket对象
var number=0;
//socket服务器监听连接 表示已经建立连接
io.on('connection', function (socket) {
  //socket.emit('request', /* */); // 向客户端发送一个事件
  //io.emit('broadcast', /* */); // 向所有客户端发送一个事件


  /*setInterval(function(){
    io.emit('msg','hello world'+(new Date()));
  },1000);*/

  //监听客户端发来的事件
  socket.on('login', function (data) {
    //用户名存到socket对象里
    socket.username = data;
    console.log(data + '登录了');
    socket.emit('username', data);
    number++;
    io.emit('enter', data,number);
  });
  socket.on('disconnect', function () {
    number--;
    io.emit('quit', socket.username,number);
  })
  socket.on('chat', function (data) {
    io.emit('chat-msg', socket.username, data);
  });
  socket.on('back', function (data) {
    number--;
    io.emit('quit', data,number);
  })
});




//静态文件中间件
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/1.html')
})
console.log(__dirname + '/1.html')
//app.listen(3000)
server.listen(3000);