const express=require("express");
const path=require('path');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const e = require("express");
const app=express();

//setting connection with database

const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud'
});
conn.connect((error)=>{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log("Database connected!");
    }
})

//setting views file
app.set('views',path.join(__dirname,'views'));

//setting view engine
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get("/",(req,res)=>{
    let sql="select * from users";
    let query=conn.query(sql,(err,rows)=>{
        if(err) throw err;
        res.render("user_index",{
            title:'All Users',
            users: rows
        });
    })
    
});

app.get("/add",(req,res)=>{
    let sql="select * from users";
    let query=conn.query(sql,(err,rows)=>{
        if(err) throw err;
        res.render("user_add",{
            title:'Add User',
        });
    })
    
});

app.post("/save",(req,res)=>{
    let data={
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    };
    let sql="insert into users set ?";
    let query=conn.query(sql,data,(err,results)=>{
        if(err) throw err;
        res.redirect("/");
    })
})

app.get("/edit/:userId",(req,res)=>{
    const userId=req.params.userId;
    let sql=`select * from users where id= ${userId}`;
    let query=conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.render("user_edit",{
            title:'Edit User',
            user:result[0]
        })
    })
})

app.post("/update",(req,res)=>{
    
    const userId=req.body.id;
    let sql="update users set name='"+req.body.name+"',email='"+req.body.email+"',phone='"+req.body.phone+"' where id="+userId;
    let query=conn.query(sql,(err,results)=>{
        if(err) throw err;
        res.redirect("/");
    })
})

app.get("/delete/:userId",(req,res)=>{
    const userId=req.params.userId;
    let sql=`delete from users where id= ${userId}`;
    let query=conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.redirect("/");
    })
})

app.listen(4000,()=>{
    
    console.log("App listening at 4000");
    
})