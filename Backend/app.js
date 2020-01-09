const express = require('express');
const app= express();

const morgan=require('morgan')
const cors=require('cors');
const tasks = require('./routes/tasks');
const path=require('path');
const {mongoose} = require('./MongoDB/database');
//const mongoose = require('mongoose');
//const routes = require('./routes/routes');


/*conexión a la base de datos online [test] con la contraseña [WIcXuhhUUE0V4Oeu]
mongoose.connect("mongodb+srv://kevin:WIcXuhhUUE0V4Oeu@cluster0-yqqtj.mongodb.net/test?retryWrites=true&w=majority").
then(()=>{
  console.log('conected to database');
})
.catch(()=>{
  console.log('conection failed');
});
*/

//Middlewares

/*  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST,PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
*/
app.use(cors({origin: 'http://localhost:4200'}));
app.use(morgan('dev'));
app.use(express.json()); //Body Parser desde express incluido para usar req.body
app.use(express.urlencoded({extended: false}))


//Rutas
      //app.use(routes);
app.use(tasks);



//static files
      //app.use(express.static(path.join(__dirname,'dist')));

module.exports=app;
