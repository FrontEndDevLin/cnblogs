const express = require("express");
const pool = require("../pool");
let router = express.Router();

router.get("/getComm",(req,res)=>{
    let bid = req.query.bid;
    let sql = "SELECT (SELECT uname FROM cnblogs_user WHERE userId=uid) AS cname,"+
              "content,cTime FROM comment WHERE tblogsId=? ORDER BY cTime";
    pool.query(sql,[bid],(err,result)=>{
        if(err) throw err;
        if(result) res.json({"code":1,"msg":"succ","data":result});
        else res.json({"code":-1,"msg":"fail"});
    })
});

router.get("/pubComm",(req,res)=>{
    let bid = req.query.bid,
        uid = req.query.cuid,
        content = req.query.content;
    let now = new Date().getTime();
    let sql = "INSERT INTO comment VALUES(null,?,?,?,?)";
    pool.query(sql,[uid,bid,content,now],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows == 1){
            res.json({"code":1,"msg":"succ"});
        }else{
            res.json({"code":-1,"msg":"fail"});            
        }
    })
})

module.exports = router;