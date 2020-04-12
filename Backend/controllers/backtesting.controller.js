const Sistema = require('../models/Sistemas');
const Empresas = require('../models/Empresas');
const Usuarios = require('../models/Usuarios');

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
    var inputInicio = new Date(añoInicio, mesInicio, diaInicio);
    console.log(inputInicio);

  Empresas.find().then(todasLasEmpresas => {
  var  operaciones;
  var procedeBacktesting = false;
  var listaComparacionEmpresas = [];

    // Recorre las empresas
    todasLasEmpresas.forEach(function (value, index){

      console.log('[' + index + '] ' + value['simbolo']);
      const preciosEmpresa = value['precios'];
      preciosEmpresa.reverse();
      var inputInicio = new Date(añoInicio, mesInicio, diaInicio);


      var rangoDias = 0;
      // Recorre los precios y calcula operaciones
      preciosEmpresa.forEach(function (value,index){
        let año = parseInt(value['fecha'].split('-')[0]);
        let mes = parseInt(value['fecha'].split('-')[1])-1; // 0 = Ene y 11 = Dic
        let dia = parseInt(value['fecha'].split('-')[2]);
        let fechaPrecio = new Date(año, mes, dia);

        if(fechaPrecio >= inputInicio && fechaPrecio <= inputFinal){
          if(index - ((req.body.sistema.periodo * 2) + 50) < 0){
            let sumaDias = 86400000 * (50 + req.body.sistema.periodo) ;
            console.log(inputInicio);
            inputInicio=new Date(fechaPrecio.getTime() + sumaDias);
            console.log(inputInicio);
          } else {
            rangoDias++;
          }
        }
      });

      if(Math.trunc(rangoDias/req.body.sistema.periodo) == 0){operaciones=0; return}
      operaciones = Math.trunc(rangoDias/req.body.sistema.periodo);
      console.log(rangoDias);
      procedeBacktesting =  true;

      // Recorreo los precios y calcula los indicadores de req.body.condicion
      var contadorDiasEnOperacion=1;
      var contadorDeOperacionesRealizadas = operaciones;

      var boolCondicion = true;
      var boolOperacionExitosa = true;
      var openInicioOperacion = 0;

      var precioMaximo = 0;
      var precioMinimo = 0;
      var precioMaximoOperacion = 0;
      var precioMinimoOperacion = 0;

      var name = value['simbolo']; //listo
      var opExitosas =0;
      var opFallidas = 0;
      var opRealizadas = 0; //listo
      var opMaximas = operaciones;  //listo
      var probabilidadExito = 0;
      var sumatoriaDiasEnOperacion = 0; //listo
      var promTiempoOperacion = 0;  //listo
      var usabilidad = 0; //listo
      var promMaximoPrecio = 0;
      var promMinimoPrecio = 0;


      preciosEmpresa.forEach(function (value,index){

        let año = parseInt(value['fecha'].split('-')[0]);
        let mes = parseInt(value['fecha'].split('-')[1])-1; // 0 = Ene y 11 = Dic
        let dia = parseInt(value['fecha'].split('-')[2]);
        let fechaPrecio = new Date(año, mes, dia);
        if(fechaPrecio >= inputInicio && fechaPrecio <= inputFinal && contadorDeOperacionesRealizadas !== 0){
          if(contadorDiasEnOperacion > req.body.sistema.periodo){ contadorDiasEnOperacion = 1; boolOperacionExitosa = true; }
          if(contadorDiasEnOperacion == 1){
            precioMinimo = value['lower'];
            precioMaximo = value['higher'];
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
                    var bears = BEARS(index-1);
                    console.log('Indicador BEARS: ' + bears);

                    if(BEARS(index-2)<0 && bears > 0){
                      console.log(true);
                      boolCondicion = true;
                    }else{
                      console.log(false);
                      boolCondicion =  false;
                    }

                    function BEARS(bearsIndex){

                      var insideBears = preciosEmpresa[bearsIndex]['lower'] - bearsEMA(bearsIndex);
                      return insideBears;
                    }


                    function bearsEMA(emaIndex){
                      var P = 2/(req.body.sistema.periodo + 1 );
                      var bestEMA;
                      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
                      if(emaIndex == (index-1) - (req.body.sistema.periodo - 1)){
                        return bearsSMA(emaIndex);
                      }
                      else{
                        bestEMA = (preciosEmpresa[emaIndex]['close'] * P) + (bearsEMA(emaIndex-1) * (1 - P));
                      }
                      return bestEMA;
                    }

                    function bearsSMA(smaIndex){
                      var insideSMA = 0;
                      for (let i = smaIndex-(req.body.sistema.periodo-1); i <= smaIndex ; i++){
                        insideSMA = insideSMA + preciosEmpresa[i]['close'];
                      }
                      insideSMA = insideSMA/req.body.sistema.periodo;
                      return insideSMA;
                    }



                  break;
                case 'bulls':
                    var bulls = BULLS(index-1);

                    console.log('Indicador BULLS: ' + bulls);

                    if(BULLS(index-2)<0 && bulls > 0){
                      console.log(true);
                      boolCondicion = true;
                    }else{
                      console.log(false);
                      boolCondicion =  false;
                    }

                    function BULLS(bullsIndex){
                      console.log(preciosEmpresa[bullsIndex]['higher'] +' '+ bullsEMA(bullsIndex))
                      var insideBulls = preciosEmpresa[bullsIndex]['higher'] - bullsEMA(bullsIndex);
                      return insideBulls;
                    }

                    function bullsEMA(emaIndex){
                      var P = 2/(req.body.sistema.periodo + 1 );
                      var bestEMA;
                      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
                      if(emaIndex == (index-1) - (req.body.sistema.periodo - 1)){
                        return bullsSMA(emaIndex);
                      }
                      else{
                        bestEMA = (preciosEmpresa[emaIndex]['close'] * P) + (bullsEMA(emaIndex-1) * (1 - P));
                      }
                      return bestEMA;
                    }

                    function bullsSMA(smaIndex){
                      var insideSMA = 0;
                      for (let i = smaIndex-(req.body.sistema.periodo-1); i <= smaIndex ; i++){
                        insideSMA = insideSMA + preciosEmpresa[i]['close'];
                      }
                      insideSMA = insideSMA/req.body.sistema.periodo;
                      return insideSMA;
                    }

                  break;
                case 'ema':
                    var P = 2/(req.body.sistema.periodo + 1 );
                    var ema = EMA(index-1);
                    console.log('Indicador EMA: ' + ema);  //Editado cambiar de marker por ema

                    //compra
                    if(preciosEmpresa[index-req.body.sistema.periodo]['close']<preciosEmpresa[index-1]['close'] && (preciosEmpresa[index-1]['open']<ema && preciosEmpresa[index-1]['close']>ema)){
                      console.log(true);
                      boolCondicion = true;
                    }
                    else{
                      console.log(false);
                      boolCondicion = false;
                    }

                    function EMA(emaIndex){
                      var bestEMA;
                      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
                      if(emaIndex == (index-1) - (req.body.sistema.periodo - 1)){
                        return SMA(emaIndex);
                      }
                      else{
                        bestEMA = (preciosEmpresa[emaIndex]['close'] * P) + (EMA(emaIndex-1) * (1 - P));
                      }
                      return bestEMA;
                    }

                    function SMA(smaIndex){
                      var insideSMA = 0;
                      for (let i = smaIndex-(req.body.sistema.periodo - 1); i <= smaIndex ; i++){
                        insideSMA = insideSMA + preciosEmpresa[i]['close'];
                      }
                      insideSMA = insideSMA/req.body.sistema.periodo;
                      return insideSMA;
                    }

                  break;
                case 'macd':

                    var macd =EMA12(index-1) - EMA26(index-1);
                    var signal = SMA9(index-1);
                    console.log('Indicador MACD: ' + macd + ' --> signal: ' + signal);



                    if(preciosEmpresa[index-req.body.sistema.periodo]['close']<preciosEmpresa[index-1]['close'] && EMA12(index-1)>EMA26(index-1)){
                      console.log(true);
                      boolCondicion = true;
                    } else{
                      console.log(false)
                      boolCondicion = false;
                    }

                    function EMA12(emaIndex){
                      var P=2/13;
                      var bestEMA;
                      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
                      if(emaIndex == (index-1) - 11){
                        bestEMA = SMA12(emaIndex);
                      }
                      else{
                        bestEMA = (preciosEmpresa[emaIndex]['close'] * P) + (EMA12(emaIndex-1) * (1 - P));
                      }

                      return bestEMA;
                    }
                    function EMA26(emaIndex){
                      var P=2/27;
                      var bestEMA;
                      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
                      if(emaIndex == (index-1) - 11){
                        bestEMA = SMA26(emaIndex);
                      }
                      else{
                        bestEMA = (preciosEmpresa[emaIndex]['close'] * P) + (EMA26(emaIndex-1) * (1 - P));
                      }

                      return bestEMA;
                    }



                    function SMA12(smaIndex){
                      var insideSMA = 0;
                      for (let i = smaIndex-11; i <= smaIndex ; i++){
                        insideSMA = insideSMA + preciosEmpresa[i]['close'];
                      }
                      insideSMA = insideSMA/12;
                      return insideSMA;
                    }

                    function SMA26(smaIndex){
                      var insideSMA = 0;
                      for (let i = smaIndex-25; i <= smaIndex ; i++){
                        insideSMA = insideSMA + preciosEmpresa[i]['close'];
                      }
                      insideSMA = insideSMA/26;
                      return insideSMA;
                    }

                    function SMA9(smaIndex){
                      var insideSMA = 0;
                      for (let i = smaIndex-8; i <= smaIndex ; i++){
                        insideSMA = insideSMA + (EMA12(i) - EMA26(i));
                      }
                      insideSMA = insideSMA/9;
                      return insideSMA;
                    }

                  break;
                case 'momentum':
                    var momentum = MOMENTUM(index-1);
                    var tasaDeCambio = (preciosEmpresa[index-1]['close'] - preciosEmpresa[index-req.body.sistema.periodo]['close'] ) / preciosEmpresa[index-req.body.sistema.periodo]['close'];

                    console.log('Indicador MOMENTUM: ' + momentum + ' ---> %cambio ' + tasaDeCambio);

                    if(tasaDeCambio >= (req.body.sistema.rendimiento/100) && momentum > 0){
                      console.log(true);
                      boolCondicion =  true;
                    }else {
                      console.log(false);
                      boolCondicion = false;
                    }


                    function MOMENTUM(momentumIndex){
                      let momentum = preciosEmpresa[momentumIndex]['close'] - preciosEmpresa[momentumIndex-req.body.sistema.periodo]['close'] ;
                      return momentum;
                    }
                  break;
                case 'osma':
                    var macd =EMA12(index-1) - EMA26(index-1);
                    var signal = SMA9(index-1);
                    var osma = macd - signal;
                    var macd2 =EMA12(index-2) - EMA26(index-2);
                    var signal2 = SMA9(index-2);
                    var osma2 = macd2 - signal2;

                    console.log('Indicador OSMA: '+ osma2 + ' ----> ' + osma);

                    if(osma > 0 && osma2<osma){
                      console.log(true);
                      boolCondicion =  true;

                    }else{
                      console.log(false);
                      boolCondicion=false;
                    }


                  break;
                case 'a/d':
                    var ad = AD(index-1);
                    console.log('Indicador A/D: ' + ad); //Editado cambiar rsi por Accumulation/Distribution

                    if(preciosEmpresa[index-req.body.sistema.periodo]['close']<preciosEmpresa[index-1]['close'] && ad > 0){
                      console.log(true);
                      boolCondicion =  true;
                    } else{
                      console.log(false);
                      boolCondicion =  false;
                    }

                    function AD(adIndex){
                      if(adIndex == (index-1) - (req.body.sistema.periodo-1)){
                        return (((preciosEmpresa[adIndex]['close'] - preciosEmpresa[adIndex]['lower'])-(preciosEmpresa[adIndex]['higher'] - preciosEmpresa[adIndex]['close'])) / (preciosEmpresa[adIndex]['higher'] - preciosEmpresa[adIndex]['lower']) ) * preciosEmpresa[adIndex]['volume'] ;
                      }
                      var insideAD = (((preciosEmpresa[adIndex]['close'] - preciosEmpresa[adIndex]['lower'])-(preciosEmpresa[adIndex]['higher'] - preciosEmpresa[adIndex]['close']))  / (preciosEmpresa[adIndex]['higher'] - preciosEmpresa[adIndex]['lower'])) * preciosEmpresa[adIndex]['volume']  + AD(adIndex-1);
                      return insideAD;
                    }
                  break;
                case 'mfi':


                    console.log('Indicador MFI: ' + MFI(index-1));

                    if ( MFI(index-req.body.sistema.periodo) < MFI(index-1) && preciosEmpresa[index-req.body.sistema.periodo]['close'] < preciosEmpresa[index-1]['close'] && MFI(index-1)<80){
                      console.log(true);
                      boolCondicion =  true;
                    }else{
                      console.log(false);
                      boolCondicion = false;
                    }



                    function MFI(mfiIndex){
                      var mfPositivo=0;
                      var mfNegativo=0;

                      for(let i = (index-1) - (req.body.sistema.periodo-1); i<=mfiIndex; i++){
                        if(TP(i)<=TP(i-1)){
                          mfNegativo = mfNegativo + MF(i,TP(i));
                        }else{
                          mfPositivo = mfPositivo + MF(i,TP(i));
                        }
                      }

                      var mr = mfPositivo/mfNegativo;
                      var mfi = 100 - (100 / (1 + mr));
                      return mfi;
                    }
                    function TP(tpIndex){
                      return (preciosEmpresa[tpIndex]['higher'] + preciosEmpresa[tpIndex]['lower'] + preciosEmpresa[tpIndex]['close'])/3;
                    }

                    function MF(mfIndex,tp){
                      return tp*preciosEmpresa[mfIndex]['volume'];
                    }

                  break;
                case 'obv':
                    var obv = OBV(index-1);
                    console.log('Indicador OBV: ' + obv);

                    if(OBV(index-1) > 0 && OBV(index-2) < OBV(index-1) && preciosEmpresa[index-2]['close'] < preciosEmpresa[index-1]['close'] ){
                      console.log(true);
                      boolCondicion = true;
                    }else{
                      console.log(false);
                      boolCondicion = false;
                    }

                    function OBV(obvIndex){
                      if(obvIndex == (index-1) - (req.body.sistema.periodo-1)){
                        return preciosEmpresa[obvIndex]['volume'];
                      }else{
                        if(preciosEmpresa[obvIndex]['close']>preciosEmpresa[obvIndex-1]['close']){
                          return OBV(obvIndex-1) + preciosEmpresa[obvIndex]['volume'];
                        } else if(preciosEmpresa[obvIndex]['close']<preciosEmpresa[obvIndex-1]['close']){
                          return OBV(obvIndex-1) - preciosEmpresa[obvIndex]['volume'];
                        } else{
                          return OBV(obvIndex-1);
                        }

                      }
                    }

                  break;
                case 'volumes':

                    console.log('Indicador VOLUMES: ' + VOLUMES(index-1) + ' compra');

                    function VOLUMES(volumesIndex){
                      if(preciosEmpresa[volumesIndex]['volume']>preciosEmpresa[volumesIndex-1]['volume']){
                        return true;
                      }else{
                        return false;
                      }
                    }

                    if(VOLUMES(index-1)==true){
                      console.log(true);
                      boolCondicion =  true;
                    } else {
                      console.log(false);
                      boolCondicion =  false;
                    }
                  break;
                case 'marketfi':

                    console.log('Indicador MFI: ' + MarketFI(index-1) ); //Editado cambiar accelerator oscillator por Market Facilitation Index

                    if(MarketFI(index-1)>0 && MarketFI(index-1) > MarketFI(index-req.body.sistema.periodo) && preciosEmpresa[index-1]['close'] > preciosEmpresa[index-req.body.sistema.periodo]['close'] ){
                      console.log(true);
                      boolCondicion = true;
                    } else {
                      console.log(false);
                      boolCondicion = false;
                    }

                    function MarketFI(mfiIndex){
                      return (preciosEmpresa[mfiIndex]['higher'] - preciosEmpresa[mfiIndex]['lower']) / preciosEmpresa[mfiIndex]['volume'];
                    }

                    break;

              }
            })



          } else {
            precioMaximo = Math.max(preciosEmpresa[index]['higher'],preciosEmpresa[index-1]['higher']);
            precioMinimo = Math.min(preciosEmpresa[index]['lower'],preciosEmpresa[index-1]['lower']);
          }

          if(boolCondicion == true && boolOperacionExitosa == true ){

                 if( value['higher'] >= (openInicioOperacion * (1 + (req.body.sistema.rendimiento/100))) ){

                    boolOperacionExitosa = false;
                    opExitosas++;

                 } else if( value['lower'] <= (openInicioOperacion * (1-((-1*Math.abs(req.body.sistema.stoploss))/100))) ){

                    boolOperacionExitosa = false;
                    opFallidas++;
                 } else if (contadorDiasEnOperacion == req.body.sistema.periodo){
                    opFallidas++;
                 }


              sumatoriaDiasEnOperacion++;
          }


          if(contadorDiasEnOperacion == req.body.sistema.periodo){
            contadorDeOperacionesRealizadas--;
            precioMinimoOperacion = precioMinimoOperacion + precioMinimo;
            precioMaximoOperacion = precioMaximoOperacion + precioMaximo;
          }
          contadorDiasEnOperacion++;
        }


      });

      opRealizadas = opFallidas + opExitosas;
      probabilidadExito = (opExitosas/opRealizadas)*100;
      promTiempoOperacion = Math.trunc(sumatoriaDiasEnOperacion/opRealizadas);
      usabilidad = (opRealizadas/opMaximas)*100;
      promMaximoPrecio = precioMaximoOperacion/opRealizadas;
      promMinimoPrecio = precioMinimoOperacion/opRealizadas;

      if(opRealizadas == 0){
         probabilidadExito = 0; promTiempoOperacion = 0;
         promMinimoPrecio = 0;
         promMaximoPrecio = 0
        };

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

      let empresa = {nombre: value['simbolo'], opFallidas: opFallidas, opExitosas: opExitosas, opRealizadas: opRealizadas, opMaximas: opMaximas, probabilidadExito: probabilidadExito, sumatoriaDiasEnOperacion: sumatoriaDiasEnOperacion, promTiempoOperacion: promTiempoOperacion, usabilidad: usabilidad, promMaximoPrecio: promMaximoPrecio, promMinimoPrecio: promMinimoPrecio};
      listaComparacionEmpresas.push(empresa);
    })


    //Calcula la empresa ganadora ...
    var empresaGanadora;
    listaComparacionEmpresas.forEach(function (value,index){
      if(index == 0){
        empresaGanadora = value;
      } else {
        if((value['usabilidad'] > empresaGanadora['usabilidad'] && value['probabilidadExito']>empresaGanadora['probabilidadExito']) || ( value['probabilidadExito']>empresaGanadora['probabilidadExito'] && value['usabilidad'] >= empresaGanadora['usabilidad'])  ){
          empresaGanadora = value;
        }
      }


    })

    // Llena la tabla de comparacion
    if(!procedeBacktesting){
      res.json({status: false, message: 'Su rango de operacion supera la cantidad de dias ente el inicio y el final del backtesting. SOLUCION: modifique las fechas de inicio o finalizacion considerando que sábados, domingos y dias festivos no se toman en cuenta, o disminuya su rango de operacion'});
      return;
    }else{
      res.json({status: true, message: 'Backtesting finalizado', empresa: empresaGanadora});

    }


    console.log(empresaGanadora);
    console.log(listaComparacionEmpresas[0]);
  })
  .catch(err => {
    console.log('No se pudo consultar la coleccion empresas: '+ err);
  });

}






controller.backtestingTA = (money, time, rendimiento,userId) => {


  if(money >= 300 && money<=590 && time>=2 && time <=7){  // Perfil 1
    console.log('Perfil 1');
    /////////////////////////////////////////////////////////////////////////////////
    Empresas.find().then(todasLasEmpresas => {

      contadorIndex = 0;
      empresaSeleccionada=0;
      empresaOpExitosas = 0;
      empresaAnterior = 0;

      todasLasEmpresas.forEach(function (value, index){

        // Selecciona empresa
        if(value.precios[0].close < money){
          exitosas(value, time, rendimiento);


          if(empresaAnterior==0){
            empresaSeleccionada = value;
            empresaAnterior = value;
          }else{
            if(exitosas(value,time,rendimiento) > exitosas(empresaAnterior,time,rendimiento)){
              empresaSeleccionada = value;
              empresaOpExitosas = exitosas(value,time,rendimiento);
              empresaAnterior = value;
            } else if(exitosas(value,time,rendimiento) == exitosas(empresaAnterior,time,rendimiento)){
              if(value.precios[0]['close'] < empresaAnterior.precios[0]['close']){
                empresaSeleccionada = value;
                empresaOpExitosas = exitosas(value,time,rendimiento);
                empresaAnterior = value;
              } else {
                empresaSeleccionada = empresaAnterior;
                empresaOpExitosas = exitosas(empresaAnterior,time,rendimiento);
                empresaAnterior=value;
              }
            }
          }


        }
      });
      console.log(empresaSeleccionada['simbolo'] + ' ' + empresaOpExitosas);
      stoploss = stoploss1(empresaSeleccionada, time, rendimiento);
      sistema = sistemaP1(empresaSeleccionada,time,rendimiento);
      guardaSistema(stoploss, empresaSeleccionada['simbolo'],sistema['indicador'],sistema['parametros'],userId);



    }).catch(err => {
      console.log(err);
    })
    /////////////////////////////////////////////////////////////////////////////////
  }
  else if(money >= 300 && money<=590 && time>=8 && time <=30){ //Perfil 2
    console.log('Perfil 2');
    /////////////////////////////////////////////////////////////////////////////////
    Empresas.find().then(todasLasEmpresas => {

          contadorIndex = 0;
          empresaSeleccionada=0;
          empresaOpExitosas = 0;
          empresaAnterior = 0;

          todasLasEmpresas.forEach(function (value, index){

            // Selecciona empresa
            if(value.precios[0].close < money){
              exitosas(value, time, rendimiento);


              if(empresaAnterior==0){
                empresaSeleccionada = value;
                empresaAnterior = value;
              }else{
                if(exitosas(value,time,rendimiento) > exitosas(empresaAnterior,time,rendimiento)){
                  empresaSeleccionada = value;
                  empresaOpExitosas = exitosas(value,time,rendimiento);
                  empresaAnterior = value;
                } else if(exitosas(value,time,rendimiento) == exitosas(empresaAnterior,time,rendimiento)){
                  if(value.precios[0]['close'] < empresaAnterior.precios[0]['close']){
                    empresaSeleccionada = value;
                    empresaOpExitosas = exitosas(value,time,rendimiento);
                    empresaAnterior = value;
                  } else {
                    empresaSeleccionada = empresaAnterior;
                    empresaOpExitosas = exitosas(empresaAnterior,time,rendimiento);
                    empresaAnterior=value;
                  }
                }
              }


            }
          });
          console.log(empresaSeleccionada['simbolo'] + ' ' + empresaOpExitosas);
          stoploss = stoploss2(empresaSeleccionada, time, rendimiento);
          sistema = sistemaP2(empresaSeleccionada,time,rendimiento);
          //console.log(sistema['predicExitosas'])
          guardaSistema(stoploss, empresaSeleccionada['simbolo'],sistema['indicador'],sistema['parametros'],userId);



    }).catch(err => {
      console.log(err);
    })
    /////////////////////////////////////////////////////////////////////////////////
  }
  else if(money >= 300 && money<=590 && time>=31 && time <=90){ //Perfil 3
    console.log('Perfil 3');
    /////////////////////////////////////////////////////////////////////////////////
    Empresas.find().then(todasLasEmpresas => {

      contadorIndex = 0;
      empresaSeleccionada=0;
      empresaOpExitosas = 0;
      empresaAnterior = 0;

      todasLasEmpresas.forEach(function (value, index){

        // Selecciona empresa
        if(value.precios[0].close < money){
          exitosas(value, time, rendimiento);


          if(empresaAnterior==0){
            empresaSeleccionada = value;
            empresaAnterior = value;
          }else{
            if(exitosas(value,time,rendimiento) > exitosas(empresaAnterior,time,rendimiento)){
              empresaSeleccionada = value;
              empresaOpExitosas = exitosas(value,time,rendimiento);
              empresaAnterior = value;
            } else if(exitosas(value,time,rendimiento) == exitosas(empresaAnterior,time,rendimiento)){
              if(value.precios[0]['close'] < empresaAnterior.precios[0]['close']){
                empresaSeleccionada = value;
                empresaOpExitosas = exitosas(value,time,rendimiento);
                empresaAnterior = value;
              } else {
                empresaSeleccionada = empresaAnterior;
                empresaOpExitosas = exitosas(empresaAnterior,time,rendimiento);
                empresaAnterior=value;
              }
            }
          }


        }
      });
      console.log(empresaSeleccionada['simbolo'] + ' ' + empresaOpExitosas);
      stoploss = stoploss2(empresaSeleccionada, time, rendimiento);
      sistema = sistemaP3(empresaSeleccionada,time,rendimiento);
      //console.log(sistema['predicExitosas'])
      guardaSistema(stoploss, empresaSeleccionada['simbolo'],sistema['indicador'],sistema['parametros'],userId);



    }).catch(err => {
    console.log(err);
    })
    /////////////////////////////////////////////////////////////////////////////////
  }
  else if(money >= 591 && money<=1000 && time>=2 && time <=7){ //Perfil 4
    console.log('Perfil 4');
    /////////////////////////////////////////////////////////////////////////////////
    Empresas.find().then(todasLasEmpresas => {

      contadorIndex = 0;
      empresaSeleccionada=0;
      empresaOpExitosas = 0;
      empresaAnterior = 0;

      todasLasEmpresas.forEach(function (value, index){

        // Selecciona empresa
        if(value.precios[0].close < money){
          exitosas(value, time, rendimiento);


          if(empresaAnterior==0){
            empresaSeleccionada = value;
            empresaAnterior = value;
          }else{
            if(exitosas(value,time,rendimiento) > exitosas(empresaAnterior,time,rendimiento)){
              empresaSeleccionada = value;
              empresaOpExitosas = exitosas(value,time,rendimiento);
              empresaAnterior = value;
            } else if(exitosas(value,time,rendimiento) == exitosas(empresaAnterior,time,rendimiento)){
              if(value.precios[0]['close'] < empresaAnterior.precios[0]['close']){
                empresaSeleccionada = value;
                empresaOpExitosas = exitosas(value,time,rendimiento);
                empresaAnterior = value;
              } else {
                empresaSeleccionada = empresaAnterior;
                empresaOpExitosas = exitosas(empresaAnterior,time,rendimiento);
                empresaAnterior=value;
              }
            }
          }


        }
      });
      console.log(empresaSeleccionada['simbolo'] + ' ' + empresaOpExitosas);
      stoploss = stoploss2(empresaSeleccionada, time, rendimiento);
      sistema = sistemaP4(empresaSeleccionada,time,rendimiento);
      //console.log(sistema['predicExitosas'])
      guardaSistema(stoploss, empresaSeleccionada['simbolo'],sistema['indicador'],sistema['parametros'],userId);



    }).catch(err => {
    console.log(err);
    })
    /////////////////////////////////////////////////////////////////////////////////
  }
  else if(money >= 591 && money<=1000 && time>=8 && time <=30){ //Perfil 5
    console.log('Perfil 5');
    /////////////////////////////////////////////////////////////////////////////////
    Empresas.find().then(todasLasEmpresas => {

      contadorIndex = 0;
      empresaSeleccionada=0;
      empresaOpExitosas = 0;
      empresaAnterior = 0;

      todasLasEmpresas.forEach(function (value, index){

        // Selecciona empresa
        if(value.precios[0].close < money){
          exitosas(value, time, rendimiento);


          if(empresaAnterior==0){
            empresaSeleccionada = value;
            empresaAnterior = value;
          }else{
            if(exitosas(value,time,rendimiento) > exitosas(empresaAnterior,time,rendimiento)){
              empresaSeleccionada = value;
              empresaOpExitosas = exitosas(value,time,rendimiento);
              empresaAnterior = value;
            } else if(exitosas(value,time,rendimiento) == exitosas(empresaAnterior,time,rendimiento)){
              if(value.precios[0]['close'] < empresaAnterior.precios[0]['close']){
                empresaSeleccionada = value;
                empresaOpExitosas = exitosas(value,time,rendimiento);
                empresaAnterior = value;
              } else {
                empresaSeleccionada = empresaAnterior;
                empresaOpExitosas = exitosas(empresaAnterior,time,rendimiento);
                empresaAnterior=value;
              }
            }
          }


        }
      });
      console.log(empresaSeleccionada['simbolo'] + ' ' + empresaOpExitosas);
      stoploss = stoploss2(empresaSeleccionada, time, rendimiento);
      sistema = sistemaP5(empresaSeleccionada,time,rendimiento);
      //console.log(sistema['predicExitosas'])
      guardaSistema(stoploss, empresaSeleccionada['simbolo'],sistema['indicador'],sistema['parametros'],userId);



    }).catch(err => {
    console.log(err);
    })
    /////////////////////////////////////////////////////////////////////////////////
  }
  else if(money >= 591 && money<=1000 && time>=31 && time <=90){ //Perfil 6
    console.log('Perfil 6');
    /////////////////////////////////////////////////////////////////////////////////
    Empresas.find().then(todasLasEmpresas => {

      contadorIndex = 0;
      empresaSeleccionada=0;
      empresaOpExitosas = 0;
      empresaAnterior = 0;

      todasLasEmpresas.forEach(function (value, index){

        // Selecciona empresa
        if(value.precios[0].close < money){
          exitosas(value, time, rendimiento);
          if(empresaAnterior==0){
            empresaSeleccionada = value;
            empresaAnterior = value;
          }else{
            if(exitosas(value,time,rendimiento) > exitosas(empresaAnterior,time,rendimiento)){
              empresaSeleccionada = value;
              empresaOpExitosas = exitosas(value,time,rendimiento);
              empresaAnterior = value;
            } else if(exitosas(value,time,rendimiento) == exitosas(empresaAnterior,time,rendimiento)){
              if(value.precios[0]['close'] < empresaAnterior.precios[0]['close']){
                empresaSeleccionada = value;
                empresaOpExitosas = exitosas(value,time,rendimiento);
                empresaAnterior = value;
              } else {
                empresaSeleccionada = empresaAnterior;
                empresaOpExitosas = exitosas(empresaAnterior,time,rendimiento);
                empresaAnterior=value;
              }
            }
          }
        }
      });
      console.log(empresaSeleccionada['simbolo'] + ' ' + empresaOpExitosas);
      stoploss = stoploss2(empresaSeleccionada, time, rendimiento);
      sistema = sistemaP6(empresaSeleccionada,time,rendimiento);
      //console.log(sistema['predicExitosas'])
      guardaSistema(stoploss, empresaSeleccionada['simbolo'],sistema['indicador'],sistema['parametros'],userId);

    }).catch(err => {
    console.log(err);
    })
    /////////////////////////////////////////////////////////////////////////////////
  }
  else if(money >= 1001 && time>=2 && time <=7){ //Perfil 7
    console.log('Perfil 7');
    /////////////////////////////////////////////////////////////////////////////////
    Empresas.find().then(todasLasEmpresas => {

      contadorIndex = 0;
      empresaSeleccionada=0;
      empresaOpExitosas = 0;
      empresaAnterior = 0;

      todasLasEmpresas.forEach(function (value, index){

        // Selecciona empresa
        if(value.precios[0].close < money){
          exitosas(value, time, rendimiento);
          if(empresaAnterior==0){
            empresaSeleccionada = value;
            empresaAnterior = value;
          }else{
            if(exitosas(value,time,rendimiento) > exitosas(empresaAnterior,time,rendimiento)){
              empresaSeleccionada = value;
              empresaOpExitosas = exitosas(value,time,rendimiento);
              empresaAnterior = value;
            } else if(exitosas(value,time,rendimiento) == exitosas(empresaAnterior,time,rendimiento)){
              if(value.precios[0]['close'] < empresaAnterior.precios[0]['close']){
                empresaSeleccionada = value;
                empresaOpExitosas = exitosas(value,time,rendimiento);
                empresaAnterior = value;
              } else {
                empresaSeleccionada = empresaAnterior;
                empresaOpExitosas = exitosas(empresaAnterior,time,rendimiento);
                empresaAnterior=value;
              }
            }
          }
        }
      });
      console.log(empresaSeleccionada['simbolo'] + ' ' + empresaOpExitosas);
      stoploss = stoploss3(rendimiento);
      sistema = sistemaP7(empresaSeleccionada,time,rendimiento);
      //console.log(sistema['predicExitosas'])
      guardaSistema(stoploss, empresaSeleccionada['simbolo'],sistema['indicador'],sistema['parametros'],userId);

    }).catch(err => {
    console.log(err);
    })
    /////////////////////////////////////////////////////////////////////////////////
  }
  else if(money >= 1001 && time>=8 && time <=30){ //Perfil 8
    console.log('Perfil 8');
    /////////////////////////////////////////////////////////////////////////////////
    Empresas.find().then(todasLasEmpresas => {

      contadorIndex = 0;
      empresaSeleccionada=0;
      empresaOpExitosas = 0;
      empresaAnterior = 0;

      todasLasEmpresas.forEach(function (value, index){

        // Selecciona empresa
        if(value.precios[0].close < money){
          exitosas(value, time, rendimiento);
          if(empresaAnterior==0){
            empresaSeleccionada = value;
            empresaAnterior = value;
          }else{
            if(exitosas(value,time,rendimiento) > exitosas(empresaAnterior,time,rendimiento)){
              empresaSeleccionada = value;
              empresaOpExitosas = exitosas(value,time,rendimiento);
              empresaAnterior = value;
            } else if(exitosas(value,time,rendimiento) == exitosas(empresaAnterior,time,rendimiento)){
              if(value.precios[0]['close'] < empresaAnterior.precios[0]['close']){
                empresaSeleccionada = value;
                empresaOpExitosas = exitosas(value,time,rendimiento);
                empresaAnterior = value;
              } else {
                empresaSeleccionada = empresaAnterior;
                empresaOpExitosas = exitosas(empresaAnterior,time,rendimiento);
                empresaAnterior=value;
              }
            }
          }
        }
      });
      console.log(empresaSeleccionada['simbolo'] + ' ' + empresaOpExitosas);
      stoploss = stoploss3(rendimiento);
      sistema = sistemaP8(empresaSeleccionada,time,rendimiento);
      //console.log(sistema['predicExitosas'])
      guardaSistema(stoploss, empresaSeleccionada['simbolo'],sistema['indicador'],sistema['parametros'],userId);

    }).catch(err => {
    console.log(err);
    })
    /////////////////////////////////////////////////////////////////////////////////
  }
  else if(money >= 1001 && time>=31 && time <=90){ //Perfil 9
    console.log('Perfil 9');
        /////////////////////////////////////////////////////////////////////////////////
        Empresas.find().then(todasLasEmpresas => {

          contadorIndex = 0;
          empresaSeleccionada=0;
          empresaOpExitosas = 0;
          empresaAnterior = 0;

          todasLasEmpresas.forEach(function (value, index){

            // Selecciona empresa
            if(value.precios[0].close < (money*0.56)){
              exitosasP9(value, time, rendimiento);
              if(empresaAnterior==0){
                empresaSeleccionada = value;
                empresaAnterior = value;
              }else{
                if(exitosasP9(value,time,rendimiento) > exitosasP9(empresaAnterior,time,rendimiento)){
                  empresaSeleccionada = value;
                  empresaOpExitosas = exitosasP9(value,time,rendimiento);
                  empresaAnterior = value;
                } else if(exitosasP9(value,time,rendimiento) == exitosasP9(empresaAnterior,time,rendimiento)){
                  if(value.precios[0]['close'] < empresaAnterior.precios[0]['close']){
                    empresaSeleccionada = value;
                    empresaOpExitosas = exitosasP9(value,time,rendimiento);
                    empresaAnterior = value;
                  } else {
                    empresaSeleccionada = empresaAnterior;
                    empresaOpExitosas = exitosasP9(empresaAnterior,time,rendimiento);
                    empresaAnterior=value;
                  }
                }
              }
            }
          });
          console.log(empresaSeleccionada['simbolo'] + ' ' + empresaOpExitosas);
          stoploss = stoploss3(rendimiento);
          sistema = sistemaP9(empresaSeleccionada,time,rendimiento);
          //console.log(sistema['predicExitosas'])
          guardaSistema(stoploss, empresaSeleccionada['simbolo'],sistema['indicador'],sistema['parametros'],userId);

        }).catch(err => {
        console.log(err);
        })
        /////////////////////////////////////////////////////////////////////////////////
  }
}

controller.calcularPrecioSoporte = (listadoPrecios,periodo) => {
  auxLow = listadoPrecios[0]['lower'];
  for(let i = 0; i<periodo;i++){
    if(auxLow>listadoPrecios[i+1]['lower'])
    auxLow=listadoPrecios[i+1]['lower']
  }
  return auxLow
}


function exitosas(empresa, time, rendimiento){
  listadoPrecios =  empresa['precios'];
  listadoPrecios.reverse();
  opExitosas = 0;
  contadorDias = 0;
  enOperacion = true;
  primerPrecio = 0;
  stop=false;

  listadoPrecios.forEach(function (value,index){
    contadorDias++;
    if(contadorDias > time){contadorDias = 1; stop=false;}
    if(contadorDias == 1){
      if(listadoPrecios[index+(time-1)]!==undefined){
        primerPrecio = value['open'];
        if(value['higher'] > primerPrecio * (1+(rendimiento/100)) && stop!=true){
          opExitosas++;
          stop=true;
        }
      }
      else {
        enOperacion = false;
        return;
      }
    }
    else{
      if(enOperacion==true){
        if(value['higher'] > primerPrecio * (1+(rendimiento/100)) && stop!=true){
          opExitosas++;
          stop=true;
        }
      }
    }


  });

  return opExitosas;
}
function exitosasP9(empresa, time, rendimiento){
  listadoPrecios =  empresa['precios'].slice(0,501);
  listadoPrecios.reverse();
  opExitosas = 0;
  contadorDias = 0;
  enOperacion = true;
  primerPrecio = 0;
  stop=false;

  listadoPrecios.forEach(function (value,index){
    contadorDias++;
    if(contadorDias > time){contadorDias = 1; stop=false;}
    if(contadorDias == 1){
      if(listadoPrecios[index+(time-1)]!==undefined){
        primerPrecio = value['open'];
        if(value['higher'] > primerPrecio * (1+(rendimiento/100)) && stop!=true){
          opExitosas++;
          stop=true;
        }
      }
      else {
        enOperacion = false;
        return;
      }
    }
    else{
      if(enOperacion==true){
        if(value['higher'] > primerPrecio * (1+(rendimiento/100)) && stop!=true){
          opExitosas++;
          stop=true;
        }
      }
    }


  });

  return opExitosas;
}
function stoploss1(empresa, time, rendimiento){
  listadoPrecios =  empresa['precios'];
  listadoPrecios.reverse();
  opExitosas = 0;
  contadorDias = 0;
  enOperacion = true;
  primerPrecio = 0;
  stop=false;
  promedio=0;

  listadoPrecios.forEach(function (value,index){
    contadorDias++;
    if(contadorDias > time){contadorDias = 1; stop=false;}
    if(contadorDias == 1 ){
      if(listadoPrecios[index+(time-1)]!==undefined){
        primerPrecio = value['open'];
        if(value['higher'] > primerPrecio * (1+(rendimiento/100)) && stop!=true){
          opExitosas++;
          stop=true;
          promedio = promedio + (value['lower'] - primerPrecio)/primerPrecio;
        }
      }
      else {
        enOperacion = false;
        return;
      }
    }
    else{
      if(enOperacion==true){
        if(value['higher'] >= primerPrecio * (1+(rendimiento/100)) && stop!=true){
          opExitosas++;
          stop=true;
          promedio = promedio + (value['lower'] - primerPrecio)/primerPrecio;
        }
      }
    }


  });

  promedio = promedio/opExitosas;
  return promedio;
}
function stoploss2(empresa, time, rendimiento){
  listadoPrecios =  empresa['precios'];
  precioMinimo = listadoPrecios[0]['lower'];
  stoploss = (listadoPrecios[0]['lower'] - listadoPrecios[0]['open'])/listadoPrecios[0]['open'];
  for (let index = 1; index < time; index++) {
    if(listadoPrecios[index]['lower']<precioMinimo){
      precioMinimo=listadoPrecios[index]['lower']
      stoploss = (listadoPrecios[index]['lower'] - listadoPrecios[index]['open'])/listadoPrecios[index]['open'];
    }
  }
  return stoploss
}
function stoploss3(rendimiento){
  return ((rendimiento/5)/100)*-1;
}

function sistemaP1(empresa,time,rendimiento){
  sistema = [
    ama= AMAauto(empresa,time,rendimiento),
    envelopes= ENVELOPESauto(empresa,time,rendimiento),
    sma= SMAauto(empresa,time,rendimiento)
  ]

  contExitosas = sistema[0]['predicExitosas']
  sistemaSeleccionado = sistema[0];
  sistema.forEach(function(indicador,index){
    if(index > 0 && indicador['predicExitosas'] > contExitosas){
      sistemaSeleccionado=indicador;
    }
  })

  return sistemaSeleccionado;
}
function sistemaP2(empresa,time,rendimiento){
  sistema = [
    ama= AMAauto(empresa,time,rendimiento),
    envelopes= ENVELOPESauto(empresa,time,rendimiento),
    sma= SMAauto(empresa,time,rendimiento),
    atr= ATRauto(empresa,time,rendimiento)
  ]

  contExitosas = sistema[0]['predicExitosas']
  sistemaSeleccionado = sistema[0];
  sistema.forEach(function(indicador,index){
    console.log(indicador['predicExitosas'])
    if(index > 0 && indicador['predicExitosas'] > contExitosas){
      sistemaSeleccionado=indicador;
      contExitosas = indicador['predicExitosas']
    }
  })

  console.log('ganadora: ' + sistemaSeleccionado['predicExitosas'])
  return sistemaSeleccionado;
}
function sistemaP3(empresa,time,rendimiento){
  sistema = [
    ama= AMAauto(empresa,time,rendimiento),
    envelopes= ENVELOPESauto(empresa,time,rendimiento),
    sma= SMAauto(empresa,time,rendimiento),
    atr= ATRauto(empresa,time,rendimiento),
    bears = BEARSauto(empresa,time,rendimiento),
    bulls = BULLSauto(empresa,time,rendimiento)
  ]

  contExitosas = sistema[0]['predicExitosas']
  sistemaSeleccionado = sistema[0];
  sistema.forEach(function(indicador,index){
    console.log(indicador['predicExitosas'])
    if(index > 0 && indicador['predicExitosas'] > contExitosas){
      sistemaSeleccionado=indicador;
      contExitosas = indicador['predicExitosas']
    }
  })

  console.log('ganadora: ' + sistemaSeleccionado['predicExitosas'])
  return sistemaSeleccionado;
}
function sistemaP4(empresa,time,rendimiento){
  sistema = [
    ama= AMAauto(empresa,time,rendimiento),
    envelopes= ENVELOPESauto(empresa,time,rendimiento),
    sma= SMAauto(empresa,time,rendimiento),
    atr= ATRauto(empresa,time,rendimiento),
    bears = BEARSauto(empresa,time,rendimiento),
    bulls = BULLSauto(empresa,time,rendimiento),
    ema = EMAauto(empresa,time,rendimiento),
    macd = MACDauto(empresa,time,rendimiento)
  ]

  contExitosas = sistema[0]['predicExitosas']
  sistemaSeleccionado = sistema[0];
  sistema.forEach(function(indicador,index){
    console.log(indicador['predicExitosas'])
    if(index > 0 && indicador['predicExitosas'] > contExitosas){
      sistemaSeleccionado=indicador;
      contExitosas = indicador['predicExitosas']
    }
  })

  console.log('ganadora: ' + sistemaSeleccionado['predicExitosas'])
  return sistemaSeleccionado;
}
function sistemaP5(empresa,time,rendimiento){
  sistema = [
    ama= AMAauto(empresa,time,rendimiento),
    envelopes= ENVELOPESauto(empresa,time,rendimiento),
    sma= SMAauto(empresa,time,rendimiento),
    atr= ATRauto(empresa,time,rendimiento),
    bears = BEARSauto(empresa,time,rendimiento),
    bulls = BULLSauto(empresa,time,rendimiento),
    ema = EMAauto(empresa,time,rendimiento),
    macd = MACDauto(empresa,time,rendimiento),
    momentum = MOMENTUMauto(empresa,time,rendimiento),
    osma = OSMAauto(empresa,time,rendimiento)
  ]

  contExitosas = sistema[0]['predicExitosas']
  sistemaSeleccionado = sistema[0];
  sistema.forEach(function(indicador,index){
    console.log(indicador['predicExitosas'])
    if(index > 0 && indicador['predicExitosas'] > contExitosas){
      sistemaSeleccionado=indicador;
      contExitosas = indicador['predicExitosas']
    }
  })

  console.log('ganadora: ' + sistemaSeleccionado['predicExitosas'])
  return sistemaSeleccionado;
}
function sistemaP6(empresa,time,rendimiento){
  sistema = [
    ama= AMAauto(empresa,time,rendimiento),
    envelopes= ENVELOPESauto(empresa,time,rendimiento),
    sma= SMAauto(empresa,time,rendimiento),
    atr= ATRauto(empresa,time,rendimiento),
    bears = BEARSauto(empresa,time,rendimiento),
    bulls = BULLSauto(empresa,time,rendimiento),
    ema = EMAauto(empresa,time,rendimiento),
    macd = MACDauto(empresa,time,rendimiento),
    momentum = MOMENTUMauto(empresa,time,rendimiento),
    osma = OSMAauto(empresa,time,rendimiento)
  ]

  contExitosas = sistema[0]['predicExitosas']
  sistemaSeleccionado = sistema[0];
  sistema.forEach(function(indicador,index){
    console.log(indicador['predicExitosas'])
    if(index > 0 && indicador['predicExitosas'] > contExitosas){
      sistemaSeleccionado=indicador;
      contExitosas = indicador['predicExitosas']
    }
  })

  console.log('ganadora: ' + sistemaSeleccionado['predicExitosas'])
  return sistemaSeleccionado;
}
function sistemaP7(empresa,time,rendimiento){
  sistema = [
    ama= AMAauto(empresa,time,rendimiento),
    envelopes= ENVELOPESauto(empresa,time,rendimiento),
    sma= SMAauto(empresa,time,rendimiento),
    atr= ATRauto(empresa,time,rendimiento),
    bears = BEARSauto(empresa,time,rendimiento),
    bulls = BULLSauto(empresa,time,rendimiento),
    ema = EMAauto(empresa,time,rendimiento),
    macd = MACDauto(empresa,time,rendimiento),
    momentum = MOMENTUMauto(empresa,time,rendimiento),
    osma = OSMAauto(empresa,time,rendimiento),
    ad = ADauto(empresa,time,rendimiento),
    mfi = MFIauto(empresa,time,rendimiento)
  ]

  contExitosas = sistema[0]['predicExitosas']
  sistemaSeleccionado = sistema[0];
  sistema.forEach(function(indicador,index){
    console.log(indicador['predicExitosas'])
    if(index > 0 && indicador['predicExitosas'] > contExitosas){
      sistemaSeleccionado=indicador;
      contExitosas = indicador['predicExitosas']
    }
  })

  console.log('ganadora: ' + sistemaSeleccionado['predicExitosas'])
  return sistemaSeleccionado;
}
function sistemaP8(empresa,time,rendimiento){
  sistema = [
    ama= AMAauto(empresa,time,rendimiento),
    envelopes= ENVELOPESauto(empresa,time,rendimiento),
    sma= SMAauto(empresa,time,rendimiento),
    atr= ATRauto(empresa,time,rendimiento),
    bears = BEARSauto(empresa,time,rendimiento),
    bulls = BULLSauto(empresa,time,rendimiento),
    ema = EMAauto(empresa,time,rendimiento),
    macd = MACDauto(empresa,time,rendimiento),
    momentum = MOMENTUMauto(empresa,time,rendimiento),
    osma = OSMAauto(empresa,time,rendimiento),
    ad = ADauto(empresa,time,rendimiento),
    mfi = MFIauto(empresa,time,rendimiento),
    obv = OBVauto(empresa,time,rendimiento)
  ]

  contExitosas = sistema[0]['predicExitosas']
  sistemaSeleccionado = sistema[0];
  sistema.forEach(function(indicador,index){
    console.log(indicador['predicExitosas'])
    if(index > 0 && indicador['predicExitosas'] > contExitosas){
      sistemaSeleccionado=indicador;
      contExitosas = indicador['predicExitosas']
    }
  })

  console.log('ganadora: ' + sistemaSeleccionado['predicExitosas'])
  return sistemaSeleccionado;
}
function sistemaP9(empresa,time,rendimiento){
  sistema = [
    ama= AMAauto(empresa,time,rendimiento),
    envelopes= ENVELOPESauto(empresa,time,rendimiento),
    sma= SMAauto(empresa,time,rendimiento),
    atr= ATRauto(empresa,time,rendimiento),
    bears = BEARSauto(empresa,time,rendimiento),
    bulls = BULLSauto(empresa,time,rendimiento),
    ema = EMAauto(empresa,time,rendimiento),
    macd = MACDauto(empresa,time,rendimiento),
    momentum = MOMENTUMauto(empresa,time,rendimiento),
    osma = OSMAauto(empresa,time,rendimiento),
    ad = ADauto(empresa,time,rendimiento),
    mfi = MFIauto(empresa,time,rendimiento),
    obv = OBVauto(empresa,time,rendimiento),
    volumes = VOLUMESauto(empresa,time,rendimiento),
    marketfi = MARKETFIauto(empresa,time,rendimiento)
  ]

  contExitosas = sistema[0]['predicExitosas']
  sistemaSeleccionado = sistema[0];
  sistema.forEach(function(indicador,index){
    console.log(indicador['indicador'] + "-------> "+indicador['predicExitosas'])
    if(index > 0 && indicador['predicExitosas'] > contExitosas){
      sistemaSeleccionado=indicador;
      contExitosas = indicador['predicExitosas']
    }
  })

  console.log('ganadora: ' + sistemaSeleccionado)
  return sistemaSeleccionado;
}

//Indicadores  opExitosas, parametro, simbolo
function AMAauto(empresa,time,rendimiento){
  Exitosas = 0;
  indicador = 'Adaptative Moving Average'+'| periodo:'+time;



  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();

    contadorDias = 0;
    enOperacion = false;
    primerPrecio = 0;
    precioObjetivo=0;
    listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){
            ama = AMA(index-1, time);
            if(ama > AMA((index-1)-time, time) && ((value['open']>ama && value['close']<ama) || (value['open']<ama && value['close']>ama) || (value['open']>ama && value['close']>ama && value['lower']<ama) || (value['open']>ama && value['close']>ama && value['lower']>ama))  ){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));

            }

          }

        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){

        Exitosas++;
        enOperacion= false;

      }
      function AMA(amaIndex, periodo){
        // calcula ER efitience ratio

        let cambio = Math.abs(listadoPrecios[amaIndex]['close'] - listadoPrecios[amaIndex-periodo]['close']);
        let volatilidad = 0;
        for(let i = amaIndex; i > amaIndex-periodo; i--){
           volatilidad = volatilidad + Math.abs(listadoPrecios[i]['close'] - listadoPrecios[i-1]['close']);
        }
        let ER = cambio/volatilidad;

        // calcula  SC constante de suavizado
        let SC = Math.pow(ER * (2/(2+1) - 2/(30+1)) + 2/(30+1),2);

        // calcula AMA adaptative moving average
        let insideAMA=0;
                        //index-1
        if(amaIndex == (index-1)-periodo){
          sma = SMA(amaIndex,periodo);
          insideAMA = sma + SC * (listadoPrecios[amaIndex]['close'] - sma);
        }
        else{
          backAma = AMA(amaIndex-1, periodo)
          insideAMA = backAma + SC * (listadoPrecios[amaIndex]['close'] - backAma);
        }

        return insideAMA;
      }

      function SMA(smaIndex, periodo){
          var insideSMA = 0;

            for (let i = smaIndex-(periodo-1); i <= smaIndex ; i++){
              insideSMA = insideSMA + listadoPrecios[i]['close'];
            }
            insideSMA = insideSMA/periodo;

          return insideSMA;
      }
    });






  return {predicExitosas: Exitosas, indicador: indicador, parametros: [time]};
}

function ENVELOPESauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time,K: 0};
  indicador = 'Envelopes';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();

  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  const K = 5; // valor por defecto de la desviacion
  for(let K=1;K<=10;K++){
    Exitosas=0;
    listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){

           upp = upperBand(index-1);
           low = lowerBand(index-1);
           ssmmaa = SMA(index-1,time);


           if(lowerBand(index-1) > lowerBand(index-time) && (listadoPrecios[index-1]['close'] < SMA(index-1,time) && listadoPrecios[index-1]['close'] >= lowerBand(index-1) || (listadoPrecios[index-1]['close']) < lowerBand(index-1))){

              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }



          }

        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){

        Exitosas++;
        enOperacion= false;

      }

      function upperBand(upperIndex){

        sma = SMA(upperIndex,time);
        uppBand = sma*(1+K/100);

        return(uppBand);
      }

      function lowerBand(lowerIndex){
        sma = SMA(lowerIndex,time);
        lowBand = sma*(1-K/100);

        return(lowBand);
      }

      function SMA(smaIndex, periodo){
        var insideSMA = 0;

          for (let i = smaIndex-(periodo-1); i <= smaIndex ; i++){
            insideSMA = insideSMA + listadoPrecios[i]['close'];
          }
          insideSMA = insideSMA/periodo;

        return insideSMA;
    }

    });

    if(K==1){
      parametro['K'] = K;
      predicExitosas = Exitosas;


    }else {

      if(Exitosas >= predicExitosas){
        parametro['K']=K;
        predicExitosas = Exitosas;
      }


    }

  }











  indicador = indicador + '| periodo:'+parametro['periodo'] + ' / K:' + parametro['K'];
  return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo'],parametro['K']]};
}

function SMAauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time};
  indicador = 'Simple Moving Average';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();

  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){
            if(SMA(index-1,time) > SMA(index-time,time) && ((listadoPrecios[index-1]['open']>SMA(index-1,time) && listadoPrecios[index-1]['close']<SMA(index-1,time)) || (listadoPrecios[index-1]['open']<SMA(index-1,time) && listadoPrecios[index-1]['close']>SMA(index-1,time)) || (listadoPrecios[index-1]['open']>SMA(index-1,time) && listadoPrecios[index-1]['close']>SMA(index-1,time)) && listadoPrecios[index-1]['lower']<SMA(index-1,time))){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }





      function SMA(smaIndex, periodo){
        var insideSMA = 0;

          for (let i = smaIndex-(periodo-1); i <= smaIndex ; i++){
            insideSMA = insideSMA + listadoPrecios[i]['close'];
          }
          insideSMA = insideSMA/periodo;

        return insideSMA;
    }

    });
  indicador = indicador + '| periodo:'+parametro['periodo'];
  return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};
}

function ATRauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time}
  indicador = 'Average True Range'

  listadoPrecios = empresa['precios']
  listadoPrecios.reverse()
  contadorDias = 0
  enOperacion = false
  primerPrecio = 0
  precioObjetivo=0
  predicExitosas = 0

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){
            atr = ATR(index-1, time);
            atr = atr/time;
            stopLimit = listadoPrecios[index]['open'] * (1+(rendimiento/100));
            if(listadoPrecios[index-time]['close']<listadoPrecios[index-1]['close'] && (listadoPrecios[index-1]['close']+atr) >= stopLimit ){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function ATR(atrIndex, periodo){
        var bestATR;
        var dif1 = listadoPrecios[atrIndex]['higher'] - listadoPrecios[atrIndex]['lower'];
        var dif2 = listadoPrecios[atrIndex-1]['close'] - listadoPrecios[atrIndex]['higher'];
        var dif3 = listadoPrecios[atrIndex-1]['close'] - listadoPrecios[atrIndex]['lower'];
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

        if(atrIndex == (index-1) - (periodo - 1)){
          return dif1;
        }
        bestATR = bestATR + ATR(atrIndex-1, periodo);

        return bestATR;
      }

    });

  indicador = indicador + '| periodo:'+parametro['periodo'];
  return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};
}

function BEARSauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time};
  indicador = 'Bears';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();
  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){
            bears = BEARS(index-1, time);
            if(BEARS(index-2, time)<0 && bears > 0){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function BEARS(bearsIndex, periodo){
        var insideBears = listadoPrecios[bearsIndex]['lower'] - bearsEMA(bearsIndex, periodo);
        return insideBears;
      }

      function bearsEMA(emaIndex, periodoEma){
        var P = 2/(periodoEma + 1 );
        var bestEMA;
        //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
        if(emaIndex == (index-1) - (periodoEma - 1)){
          return bearsSMA(emaIndex, periodoEma);
        }
        else{
          ema = bearsEMA(emaIndex-1, periodoEma);
          bestEMA = (listadoPrecios[emaIndex]['close'] * P) + (ema * (1 - P));
        }
        return bestEMA;
      }

      function bearsSMA(smaIndex, periodoSma){
        var insideSMA = 0;
        for (let i = smaIndex-(periodoSma-1); i <= smaIndex ; i++){
          insideSMA = insideSMA + listadoPrecios[i]['close'];
        }
        insideSMA = insideSMA/periodoSma;
        return insideSMA;
      }


    });

    indicador = indicador + '| periodo:'+parametro['periodo'];
    return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};
}

function BULLSauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time};
  indicador = 'Bulls';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();
  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){
            bulls = BULLS(index-1, time);
            if(BULLS(index-2, time)<0 && bulls > 0){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function BULLS(bullsIndex, periodo){
        var insideBulls = listadoPrecios[bullsIndex]['higher'] - bullsEMA(bullsIndex, periodo);
        return insideBulls;
      }

      function bullsEMA(emaIndex, periodoEmaBulls){
        var P = 2/(periodoEmaBulls + 1 );
        var bestEMA;
        //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
        if(emaIndex == (index-1) - (periodoEmaBulls - 1)){
          return bullsSMA(emaIndex, periodoEmaBulls);
        }
        else{
          emaBulls = bullsEMA(emaIndex-1, periodoEmaBulls);
          bestEMA = (listadoPrecios[emaIndex]['close'] * P) + (emaBulls * (1 - P));
        }
        return bestEMA;
      }

      function bullsSMA(smaIndex, periodoSmaBulls){
        var insideSMA = 0;
        for (let i = smaIndex-(periodoSmaBulls-1); i <= smaIndex ; i++){
          insideSMA = insideSMA + listadoPrecios[i]['close'];
        }
        insideSMA = insideSMA/periodoSmaBulls;
        return insideSMA;
      }

    });
    indicador = indicador + '| periodo:'+parametro['periodo'];
    return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};

}

function EMAauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time};
  indicador = 'Exponential Moving Average';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();
  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){
            ema = EMA(index-1, time);
            if(value['close']>listadoPrecios[index-time]['close'] && ema > 0){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function EMA(emaIndex,periodo){
        var bestEMA;
        var P = 2/(periodo + 1 );
        //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
        if(emaIndex == (index-1) - (periodo - 1)){
          return SMA(emaIndex,periodo);
        }
        else{
          bestEMA = (listadoPrecios[emaIndex]['close'] * P) + (EMA(emaIndex-1,time) * (1 - P));
        }
        return bestEMA;
      }

      function SMA(smaIndex, periodo){
        var insideSMA = 0;

          for (let i = smaIndex-(periodo-1); i <= smaIndex ; i++){
            insideSMA = insideSMA + listadoPrecios[i]['close'];
          }
          insideSMA = insideSMA/periodo;

        return insideSMA;
    }

    });
    indicador = indicador + '| periodo:'+parametro['periodo'];
    return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};

}

function MACDauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: [26,12,9]};
  indicador = 'Moving Average Convergence Divergence';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();
  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-50] !== undefined){
            macd = EMA12(index-1) - EMA26(index-1);
            if(value['close']>listadoPrecios[index-time]['close'] && macd>0 ){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function EMA12(emaIndex){
        var P=2/13;
        var bestEMA;
        //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
        if(emaIndex == (index-1) - 11){
          bestEMA = SMA12(emaIndex);
        }
        else{
          bestEMA = (listadoPrecios[emaIndex]['close'] * P) + (EMA12(emaIndex-1) * (1 - P));
        }

        return bestEMA;
      }
      function EMA26(emaIndex){
        var P=2/27;
        var bestEMA;
        //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
        if(emaIndex == (index-1) - 25){
          bestEMA = SMA26(emaIndex);
        }
        else{
          bestEMA = (listadoPrecios[emaIndex]['close'] * P) + (EMA26(emaIndex-1) * (1 - P));
        }

        return bestEMA;
      }
      function SMA12(smaIndex){
        var insideSMA = 0;
        for (let i = smaIndex-11; i <= smaIndex ; i++){
          insideSMA = insideSMA + listadoPrecios[i]['close'];
        }
        insideSMA = insideSMA/12;
        return insideSMA;
      }
      function SMA26(smaIndex){
        var insideSMA = 0;
        for (let i = smaIndex-25; i <= smaIndex ; i++){
          insideSMA = insideSMA + listadoPrecios[i]['close'];
        }
        insideSMA = insideSMA/26;
        return insideSMA;
      }

    });

    indicador = indicador + '| periodo:'+parametro['periodo'];
    return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};

}

function MOMENTUMauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time};
  indicador = 'Momentum';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();
  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){
            momentum = MOMENTUM(index)
            if(value['close']>listadoPrecios[index-time]['close'] && momentum>0 ){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function MOMENTUM(momentumIndex){
        let momentum = listadoPrecios[momentumIndex]['close'] - listadoPrecios[momentumIndex-time]['close'] ;
        return momentum;
      }


    });

    indicador = indicador + '| periodo:'+parametro['periodo'];
    return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};

}

function OSMAauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time};
  indicador = 'Moving Average of Oscillator';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();
  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-50] !== undefined){
            macd = EMA12(index-1) - EMA26(index-1);
            signal = SMA9(index-1);
            osma = macd - signal;
            if(value['close']>listadoPrecios[index-time]['close'] && osma>0 ){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function EMA12(emaIndex){
        var P=2/13;
        var bestEMA;
        //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
        if(emaIndex == (index-1) - 11){
          bestEMA = SMA12(emaIndex);
        }
        else{
          bestEMA = (listadoPrecios[emaIndex]['close'] * P) + (EMA12(emaIndex-1) * (1 - P));
        }

        return bestEMA;
      }
      function EMA26(emaIndex){
        var P=2/27;
        var bestEMA;
        //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
        if(emaIndex == (index-1) - 11){
          bestEMA = SMA26(emaIndex);
        }
        else{
          bestEMA = (listadoPrecios[emaIndex]['close'] * P) + (EMA26(emaIndex-1) * (1 - P));
        }

        return bestEMA;
      }
      function SMA12(smaIndex){
        var insideSMA = 0;
        for (let i = smaIndex-11; i <= smaIndex ; i++){
          insideSMA = insideSMA + listadoPrecios[i]['close'];
        }
        insideSMA = insideSMA/12;
        return insideSMA;
      }
      function SMA26(smaIndex){
        var insideSMA = 0;
        for (let i = smaIndex-25; i <= smaIndex ; i++){
          insideSMA = insideSMA + listadoPrecios[i]['close'];
        }
        insideSMA = insideSMA/26;
        return insideSMA;
      }
      function SMA9(smaIndex){
        var insideSMA = 0;
        for (let i = smaIndex-8; i <= smaIndex ; i++){
          insideSMA = insideSMA + (EMA12(i) - EMA26(i));
        }
        insideSMA = insideSMA/9;
        return insideSMA;
      }

    });

    indicador = indicador + '| periodo:'+parametro['periodo'];
    return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};

}

function ADauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time};
  indicador = 'Acumulation/Distribution';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();
  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){
            ad = AD(index-1, time);
            if(listadoPrecios[index-time]['close']<listadoPrecios[index-1]['close'] && ad > 0){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function AD(adIndex, periodo){
        if(adIndex == (index-1) - (periodo-1)){
          return (((listadoPrecios[adIndex]['close'] - listadoPrecios[adIndex]['lower'])-(listadoPrecios[adIndex]['higher'] - listadoPrecios[adIndex]['close'])) / (listadoPrecios[adIndex]['higher'] - listadoPrecios[adIndex]['lower']) ) * listadoPrecios[adIndex]['volume'] ;
        }
        var insideAD = (((listadoPrecios[adIndex]['close'] - listadoPrecios[adIndex]['lower'])-(listadoPrecios[adIndex]['higher'] - listadoPrecios[adIndex]['close']))  / (listadoPrecios[adIndex]['higher'] - listadoPrecios[adIndex]['lower'])) * listadoPrecios[adIndex]['volume']  + AD(adIndex-1, periodo);
        return insideAD;
      }
    });

    indicador = indicador + '| periodo:'+parametro['periodo'];
    return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};
}

function MFIauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time};
  indicador = 'Money Flow Index';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();
  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){
            mfi = MFI(index-1,time);
            if(MFI(index-time, time) < mfi && listadoPrecios[index-time]['close'] < listadoPrecios[index-1]['close'] && mfi<80){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function MFI(mfiIndex,periodo){
        var mfPositivo=0;
        var mfNegativo=0;

        for(let i = (index-1) - (periodo-1); i<=mfiIndex; i++){
          if(TP(i)<=TP(i-1)){
            mfNegativo = mfNegativo + MF(i,TP(i));
          }else{
            mfPositivo = mfPositivo + MF(i,TP(i));
          }
        }

        var mr = mfPositivo/mfNegativo;
        var mfi = 100 - (100 / (1 + mr));
        return mfi;
      }
      function TP(tpIndex){
        return (listadoPrecios[tpIndex]['higher'] + listadoPrecios[tpIndex]['lower'] + listadoPrecios[tpIndex]['close'])/3;
      }

      function MF(mfIndex,tp){
        return tp*listadoPrecios[mfIndex]['volume'];
      }
    });

    indicador = indicador + '| periodo:'+parametro['periodo'];
    return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};
}

function OBVauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time};
  indicador = 'On Balance Volume';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();
  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){
            obv = OBV(index-1,time);
            if(obv > 0 && OBV(index-2,time) < obv && listadoPrecios[index-2]['close'] < listadoPrecios[index-1]['close']){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function OBV(obvIndex,periodo){
        if(obvIndex == (index-1) - (periodo-1)){
          return listadoPrecios[obvIndex]['volume'];
        }else{
          if(listadoPrecios[obvIndex]['close']>listadoPrecios[obvIndex-1]['close']){
            return OBV(obvIndex-1,periodo) + listadoPrecios[obvIndex]['volume'];
          } else if(listadoPrecios[obvIndex]['close']<listadoPrecios[obvIndex-1]['close']){
            return OBV(obvIndex-1,periodo) - listadoPrecios[obvIndex]['volume'];
          } else{
            return OBV(obvIndex-1,periodo);
          }
        }
      }
    });

    indicador = indicador + '| periodo:'+parametro['periodo'];
    return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};
}

function VOLUMESauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time};
  indicador = 'Volumes';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();
  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){

            if(VOLUMES(index)){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function VOLUMES(volumesIndex){
        if(listadoPrecios[volumesIndex]['volume']>listadoPrecios[volumesIndex-1]['volume']){
          return true;
        }else{
          return false;
        }
      }
    });

    indicador = indicador + '| periodo:'+parametro['periodo'];
    return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};
}

function MARKETFIauto(empresa,time,rendimiento){
  Exitosas = 0;
  parametro = {periodo: time};
  indicador = 'Market Facilitation Index';

  listadoPrecios = empresa['precios'];
  listadoPrecios.reverse();
  contadorDias = 0;
  enOperacion = false;
  primerPrecio = 0;
  precioObjetivo=0;
  predicExitosas = 0;

  listadoPrecios.forEach(function (value,index)
    {
      contadorDias++;
      if(contadorDias > time){contadorDias = 1;enOperacion= false}
      if(contadorDias == 1){
        if(listadoPrecios[index+(time-1)] !== undefined){
          if(listadoPrecios[(index-1)-(time+time)] !== undefined){

            if(MarketFI(index-1)>0 && MarketFI(index-1) > MarketFI(index-time)){
              enOperacion = true;
              primerPrecio = value['open'];
              precioObjetivo = primerPrecio * (1 + (rendimiento/100));
            }
          }
        }
      }
      if(enOperacion && value['higher'] >= precioObjetivo){
        Exitosas++;
        enOperacion= false;
      }

      function MarketFI(mfiIndex){
        return (listadoPrecios[mfiIndex]['higher'] - listadoPrecios[mfiIndex]['lower']) / listadoPrecios[mfiIndex]['volume'];
      }
    });

    indicador = indicador + '| periodo:'+parametro['periodo'];
    return {predicExitosas: Exitosas, indicador: indicador, parametros: [parametro['periodo']]};
}


function guardaSistema(stoploss, empresa, indicador, parametro,userId ){
  Usuarios.findByIdAndUpdate(userId,{
    stoploss: stoploss,
    empresa: empresa,
    indicador: indicador,
    parametro: parametro,
    diasOperacion: 0,
  }).then(res => {

  })

}


module.exports=controller;
