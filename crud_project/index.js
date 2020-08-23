const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"admin",
    database: "umg"
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("conection ok");
    }else{
        console.log("connection error: "+JSON.stringify(err,undefined,2));
    }
});


app.listen(3000,()=>{console.log('server running port 3000')});


app.get('/',(req,res)=>{
    res.send('hola desde express');
});

app.get('/empleados',(req,res)=>{
    console.log('get lista empleados')
    mysqlConnection.query('Select * from empleados',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});

app.get('/empleados/:id',(req,res)=>{
    console.log('get empleado')
    mysqlConnection.query('Select * from empleados where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});

app.delete('/empleados/:id',(req,res)=>{
    console.log('delete empleados')
    mysqlConnection.query('delete from empleados where id = ?',
    [req.params.id], (err,result)=>{
        if(!err){
            res.send('deleted Succesfully');
        }else{
            console.log(err);
        }
    })
});

app.post('/empleados',(req,res)=>{
    let emp = req.body;
    console.log('insert empleados')
    mysqlConnection.query('insert into empleados (nombre, codigo, salario) values (?,?,?)',
    [emp.nombre,emp.codigo,emp.salario], (err,result)=>{
        if(!err){
            res.send('created Succesfully');
        }else{
            console.log(err);
        }
    })
});

app.put('/empleados',(req,res)=>{
    let emp = req.body;
    console.log('update empleados')
    mysqlConnection.query('update empleados set nombre=?, codigo=?, salario=? where id = ?',
    [emp.nombre,emp.codigo,emp.salario,emp.id],(err,result)=>{
        if(!err){
            res.send('updated Succesfully');
        }else{
            console.log(err);
        }
    })
});