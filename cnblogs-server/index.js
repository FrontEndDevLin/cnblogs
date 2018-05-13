const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

//各个路由
const user = require("./router/route_user");
const set = require("./router/route_set");
const blog = require("./router/route_blog");
const com = require("./router/route_com");

let app = express();
http.createServer(app).listen(8080);
console.log("server is listening on port 8080");

//中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
	secret: 'cnblogs',
    key: 'linhr',
    cookie: {maxAge: 7200000 },  //设置maxAge是7200000ms，即120分钟后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));
app.use(cors({
    origin: ["http://127.0.0.1","http://localhost","http://localhost:3000"],
    methods: ["PUT","DELETE","GET","POST"],
    credentials: true
}));

//使用路由器
app.use('/user',user);
app.use('/set',set);
app.use('/blog',blog);
app.use('/comm',com);