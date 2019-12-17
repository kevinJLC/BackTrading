const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const routes = require('./routes/routes');
const app= express();

//conexión a la base de datos [test] con la contraseña [WIcXuhhUUE0V4Oeu]
mongoose.connect("mongodb+srv://kevin:WIcXuhhUUE0V4Oeu@cluster0-yqqtj.mongodb.net/test?retryWrites=true&w=majority").
then(()=>{
  console.log('conected to database');
})
.catch(()=>{
  console.log('conection failed');
});
//Middlewares


//Rutas
app.use(routes);

app.use(express.json());
app.use(express.urlencoded({extended: false}))

module.exports=app;

