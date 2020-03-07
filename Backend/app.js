const express = require('express');
const app= express();

const morgan=require('morgan')
const cors=require('cors');
const tasks = require('./routes/tasks');
const path=require('path');
const {mongoose} = require('./MongoDB/database');
const ActualizacionApi = require('./models/ActualizacionApi');
const backtesting = require('./controllers/backtesting.controller');
const trading = require('./controllers/indicadores.controller');


const Empresa=require('./models/Empresas');
const Usuarios = require('./models/Usuarios');
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

 /*app.use((req, res, next) => {
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
  });*/

//app.use(cors({origin: '/'}));
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


(async function respaldo(){
  // get hoy y mañana date
  const hoy = new Date();
  console.log(hoy.getDate() +'/'+ hoy.getMonth() + '/' + hoy.getFullYear() + ' a las : '+ hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds());
  var mañana = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate(),23,59,59);
  mañana = new Date(mañana.getTime()+60000);
  console.log(mañana.getDate() +'/'+ mañana.getMonth() + '/' + mañana.getFullYear() + ' a las : '+ mañana.getHours()+':'+mañana.getMinutes()+':'+mañana.getSeconds());

  // verifica que sea sábado o domingo
  if(hoy.getDay() == 6 || hoy.getDay() == 0){

    setTimeout(respaldo, mañana.getTime()-hoy.getTime());

  } else {
    ActualizacionApi.findById({_id: '5e1cc84962c70439c85680b5'}).then(async result => {
      let año = parseInt(result.fechaDeActualizacion.split('-')[0]);
      let mes = parseInt(result.fechaDeActualizacion.split('-')[1]); // 0 = Ene y 11 = Dic
      let dia = parseInt(result.fechaDeActualizacion.split('-')[2]);
      const fechaUltimaActualizacion = new Date(año, mes, dia);

      // verifica que sea la primera ejecución de esta función en el dia
      console.log(hoy.getDay() + ' ' + fechaUltimaActualizacion.getDay());
      if(hoy.getDay() !== fechaUltimaActualizacion.getDay()){

          console.log('Sin respaldo el ' + fechaUltimaActualizacion);
          //Respaldo de la BD
          await request('http://backtrading.com.mx/api/empresas', (err,res) => {
            if(err){
               console.log('Respaldo fallido!!!!! ' + err )
            }else{
               console.log('Respaldo exitoso: ' + result.fechaDeActualizacion);
            }


          });

          //update fecha y status
          let fechaHoy = (hoy.getFullYear()+'-'+hoy.getMonth()+'-'+hoy.getDate()).toString();
          console.log(fechaHoy);
          await ActualizacionApi.updateOne({_id: '5e1cc84962c70439c85680b5'},{fechaDeActualizacion: fechaHoy, EstadoDeActualizacion: false})
          .then(() => {
             console.log('Fecha de actualizacion updateada por primera vez el ' + fechaHoy);
          })
          .catch(err => { console.log('Fecha de actualizacion NO updateada por primera vez el ' + fechaHoy)});



      }




      console.log(mañana.getTime()-hoy.getTime());
      setTimeout(updateEmpresas, mañana.getTime()-hoy.getTime());

      //Respaldo de la BD

      async function updateEmpresas(){
        await request('http://backtrading.com.mx/api/empresas', (err,res) => {
            if(err){
               console.log('Respaldo fallido!!!!! ' + err )
            }else{
              console.log('Respaldo exitoso: ' + result.fechaDeActualizacion);
            }

          });

        let fechaHoy = (hoy.getFullYear()+'-'+hoy.getMonth()+'-'+hoy.getDate()).toString();
        await ActualizacionApi.updateOne({_id: '5e1cc84962c70439c85680b5'},{fechaDeActualizacion: fechaHoy, EstadoDeActualizacion: true})
          .then(() => {
            console.log('Fecha de actualizacion updateada ' + fechaHoy);
          })
          .catch(err => { console.log('Fecha de actualizacion NO updateada ' + fechaHoy)});

        respaldo();
      }

    });
  }





})();




async function TA() {

  console.log('Trading Automático:');
  const hoy = new Date();
  var mañana = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate(),23,59,59);
  mañana = new Date(mañana.getTime()+3600000);
  console.log(hoy.getDate() +'/'+ hoy.getMonth() + '/' + hoy.getFullYear() + ' a las : '+ hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds());
  console.log(mañana.getDate() +'/'+ mañana.getMonth() + '/' + mañana.getFullYear() + ' a las : '+ mañana.getHours()+':'+mañana.getMinutes()+':'+mañana.getSeconds());

  //Si es domingo o sábado
  //TRUE:
  //False: ...
  if(hoy.getDay() > 0 && hoy.getDay() < 6){
    const usuarios = await Usuarios.find();
    usuarios.forEach(async function(value, index){
      if(value['tradingActivo'] && value['capital']>=value['capitalInicial']){
      empresa = await Empresa.findOne({simbolo: value['empresa']})


        //NO es premium
        // Si diasOperacion == 0
        // TRUE:
            //Si indicador == true
            //TRUE: diasOperacion++
            //FALSE:
        // FALSE: Verifica Exitosas
                  // TRUE: recalcula capital (capital=capital*($cierre/$Compra), diasOperación = 0
                  // FALSE: diasOperacion++, Si -> diasOperacion==Periodo || lower <= stoploss
                            //TRUE: recalcula capital, diasOperacion = 0
                            //FALSE:

        if(value['diasOperacion'] == 0){
          if(trading.indicador(value['indicador'],empresa['precios'],value['periodo'],value['parametro'] )){
            await Usuarios.findByIdAndUpdate(value['_id'],{
              diasOperacion: value['diasOperacion']+1,
              precioObjetivo: empresa['precios'][0]['open']*(1 + (value['rendimiento']/100) ),
              precioPerdida: empresa['precios'][0]['open']*(1 + (value['stoploss']))
            })
          }


        } else{
          if(empresa['precios'][0]['higher'] >= value['precioObjetivo']){

            await Usuarios.findByIdAndUpdate(value['_id'],{
              diasOperacion: 0,
              capital: value['capital'] * (1+(value['rendimiento']/100)),
              precioObjetivo: 0,
              precioPerdida: 0
            })
          }else{

            await Usuarios.findByIdAndUpdate(value['_id'],{
              diasOperacion: value['diasOperacion']+1
            })
            if(value['diasOperacion']+1 > value['periodo'] || empresa['precios'][0]['lower']<=value['precioPerdida']){

              await Usuarios.findByIdAndUpdate(value['_id'],{
                diasOperacion: 0,
                capital: value['capital'] * (1+(value['stoploss']/100)),
                precioObjetivo: 0,
                precioPerdida: 0
              })
            }


          }
        }




        //Es premium
      }

    });

  }

  // TimeOut 1:00 am
  setTimeout(TA, mañana.getTime() - hoy.getTime());

}
TA();





module.exports=app;
