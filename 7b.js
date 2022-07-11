const http=require('http');
const fs=require('fs');

http.createServer(function(req,res){
    res.write("Hello!");
    res.end();
}).listen(4000);