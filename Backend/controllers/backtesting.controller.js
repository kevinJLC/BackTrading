const Sistema = require('../models/Sistemas');
const Empresas = require('../models/Empresas');

const controller ={};

controller.postBacktesting = (req,res) =>{
    console.log(req.body.sistema);
    console.log(req.body.condicion);

    console.log(req.body.sistema.fechaInicio);
    console.log(req.body.sistema.fechaFinalizacion);

    const añoFinal = parseInt(req.body.sistema.fechaFinalizacion.split('-')[0]);
    const mesFinal = parseInt(req.body.sistema.fechaFinalizacion.split('-')[1])-1; // 0 = Ene y 11 = Dic
    const diaFinal = parseInt(req.body.sistema.fechaFinalizacion.split('-')[2]);
    const inputFinal = new Date(añoFinal, mesFinal, diaFinal);


    const añoInicio = parseInt(req.body.sistema.fechaInicio.split('-')[0]);
    const mesInicio = parseInt(req.body.sistema.fechaInicio.split('-')[1])-1; // 0 = Ene y 11 = Dic
    const diaInicio = parseInt(req.body.sistema.fechaInicio.split('-')[2]);
    const inputInicio = new Date(añoInicio, mesInicio, diaInicio);

  Empresas.find().then(todasLasEmpresas => {
  var  operaciones;
    // Recorre las empresas
    todasLasEmpresas.forEach(function (value, index){
      console.log(index + ' ' + value['simbolo']);
      const preciosEmpresa = value['precios'];
      preciosEmpresa.reverse();

      var rangoDias = 0;
      // Recorre los precios y calcula operaciones
      preciosEmpresa.forEach(function (value,index){
        let año = parseInt(value['fecha'].split('-')[0]);
        let mes = parseInt(value['fecha'].split('-')[1])-1; // 0 = Ene y 11 = Dic
        let dia = parseInt(value['fecha'].split('-')[2]);
        let fechaPrecio = new Date(año, mes, dia);
        if(fechaPrecio >= inputInicio && fechaPrecio <= inputFinal){
            rangoDias++;
        }
      });

      if(Math.trunc(rangoDias/req.body.sistema.periodo) == 0){operaciones=0; return}
      operaciones = Math.trunc(rangoDias/req.body.sistema.periodo);
      console.log(operaciones + ' operaciones')

      // Recorreo los precios y calcula los indicadores de req.body.condicion
      var contadorDiasEnOperacion=1;
      var contadorDeOperacionesRealizadas = operaciones;

      preciosEmpresa.forEach(function (value,index){
        let año = parseInt(value['fecha'].split('-')[0]);
        let mes = parseInt(value['fecha'].split('-')[1])-1; // 0 = Ene y 11 = Dic
        let dia = parseInt(value['fecha'].split('-')[2]);
        let fechaPrecio = new Date(año, mes, dia);
        if(fechaPrecio >= inputInicio && fechaPrecio <= inputFinal && contadorDeOperacionesRealizadas !== 0){
          if(contadorDiasEnOperacion > req.body.sistema.periodo){ contadorDiasEnOperacion = 1;}
          if(contadorDiasEnOperacion == 1){
            req.body.condicion.forEach(function (indicador,posicion){
              switch(indicador){
                case 'ama':
                    console.log('Indicador AMA');

                    const ama = AMA(index);
                    console.log(ama);

                    //


                    function AMA(amaIndex){
                      // calcula ER efitience ratio
                      let cambio = Math.abs(preciosEmpresa[amaIndex]['close'] - preciosEmpresa[amaIndex-req.body.sistema.periodo]['close']);
                      let volatilidad = 0;
                    for(let i = amaIndex; i > amaIndex-req.body.sistema.periodo; i--){
                      volatilidad = volatilidad + Math.abs(preciosEmpresa[i]['close'] - preciosEmpresa[i-1]['close']);
                    }
                    let ER = cambio/volatilidad;

                    // calcula  SC constante de suavizado
                    let SC = Math.pow(ER * (2/(2+1) - 2/(30+1)) + 2/(30+1),2);

                    // calcula AMA adaptative moving average
                    let insideAMA=0;
                    if(amaIndex == index-req.body.sistema.periodo){
                      insideAMA = SMA(amaIndex) + SC * (preciosEmpresa[amaIndex]['close'] - SMA(amaIndex));
                    }else{
                      insideAMA = AMA(amaIndex-1)+ SC * (preciosEmpresa[amaIndex]['close'] - AMA(amaIndex-1));
                    }


                    return insideAMA;
                    }

                    function SMA(smaIndex){
                      var insideSMA = 0;
                      for (let i = smaIndex-req.body.sistema.periodo; i < smaIndex ; i++){
                        insideSMA = insideSMA + preciosEmpresa[i]['close'];
                      }
                      insideSMA = insideSMA/req.body.sistema.periodo;
                      return insideSMA;
                    }




                  break;
                case 'envelopes':
                    console.log('Indicador ENVELOPES');
                  break;
                case 'ma':
                    console.log('Indicador MA');
                  break;
                case 'atr':
                    console.log('Indicador ATR');
                  break;
                case 'bears':
                    console.log('Indicador BEARS');
                  break;
                case 'bulls':
                    console.log('Indicador BULLS');
                  break;
                case 'dmark':
                    console.log('Indicador DMARK');
                  break;
                case 'macd':
                    console.log('Indicador MACD');
                  break;
                case 'momentum':
                    console.log('Indicador MOMENTUM');
                  break;
                case 'osma':
                    console.log('Indicador OSMA');
                  break;
                case 'rsi':
                    console.log('Indicador RSI');
                  break;
                case 'mfi':
                    console.log('Indicador MFI');
                  break;
                case 'obv':
                    console.log('Indicador OBV');
                  break;
                case 'volumes':
                    console.log('Indicador VOLUMES');
                  break;
                case 'ao':
                    console.log('Indicador AO');
                  break;

              }

            })

            contadorDeOperacionesRealizadas--;
          }

          contadorDiasEnOperacion++;
        }
      });


    })



    // Llena la tabla de comparacion
    if(operaciones === 0){
      res.json({status: false, message: 'Su rango de operacion supera la cantidad de dias ente el inicio y el final del backtesting. SOLUCION: modifique las fechas de inicio o finalizacion considerando que sábados, domingos y dias festivos no se toman en cuenta, o disminuya su rango de operacion'});
      return;
    }else{
      res.json({status: true, message: 'Backtesting finalizado'});

    }

    //Calcula la empresa ganadora ...
  })
  .catch(err => {
    console.log('No se pudo consultar la coleccion empresas: '+err);
  });

}

module.exports=controller;
