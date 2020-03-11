const controller ={};

controller.indicador = (indicador,precios, time, parametros) =>{
  let nombreIndicador = indicador.split('|')[0];


  switch(nombreIndicador){
    case 'Adaptative Moving Average':
        ama = AMA(0,precios,time,parametros);
        if(precios[0]['higher']>precios[0+(time-1)]['higher']&& ((precios[0]['open']>ama && precios[0]['close']<ama) || (precios[0]['open']<ama && precios[0]['close']>ama) || (precios[0]['open']>ama && precios[0]['close']>ama && precios[0]['lower']<ama) || (precios[0]['open']>ama && precios[0]['close']>ama && precios[0]['lower']>ama)) ){
          return true
        }
    break;
    case 'Envelopes':
        return ENVELOPES(0,precios,time,parametros)
    break;
    case 'Simple Moving Average':
        sma = SMA(0, precios, time, parametros)
        if(precios[0]['higher']>precios[0+(time-1)]['higher'] && ((precios[0]['open']>sma && precios[0]['close']<sma)) || (precios[0]['open']<sma && precios[0]['close']>sma) || (precios[0]['open']>sma && precios[0]['close']>sma) && precios[0]['lower']<sma){
          return true;
        }
    break;
    case 'Average True Range':
        return ATR(0,precios,time,parametros)
    break;
    case 'Bears':
        return BEARS(0,preciosEmpresa,time,parametros)
    break;
    case 'Bulls':
        return BULLS(0,precios,time,parametros)
    break;
    case 'Exponential Moving Average':
        return EMA(0,precios,time,parametros)
    break;
    case 'Moving Average Convergence Divergence':
        return MACD(0,precios,time,parametros)
    break;
    case 'Momentum':
      return MOMENTUM(0,precios,time,parametros)
    break;
    case 'Moving Average of Oscillator':
        return OSMA(0,precios,time,parametros)
    break;
    case 'Acumulation/Distribution':
        return AD(0,precios,time,parametros)
    break;
    case 'Money Flow Index':
      return MFI(0,precios,time,parametros)
    break;
    case 'On Balance Volume':
      return OBV(0,precios,time,parametros)
    break;
    case 'Volumes':

    break;
    case 'Market Facilitation Index':

    break;



  }
  return false;
}

//indicadores

  function AMA(amaIndex,preciosEmpresa,time,parametros){
    // calcula ER efitience ratio
    let cambio = Math.abs(preciosEmpresa[amaIndex]['close'] - preciosEmpresa[amaIndex+time]['close']);
    let volatilidad = 0;
  for(let i = amaIndex; i <= amaIndex+(time-1); i++){
    volatilidad = volatilidad + Math.abs(preciosEmpresa[i]['close'] - preciosEmpresa[i+1]['close']);
  }
  let ER = cambio/volatilidad;

  // calcula  SC constante de suavizado
  let SC = Math.pow(ER * (2/(2+1) - 2/(30+1)) + 2/(30+1),2);

  // calcula AMA adaptative moving average
  let insideAMA=0;
  if(amaIndex == 0+(time-1)){
    sma = SMA(amaIndex,preciosEmpresa,time, parametros)
    insideAMA = sma + SC * (preciosEmpresa[amaIndex]['close'] - sma);
  }else{
    ama=AMA(amaIndex + 1,preciosEmpresa,time, parametros)
    insideAMA = ama+ SC * (preciosEmpresa[amaIndex]['close'] - ama);
  }


  return insideAMA;
  }

  function ENVELOPES(envelopesIndex,preciosEmpresa,time,parametros){
        upp = upperBand(envelopesIndex);
        low = lowerBand(envelopesIndex);
        ssmmaa = SMA(envelopesIndex,time);
        if(LOW > lowerBand(envelopesIndex + (time-1)) && (preciosEmpresa[envelopesIndex]['close'] < ssmmaa && preciosEmpresa[envelopesIndex]['close'] >= low || (preciosEmpresa[envelopesIndex]['close']) < low)){
          return true
        }
        return false

    function upperBand(upperIndex){

      sma = SMA(upperIndex,time);
      uppBand = sma*(1+parametros[1]/100);

      return(uppBand);
    }

    function lowerBand(lowerIndex){
      sma = SMA(lowerIndex,time);
      lowBand = sma*(1-parametros[1]/100);

      return(lowBand);
    }

    function SMA(smaIndex, periodo){
      var insideSMA = 0;

        for (let i = smaIndex; i <= smaIndex+(periodo-1) ; i++){
          insideSMA = insideSMA + preciosEmpresa[i]['close'];
        }
        insideSMA = insideSMA/periodo;

      return insideSMA;
    }
  }

  function SMA(smaIndex,preciosEmpresa,time,parametros){
    var insideSMA = 0;
    for (let i = smaIndex+(time-1); i >= smaIndex ; i--){
      insideSMA = insideSMA + preciosEmpresa[i]['close'];
    }
    insideSMA = insideSMA/time;
    return insideSMA;
  }

  function ATR(atrIndex,preciosEmpresa,time,parametros){

    if(preciosEmpresa[atrIndex+time]['close']<preciosEmpresa[atrIndex-1]['close'] && (preciosEmpresa[atrIndex-1]['close']+atr(0,time)/time) > 0 ){
      return true
    }
    return false

    function atr(atrIndex, periodo){
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

      if(atrIndex == 0 + (periodo - 1)){
        return dif1;
      }
      bestATR = bestATR + atr(atrIndex+1, periodo);

      return bestATR;
    }
  }

  function BEARS(bearsIndex,listadoPrecios,time,parametros){
    bears = bears(bearsIndex, time);
            if(bears(bearsIndex + time, time)<0 && bears > 0){
              return true
            }
            return false

    function bears(bearsIndex, periodo){
      var insideBears = listadoPrecios[bearsIndex]['lower'] - bearsEMA(bearsIndex, periodo);
      return insideBears;
    }

    function bearsEMA(emaIndex, periodoEma){
      var P = 2/(periodoEma + 1 );
      var bestEMA;
      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
      if(emaIndex == 0 + (periodoEma - 1)){
        return bearsSMA(emaIndex, periodoEma);
      }
      else{
        ema = bearsEMA(emaIndex+1, periodoEma);
        bestEMA = (listadoPrecios[emaIndex]['close'] * P) + (ema * (1 - P));
      }
      return bestEMA;
    }

    function bearsSMA(smaIndex, periodoSma){
      var insideSMA = 0;
      for (let i = smaIndex; i <= smaIndex + (smaIndex-1) ; i++){
        insideSMA = insideSMA + listadoPrecios[i]['close'];
      }
      insideSMA = insideSMA/periodoSma;
      return insideSMA;
    }
  }

  function BULLS(bullsIndex,listadoPrecios,time,parametros){
    bulls = bulls(bullsIndex, time);
            if(bulls(bullsIndex+time, time)<0 && bulls > 0){
              return true
            }
            return false

    function bulls(bullsIndex, periodo){
      var insideBulls = listadoPrecios[bullsIndex]['higher'] - bullsEMA(bullsIndex, periodo);
      return insideBulls;
    }

    function bullsEMA(emaIndex, periodoEmaBulls){
      var P = 2/(periodoEmaBulls + 1 );
      var bestEMA;
      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
      if(emaIndex == 0 + (periodoEmaBulls - 1)){
        return bullsSMA(emaIndex, periodoEmaBulls);
      }
      else{
        emaBulls = bullsEMA(emaIndex+1, periodoEmaBulls);
        bestEMA = (listadoPrecios[emaIndex]['close'] * P) + (emaBulls * (1 - P));
      }
      return bestEMA;
    }

    function bullsSMA(smaIndex, periodoSmaBulls){
      var insideSMA = 0;
      for (let i = smaIndex; i <= smaIndex+(periodoSmaBulls-1) ; i++){
        insideSMA = insideSMA + listadoPrecios[i]['close'];
      }
      insideSMA = insideSMA/periodoSmaBulls;
      return insideSMA;
    }
  }

  function EMA(emaIndex,listadoPrecios,time,parametros){
    ema = ema(emaIndex, time);
            if(listadoPrecios[emaIndex]['close']>listadoPrecios[emaIndex+time]['close'] && ema > 0){
              return true
            }
            return false
    function ema(emaIndex,periodo){
      var bestEMA;
      var P = 2/(periodo + 1 );
      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
      if(emaIndex == 0 + (periodo - 1)){
        return SMA(emaIndex,periodo);
      }
      else{
        bestEMA = (listadoPrecios[emaIndex]['close'] * P) + (ema(emaIndex+1,time) * (1 - P));
      }
      return bestEMA;
    }

    function SMA(smaIndex, periodo){
      var insideSMA = 0;
        for (let i = smaIndex; i <= smaIndex + (periodo-1) ; i++){
          insideSMA = insideSMA + listadoPrecios[i]['close'];
        }
        insideSMA = insideSMA/periodo;
      return insideSMA;
    }
  }

  function MACD(macdIndex,listadoPrecios,time,parametros){

    macd = EMA12(macdIndex) - EMA26(macdIndex);
            if(listadoPrecios[index]['close']>listadoPrecios[macdIndex+time]['close'] && macd>0 ){
              return true
            }
            return false

    function EMA12(macdIndex){
      var P=2/13;
      var bestEMA;
      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
      if(macdIndex == 0 + 11){
        bestEMA = SMA12(macdIndex);
      }
      else{
        bestEMA = (listadoPrecios[macdIndex]['close'] * P) + (EMA12(macdIndex+1) * (1 - P));
      }

      return bestEMA;
    }
    function EMA26(macdIndex){
      var P=2/27;
      var bestEMA;
      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
      if(macdIndex == 0 + 25){
        bestEMA = SMA26(macdIndex);
      }
      else{
        bestEMA = (listadoPrecios[macdIndex]['close'] * P) + (EMA26(macdIndex+1) * (1 - P));
      }

      return bestEMA;
    }
    function SMA12(smaIndex){
      var insideSMA = 0;
      for (let i = smaIndex; i <= smaIndex + 11 ; i++){
        insideSMA = insideSMA + listadoPrecios[i]['close'];
      }
      insideSMA = insideSMA/12;
      return insideSMA;
    }
    function SMA26(smaIndex){
      var insideSMA = 0;
      for (let i = smaIndex; i <= smaIndex + 25 ; i++){
        insideSMA = insideSMA + listadoPrecios[i]['close'];
      }
      insideSMA = insideSMA/26;
      return insideSMA;
    }
  }

  function MOMENTUM(momentumIndex,listadoPrecios,time,parametros){
    momentum = MOMENTUM(momentumIndex)
            if(listadoPrecios[momentumIndex]['close']>listadoPrecios[momentumIndex + time]['close'] && momentum>0 ){
              return true
            }
            return false

    function momentum(momentumIndex){
      let momentum = listadoPrecios[momentumIndex]['close'] - listadoPrecios[momentumIndex+time]['close'] ;
      return momentum;
    }
  }

  function OSMA(osmaIndex,listadoPrecios,time,parametros){
    macd = EMA12(osmaIndex) - EMA26(osmaIndex);
            signal = SMA9(osmaIndex);
            osma = macd - signal;
            if(listadoPrecios[osmaIndex]['close']>listadoPrecios[osmaIndex+time]['close'] && osma>0 ){
              return true
            }
            return false

    function EMA12(macdIndex){
      var P=2/13;
      var bestEMA;
      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
      if(macdIndex == 0 + 11){
        bestEMA = SMA12(macdIndex);
      }
      else{
        bestEMA = (listadoPrecios[macdIndex]['close'] * P) + (EMA12(macdIndex+1) * (1 - P));
      }

      return bestEMA;
    }
    function EMA26(macdIndex){
      var P=2/27;
      var bestEMA;
      //EMA = (CLOSE (i) * P) + (EMA (i - 1) * (1 - P))
      if(macdIndex == 0 + 25){
        bestEMA = SMA26(macdIndex);
      }
      else{
        bestEMA = (listadoPrecios[macdIndex]['close'] * P) + (EMA26(macdIndex+1) * (1 - P));
      }

      return bestEMA;
    }
    function SMA12(smaIndex){
      var insideSMA = 0;
      for (let i = smaIndex; i <= smaIndex + 11 ; i++){
        insideSMA = insideSMA + listadoPrecios[i]['close'];
      }
      insideSMA = insideSMA/12;
      return insideSMA;
    }
    function SMA26(smaIndex){
      var insideSMA = 0;
      for (let i = smaIndex; i <= smaIndex + 25 ; i++){
        insideSMA = insideSMA + listadoPrecios[i]['close'];
      }
      insideSMA = insideSMA/26;
      return insideSMA;
    }
    function SMA9(smaIndex){
      var insideSMA = 0;
      for (let i = smaIndex; i <= smaIndex+8 ; i++){
        insideSMA = insideSMA + (EMA12(i) - EMA26(i));
      }
      insideSMA = insideSMA/9;
      return insideSMA;
    }
  }

  function AD(adIndex,listadoPrecios,time,parametros){
    ad = ad(adIndex, time);
    if(listadoPrecios[adIndex+time]['close']<listadoPrecios[adIndex]['close'] && ad > 0){
      return true
    }
    return false
    function ad(adIndex, periodo){
      if(adIndex == 0 + (periodo-1)){
        return (((listadoPrecios[adIndex]['close'] - listadoPrecios[adIndex]['lower'])-(listadoPrecios[adIndex]['higher'] - listadoPrecios[adIndex]['close'])) / (listadoPrecios[adIndex]['higher'] - listadoPrecios[adIndex]['lower']) ) * listadoPrecios[adIndex]['volume'] ;
      }
      var insideAD = (((listadoPrecios[adIndex]['close'] - listadoPrecios[adIndex]['lower'])-(listadoPrecios[adIndex]['higher'] - listadoPrecios[adIndex]['close']))  / (listadoPrecios[adIndex]['higher'] - listadoPrecios[adIndex]['lower'])) * listadoPrecios[adIndex]['volume']  + ad(adIndex+1, periodo);
      return insideAD;
    }
  }

  function MFI(mfiIndex,listadoPrecios,time,parametros){
    mfi = mfi(mfiIndex,time);
            if(mfi(mfiIndex+time, time) < mfi && listadoPrecios[index-time]['close'] < listadoPrecios[index-1]['close'] && mfi<80){
              return true
            }
            return false

    function mfi(mfiIndex,periodo){
      var mfPositivo=0;
      var mfNegativo=0;

      for(let i = 0 ; i<=mfiIndex+(periodo-1); i++){
        if(TP(i)<=TP(i+1)){
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
  }

  function OBV(obvIndex,listadoPrecios,time,parametros){
    obv = obv(obvIndex,time);
            if(obv > 0 && obv(obvIndex+time,time) < obv && listadoPrecios[obvIndex+time]['close'] < listadoPrecios[obvIndex]['close']){
              return true
            }
            return false
    function obv(obvIndex,periodo){
      if(obvIndex == 0 + (periodo-1)){
        return listadoPrecios[obvIndex]['volume'];
      }else{
        if(listadoPrecios[obvIndex]['close']>listadoPrecios[obvIndex+1]['close']){
          return obv(obvIndex+1,periodo) + listadoPrecios[obvIndex]['volume'];
        } else if(listadoPrecios[obvIndex]['close']<listadoPrecios[obvIndex+1]['close']){
          return obv(obvIndex+1,periodo) - listadoPrecios[obvIndex]['volume'];
        } else{
          return obv(obvIndex+1,periodo);
        }
      }
    }
  }




module.exports=controller;
