const controller ={};

controller.indicador = (indicador,precios, time, parametros) =>{
  let nombreIndicador = indicador.split('|')[0];


  switch(nombreIndicador){
    case 'Adaptative Moving Average':
        ama = AMA(0,precios,time,parametros);
        if(precios[0]['higher']>precios[0+(time-1)]['higher']&& ((precios[0]['open']>ama && precios[0]['close']<ama) || (precios[0]['open']<ama && precios[0]['close']>ama) || (precios[0]['open']>ama && precios[0]['close']>ama && precios[0]['lower']<ama) || (precios[0]['open']>ama && precios[0]['close']>ama && precios[0]['lower']>ama)) ){
          return true;
        }
    break;
    case 'Envelopes':

    break;
    case 'Simple Moving Average':

    break;
    case 'Average True Range':

    break;
    case 'Bears':

    break;
    case 'Bulls':

    break;
    case 'Exponential Moving Average':

    break;
    case 'Moving Average Convergence Divergence':

    break;
    case 'Momentum':

    break;
    case 'Moving Average of Oscillator':

    break;
    case 'Acumulation/Distribution':

    break;
    case 'Money Flow Index':

    break;
    case 'On Balance Volume':

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

  function SMA(smaIndex,preciosEmpresa,time,parametros){
    var insideSMA = 0;
    for (let i = smaIndex+(time-1); i >= smaIndex ; i--){
      insideSMA = insideSMA + preciosEmpresa[i]['close'];
    }
    insideSMA = insideSMA/time;
    return insideSMA;
  }



module.exports=controller;
