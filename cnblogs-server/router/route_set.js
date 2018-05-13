const express = require("express");
const pool = require("../pool");
let router = express.Router();

router.get("/getTitle",(req,res)=>{
    let sql = "SELECT title,sub_title FROM cnblogs_setting WHERE sid=1";
    pool.query(sql,(err,data)=>{
        if(err) throw err;
        res.json({"code":1,"msg":"succ","data":data[0]});
    })
});

router.get("/changeTitle",(req,res)=>{
    let newTitle = req.query.newTitle;
    let newSubTilte = req.query.newSubTitle;
    let sql = "UPDATE cnblogs_setting SET title=?,sub_title=? WHERE sid=1";
    pool.query(sql,[newTitle,newSubTilte],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows == 1){
            res.json({"code":1,"msg":"succ"});
        }else{
            res.json({"code":-1,"msg":"fail"});
        }
    })
});

router.get("/getTag",(req,res)=>{
    let sql = "SELECT tagId,tagName,(SELECT count(blogsId) FROM cnblogs_blogs WHERE tagetId=tagId) AS count FROM tag";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
});

//修改标签名
router.get("/changeTName",(req,res)=>{
    let tagName = req.query.newTName,
        tagId = req.query.tagId;
    let sql = "UPDATE tag SET tagName=? WHERE tagId=?";
    pool.query(sql,[tagName,tagId],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows == 1){
            res.json({"code":1,"msg":"succ"});
        }else{
            res.json({"code":-1,"msg":"fail"});            
        }
    })
});

//添加标签
router.get("/addTag",(req,res)=>{
    let tagName = req.query.tagName;
    if(!tagName){
        res.json({"code":-1,"msg":"fail"});
    }
    let sql = "INSERT INTO tag VALUES(NULL,?)";
    pool.query(sql,[tagName],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows == 1){
            res.json({"code":1,"msg":"succ"});
        }else{
            res.json({"code":-1,"msg":"fail"});
        }
    })
});

//删除标签
router.post("/delTName",(req,res)=>{
    let tagId = req.body.tagId;
    // console.log(tagId);
    let sql1 = "DELETE FROM tag WHERE tagId=?";
    let progress = 0;
    pool.query(sql1,[tagId],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows == 1){
            progress += 50;
            if(progress == 100){
                res.json({"code":1,"msg":"succ"});
            }
        }else{
            res.json({"code":-1,"msg":"fail"});
        }
    });
    let sql2 = "DELETE FROM cnblogs_blogs WHERE tagetId=?";
    pool.query(sql2,[tagId],(err,result)=>{
        if(err) throw err;
        if(result){
            progress += 50;
            if(progress == 100){
                res.json({"code":1,"msg":"succ"});
            }
        }
    })
});

module.exports = router;