const express = require("express");
const pool = require("../pool");
let router = express.Router();

router.post("/publish",(req,res)=>{
    let title = req.body.title,
        content = req.body.content,
        abstract = req.body.abstract,
        tagId = req.body.tagId,
        createTime = new Date().getTime(),
        lastEditTime = createTime,
        isOnTop = req.body.isOnTop,
        isOnIndex = req.body.isOnIndex;
    let sql = "INSERT INTO cnblogs_blogs VALUES(NULL,1,?,?,?,?,?,?,1,0,?,?)";
    pool.query(sql,[title,content,abstract,tagId,createTime,lastEditTime,isOnTop,isOnIndex],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows == 1){
            res.json({"code":1,"msg":"succ"});
        }else{
            res.json({"code":-1,"msg":"fail"});            
        }
    })
});

router.get("/blogsMsg",(req,res)=>{
    let tid = parseInt(req.query.tagId);
    let sql = "SELECT blogsId,title,createTime,readCount,"+
            "(SELECT count(cid) FROM comment WHERE tblogsId=blogsId) AS commentCount "+
            "FROM cnblogs_blogs WHERE tagetId = ?";
    pool.query(sql,[tid],(err,result)=>{
        if(err) throw err;
        if(result){
            res.json({"code":1,"msg":"succ","data":result});
        }else{
            res.json({"code":-1,"msg":"fail"});
        }
    })
});

router.post("/delBlog",(req,res)=>{
    let blogId = req.body.blogsId;
    let sql = "DELETE FROM cnblogs_blogs WHERE blogsId=?";
    pool.query(sql,[blogId],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows==1){
            res.json({"code":1,"msg":"succ"});
        }else{
            res.json({"code":-1,"msg":"fail"});
        }
    })
});

//阅读排行
router.get("/readTop",(req,res)=>{
    let sql = "SELECT blogsId,title FROM cnblogs_blogs ORDER BY readCount DESC LIMIT 0,5";
    pool.query(sql,function(err,result){
        if(err) throw err;
        if(result){
            res.json({"code":1,"msg":"succ","data":result})
        }else{
            res.json({"code":-1,"msg":"fail"})            
        }
    })
});

//首页
router.get("/abstract",(req,res)=>{
    let sql = "SELECT blogsId,title,content,abstract,createTime,lastEditTime,readCount,isOnTop,isOnIndex,"+
            "(SELECT uname FROM cnblogs_user WHERE uid=authorId) AS author,"+
            "(SELECT count(tblogsId) FROM comment WHERE tblogsId=blogsId) AS comCount "+
            "FROM cnblogs_blogs WHERE isOnIndex=1 ORDER BY isOnTop DESC,lastEditTime DESC LIMIT 0,8";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result){
            res.json({"code":1,"msg":"succ","data":result});
        }else{
            res.json({"code":-1,"msg":"fail"});
        }
    })
});

//详情
router.get("/detail",(req,res)=>{
    let blogsId = req.query.blogsId;
    let sql = "SELECT (SELECT uname FROM cnblogs_user WHERE uid=authorId) AS author,"+
              "title,content,(SELECT tagName FROM tag WHERE tagId=tagetId) AS tagName,"+
              "createTime,readCount,(SELECT count(tblogsId) FROM comment WHERE tblogsId=blogsId) AS comCount "+
              "FROM cnblogs_blogs WHERE blogsId=?";
    pool.query(sql,[blogsId],(err,result)=>{
        if(err) throw err;
        if(result){
            res.json({"code":1,"msg":"succ",data:result[0]})
        }else{
            res.json({"code":-1,"msg":"fail"});
        }
    })
})

module.exports = router;