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
      console.log('[' + index + '] ' + value['simbolo']);
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

      // Recorreo los precios y calcula los indicadores de req.body.condicion
      var contadorDiasEnOperacion=1;
      var contadorDeOperacionesRealizadas = operaciones;

      var boolCondicion = true;
      var boolOperacionExitosa = true;
      var openInicioOperacion = 0;

      var name = value['simbolo']; //listo
      var opExitosas =0;
      var opFallidas = 0;
      var opRealizadas = 0; //listo
      var opMaximas = operaciones;  //listo
      var probabilidadExito = 0;
      var sumatoriaDiasEnOperacion = 0; //listo
      var promTiempoOperacion = 0;  //listo
      var usabilidad = 0; //listo


      preciosEmpresa.forEach(function (value,index){
        let año = parseInt(value['fecha'].split('-')[0]);
        let mes = parseInt(value['fecha'].split('-')[1])-1; // 0 = Ene y 11 = Dic
        let dia = parseInt(value['fecha'].split('-')[2]);
        let fechaPrecio = new Date(año, mes, dia);
        if(fechaPrecio >= inputInicio && fechaPrecio <= inputFinal && contadorDeOperacionesRealizadas !== 0){
          if(contadorDiasEnOperacion > req.body.sistema.periodo){ contadorDiasEnOperacion = 1; boolOperacionExitosa = true; }
          if(contadorDiasEnOperacion == 1){
            openInicioOperacion = value['open'];
            boolCondicion = true;

            req.body.condicion.forEach(function (indicador,posicion){
              if(boolCondicion == false){return};
              switch(indicador){
                case 'ama':
                    const ama = AMA(index-1);
                    console.log('Indicador AMA: ' + ama);
                    // condiciones
                    if(ama > AMA((index-1)-req.body.sistema.periodo) && ((value['open']>ama && value['close']<ama) || (value['open']<ama && value['close']>ama) || (value['open']>ama && value['close']>ama && value['lower']<ama) || (value['open']>ama && value['close']>ama && value['lower']>ama)) ){
                      // compra
                      console.log(true);
                      boolCondicion = true;
                    } else if(ama < AMA((index-1)-req.body.sistema.periodo) && ((value['open']<ama && value['close']>ama) || (value['open']>ama && value['close']<ama) || (value['open']<ama && value['close']<ama && value['higher'] > ama) || (value['open']<ama && value['close']<ama && value['higher'] < ama)) ){
                      // No compres
                      console.log(false);
                      boolCondicion = false;
                    }else {
                      // No compres
                      console.log(false);
                      boolCondicion = false;
                    }
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
                    if(amaIndex == (index-1)-req.body.sistema.periodo){
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
                    const K = 5; // valor por defecto de la desviacion
                    var upp = upperBand(index-1);
                    var low = lowerBand(index-1);
                    var ssmmaa = SMA(index-1);
                    console.log('Indicador ENVELOPES: '+ upp + ' ' + ssmmaa + ' ' + low);

                    //compra
                    if(lowerBand(index-1) > lowerBand(index-req.body.sistema.periodo) && (preciosEmpresa[index-1]['close'] < SMA(index-1) && preciosEmpresa[index-1]['close'] >= lowerBand(index-1) || (preciosEmpresa[index-1]['close']) < lowerBand(index-1))){
                      console.log(true);
                      boolCondicion = true;
                    }
                    //vende
                    else{
                      console.log(false);
                      boolCondicion = false;
                    }

                    //señal de compra o venta

                    function upperBand(upperIndex){
                      var sma = SMA(upperIndex);
                      uppBand = sma*(1+K/100);

                      return(uppBand);
                    }

                    function lowerBand(lowerIndex){
                      var sma = SMA(lowerIndex);
                      lowBand = sma*(1-K/100);

                      return(lowBand);
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
                case 'ma':
                    var sma = SMA(index-1);
                    console.log('Indicador MA: '+sma);

                    //compra
                    if(SMA(index-1) > SMA(index-req.body.sistema.periodo) && ((preciosEmpresa[index-1]['open']>SMA(index-1) && preciosEmpresa[index-1]['close']<SMA(index-1)) || (preciosEmpresa[index-1]['open']<SMA(index-1) && preciosEmpresa[index-1]['close']>SMA(index-1)) || (preciosEmpresa[index-1]['open']>SMA(index-1) && preciosEmpresa[index-1]['close']>SMA(index-1)) && preciosEmpresa[index-1]['lower']<SMA(index-1))){
                      console.log(true);
                      boolCondicion = true;
                    }
                    else{
                      console.log(false);
                      boolCondicion = false;
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
                case 'atr':
                    var atr = ATR(index-1);
                    atr = atr/req.body.sistema.periodo;
                    console.log('Indicador ATR: '+atr);


                    var stopLimit = preciosEmpresa[index]['open'] * (1+(req.body.sistema.rendimiento/100))
                    if(preciosEmpresa[index-req.body.sistema.periodo]['close']<preciosEmpresa[index-1]['close'] && (preciosEmpresa[index-1]['close']+atr) >= stopLimit ){
                      console.log(true);
                      boolCondicion = true;
                    } else {
                      console.log(false);
                      boolCondicion = false;
                    }




                    function ATR(atrIndex){
                      var bestATR;
                      var dif1 = preciosEmpresa[atrIndex]['higher'] - preciosEmpresa[atrIndex]['lower'];
                      var dif2 = preciosEmpresa[atrIndex-1]['close'] - preciosEmpresa[atrIndex]['higher'];
                      var dif3 = preciosEmpresa[atrIndex-1]['close'] - preciosEmpresa[atrIndex]['lower'];
                      if(dif1 > Math.abs(dif2)){
                        if( dif1 > Math.abs(dif3)){
                          bestATR = dif1;
                        }else{
                          bestATR = Math.abs(dif3);
                        }
                      } else {
                        if ( Math.abs(dif2) > Math.abs(dif3) ){
                          bestATR = Math.abs(dif2);
                        }else{
                          bestATR = Math.abs(dif3);
                        }
                      }

                      if(atrIndex == (index-1) - (req.body.sistema.periodo - 1)){
                        return dif1;
                      }
                      bestATR = bestATR + ATR(atrIndex-1);

                      return bestATR;
                    }



                  break;
                case 'bears':
                    console.log('Indicador BEARS');
                    
                  break;
                case 'bulls':
                    console.log('Indicador BULLS');
                  break;
                case 'dmark':
                    console.log('Indicador EMA');  //Editado cambiar de marker por ema
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
                    console.log('Indicador A/D'); //Editado cambiar rsi por Accumulation/Distribution
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
                    console.log('Indicador AO'); //Editado cambiar accelerator oscillator por awesome oscillator
                  break;

              }
            })



          }

          if(boolCondicion == true && boolOperacionExitosa == true ){

                 if( value['higher'] >= (openInicioOperacion * (1 + (req.body.sistema.rendimiento/100))) ){

                    boolOperacionExitosa = false;
                    opExitosas++;

                 } else if( value['lower'] <= (openInicioOperacion * (1-(req.body.sistema.stoploss/100))) ){

                    boolOperacionExitosa = false;
                    opFallidas++;
                 } else if (contadorDiasEnOperacion == req.body.sistema.periodo){
                    opFallidas++;
                 }


              sumatoriaDiasEnOperacion++;
          }


          if(contadorDiasEnOperacion == req.body.sistema.periodo){contadorDeOperacionesRealizadas--;}
          contadorDiasEnOperacion++;
        }


      });

      opRealizadas = opFallidas + opExitosas;
      probabilidadExito = (opExitosas/opRealizadas)*100;
      promTiempoOperacion = Math.trunc(sumatoriaDiasEnOperacion/opRealizadas);
      usabilidad = (opRealizadas/opMaximas)*100;

      if(opRealizadas == 0){ probabilidadExito = 0; promTiempoOperacion = 0;};

      console.log(' ');
      console.log('opMaximas = '+opMaximas);
      console.log('opRealizadas = '+opRealizadas);
      console.log('opFallidas = '+opFallidas);
      console.log('opExitosas = '+opExitosas);
      console.log('%Exito = '+ probabilidadExito + '%');
      console.log('Dias en operacion = '+sumatoriaDiasEnOperacion);
      console.log('Promedio tiempo operacion = '+ promTiempoOperacion + ' Dia(s)');
      console.log('Usabilidad = ' + usabilidad + '%');
      console.log('///////////////////////////////////////////////////////////////// End ' + name);
      console.log(' ');

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
