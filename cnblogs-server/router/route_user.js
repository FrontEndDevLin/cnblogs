const express = require("express");
const pool = require("../pool");
let router = express.Router();

router.post("/login",(req,res)=>{
	let name = req.body.name;
	let pwd = req.body.pwd;
    let sql = "SELECT uid,uname,level FROM cnblogs_user WHERE uname=? AND upwd=md5(?)";
	pool.query(sql,[name,pwd],(err,data)=>{
        if(err) throw err;
        if(data.length == 1){
            req.session.cn_uid = data[0].uid;
            req.session.cn_uname = data[0].uname;
            req.session.cn_level = data[0].level;
            res.json({"code":1,"msg":"succ"});
        }else{
            res.json({"code":-1,"msg":"fail"});
        }
    })
});

router.get("/checkLogin",(req,res)=>{
    if(req.session.cn_uid){
        let user = {
            "uid": req.session.cn_uid,
            "uname": req.session.cn_uname,
            "level": req.session.cn_level
        }
        res.json({"code":1,"msg":"succ","data":user});
    }else{
        res.json({"code":-1,"msg":"fail"});
    }
});

router.get("/logout",(req,res)=>{
	req.session.cn_uid = null;
	req.session.cn_uname = null;
	req.session.cn_level = null;
	res.json({"code":1,"msg":"succ"});
});

router.get("/checkName",(req,res)=>{
    let name = req.query.name;
    let sql = "SELECT uid FROM cnblogs_user WHERE uname=?";
    pool.query(sql,[name],(err,result)=>{
        if(err) throw err;
        if(result.length == 1){
            res.json({"code":-1,"msg":"fail"});
        }else{
            res.json({"code":1,"msg":"succ"});
        }
    })
});

router.post("/register",(req,res)=>{
    let name = req.body.uname,
        pwd = req.body.upwd,
        sql = "INSERT INTO cnblogs_user VALUES(null,?,md5(?),DEFAULT,?,DEFAULT)";
    pool.query(sql,[name,pwd,new Date().getTime()],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows==1){
            console.log("user "+name+" has register");
            res.json({"code":1,"msg":"succ"});
        }else{
            res.json({"code":-1,"msg":"fail"});
        }
    })
});

router.get("/adminMsg",(req,res)=>{
    let sql1 = "SELECT uname,regTime FROM cnblogs_user WHERE level=?";
    let progress = 0;
    let output = new Object();
    pool.query(sql1,["99"],(err,result)=>{
        if(err) throw err;
        output.admin = result[0];
        progress += 50;
        if(progress == 100){
            res.json(output);
        }
    });
    let sql2 = "SELECT * FROM cnblogs_active";
    pool.query(sql2,(err,result)=>{
        if(err) throw err;
        output.activeForm = result;
        progress += 50;
        if(progress == 100){
            res.json(output);
        }
    });
});

router.get("/active",(req,res)=>{
    let uid = req.query.uid;
    let sql = "INSERT INTO cnblogs_active VALUES(null,?)";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows == 1){
            res.json({"code":1,"msg":"succ"})
        }else{
            res.json({"code":-1,"msg":"fail"})
        }
    })
})

module.exports = router;