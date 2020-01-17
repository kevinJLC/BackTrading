//Rama unutil
const express = require('express');
const app= express();

const morgan=require('morgan')
const cors=require('cors');
const tasks = require('./routes/tasks');
const path=require('path');
const {mongoose} = require('./MongoDB/database');
const ActualizacionApi = require('./models/ActualizacionApi');

const Empresa=require('./models/Empresas');
const request = require("request-promise");
const empresasApi = []

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

//static files
app.use("",express.static(path.join(__dirname,'angular')));

//Rutas
  //app.use(routes);
app.use(tasks);
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular","index.html"))
});

(function respaldo(){


  // get hoy y mañana date
  const hoy = new Date();
  console.log(hoy.getDate() +'/'+ hoy.getMonth() + '/' + hoy.getFullYear() + ' a las : '+ hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds());
  var mañana = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate(),23,59,59);
  mañana = new Date(mañana.getTime()+1000);
  console.log(mañana.getDate() +'/'+ mañana.getMonth() + '/' + mañana.getFullYear() + ' a las : '+ mañana.getHours()+':'+mañana.getMinutes()+':'+mañana.getSeconds());

  // verifica que sea sábado o domingo
  if(hoy.getDay() == 6 || hoy.getDay() == 0){
    var sabado = new Date();
    var sabadoNoche = new Date (sabado.getFullYear(), sabado.getMonth(), sabado.getDate(),23,59,59);
    sabadoNoche = new Date(sabadoNoche.getTime()+1000);
    console.log(sabadoNoche.getTime() + '-'+ sabado.getTime());
    console.log(sabadoNoche.getTime()-sabado.getTime());
    var tiempoParaMediaNoche = sabadoNoche.getTime()-sabado.getTime();
    setTimeout(respaldo, tiempoParaMediaNoche);
  }

  ActualizacionApi.findById({_id: '5e1cc84962c70439c85680b5'}).then(result => {
    let año = parseInt(result.fechaDeActualizacion.split('-')[0]);
    let mes = parseInt(result.fechaDeActualizacion.split('-')[1]); // 0 = Ene y 11 = Dic
    let dia = parseInt(result.fechaDeActualizacion.split('-')[2]);
    const fechaUltimaActualizacion = new Date(año, mes, dia);

    // verifica que sea la primera ejecución de esta función en el dia
    console.log(hoy.getDay() + ' ' + fechaUltimaActualizacion.getDay());
    if(hoy.getDay() !== fechaUltimaActualizacion.getDay()){
      if(result.EstadoDeActualizacion == false){
        console.log('Sin respaldo el ' + fechaUltimaActualizacion);
        //Respaldo de la BD
        request('http://backtrading.herokuapp.com/api/empresas', (err,res) => {
          if(err){
             console.log('Respaldo fallido!!!!! ' + err )
          }
          console.log('Respaldo exitoso: ' + result.fechaDeActualizacion);

        });
      }
      //update fecha y status
        let fechaHoy = (hoy.getFullYear()+'-'+hoy.getMonth()+'-'+hoy.getDate()).toString();
        ActualizacionApi.updateOne({_id: '5e1cc84962c70439c85680b5'},{fechaDeActualizacion: fechaHoy, EstadoDeActualizacion: false})
        .then(() => {
          console.log('Fecha de actualizacion updateada por primera vez el ' + fechaHoy);
        })
        .catch(err => { console.log('Fecha de actualizacion NO updateada por primera vez el ' + fechaHoy)});

    }

    console.log(mañana.getTime()-hoy.getTime());
    setTimeout(updateEmpresas, mañana.getTime()-hoy.getTime());

    //Respaldo de la BD

    function updateEmpresas(){
      request('http://backtrading.herokuapp.com/api/empresas', (err,res) => {
          if(err){
             console.log('Respaldo fallido!!!!! ' + err )
          }else{
            console.log('Respaldo exitoso: ' + result.fechaDeActualizacion);
          }

        });

        let fechaHoy = (hoy.getFullYear()+'-'+hoy.getMonth()+'-'+hoy.getDate()).toString();
        ActualizacionApi.updateOne({_id: '5e1cc84962c70439c85680b5'},{fechaDeActualizacion: fechaHoy, EstadoDeActualizacion: true})
        .then(() => {
          console.log('Fecha de actualizacion updateada ' + fechaHoy);
          respaldo();
        })
        .catch(err => { console.log('Fecha de actualizacion NO updateada ' + fechaHoy)});
    }

  });



})();


module.exports=app;
