const express = require('express');
const app     = express();
const mysql   = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345',
    database : 'toko'
});
db.connect();

app.get('/data', function(req,res){
    var sql = 'select * from siswa';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/data/:id', function(req,res){
    var sql = `select * from siswa where nama = 
    '${req.params.id}'`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/input', function(req,res){
    var data = {nama:"bandi", usia:24};
    var sql = 'insert into siswa set ?';
    db.query(sql, data, (err, result)=>{
        if(err) throw err;
        console.log(result);
    });
    res.sendFile(__dirname+'/Sukses.html');
});

app.listen(3200, ()=>{
    console.log('Server @Port 3200')
});
