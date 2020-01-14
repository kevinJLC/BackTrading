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
    const año = parseInt(result.fechaDeActualizacion.split('-')[0]);
    const mes = parseInt(result.fechaDeActualizacion.split('-')[1])-1; // 0 = Ene y 11 = Dic
    const dia = parseInt(result.fechaDeActualizacion.split('-')[2]);
    const fechaUltimaActualizacion = new Date(año, mes, dia);

    // verifica que sea la primera ejecución de esta función en el dia
    if(hoy.getTime() > fechaUltimaActualizacion.getTime()){
      if(result.EstadoDeActualizacion == false){
        console.log('Sin respaldo el ' + fechaUltimaActualizacion);

        //Respaldo de la BD
      }
      //update fecha y status

    }
    setTimeout(updateEmpresas, mañana.getTime()-hoy.getTime());

    //Respaldo de la BD
    function updateEmpresas(){
      //peticion|.then.cath
      //peticion2.then.cath

      // petición a la Api
      /*
      var URI = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=YAWX1E3QZ0LONC2T'
      request(URI, {json: true}).then( result => {

        var listaPrecios = [];
        preciosObject = result['Time Series (Daily)'];
        for (const key in preciosObject) {
        var listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
        listadoDias.fecha = key;
        listadoDias.open = parseFloat(preciosObject[key]['1. open']);
        listadoDias.close = parseFloat(preciosObject[key]['4. close']);
        listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
        listadoDias.lower = parseFloat(preciosObject[key]['3. low']) ;
        listadoDias.volume = parseInt(preciosObject[key]['3. low']);
        listaPrecios.push(listadoDias);
      }

      const respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
      });

      respaldo.save()
      .then(response => {
      console.log('se guardó');
      })
      .catch(err => { console.log(err) });

      })
      .catch(err => {
      console.log('hola ' + err);
      });
      */


    }

  });



})();


module.exports=app;
