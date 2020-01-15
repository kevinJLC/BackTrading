const Empresa=require('../models/Empresas');
const request = require("request-promise");
var URI;
const controller = {};
var simbolos = [
  'AA',
  'AAPL',
  'ABT',
  'AEP',
  'ALL',
  'AMGN',
  'AMZN',
  'AVP',
  'AXP',
  'BA',
  'BAC',
  'BAX',
  //'BHI', Empresa desactualizada
  'BK',
  'BRK.B',
  'BMY', //
  'C', //
  'CAT',
  'CL',
  'CMCSA',
  'COF',
  'COP',
  'COST',
  'CPB',
  'CSCO',
  'CVS',
  'CVX',
  'DD',
  'DELL',
  'DIS',
  'DOW',
  'DVN',
  //'EMC',  BD
  'ETR',
  'EXC',
  'F',
  'FCX',
  'FDX',
  'GD',
  'GE',
  'GILD',
  'GOOG',
  'GS',
  'HAL',
  'HD',
  //'HNZ',  BD
  'HON',
  'HPQ',
  'IBM',
  'INTC',
  'JNJ',
  'JPM',
  //'KFT',  BD
  'KO',
  'LMT',
  'LOW',
  'MA',
  'MCD',
  'MDT',
  'MET',
  'MMM',
  'MO',
  'MON',
  'MRK',
  'MS',
  'MSFT',
  'NKE',
  'NOV',
  'NSC',
  'NWSA',
  'NYX',
  'ORCL',
  'OXY',
  'PEP',
  'PFE',
  'PG',
  'PM',
  'QCOM',
  'RF',
  'RTN',
  'S',
  'SLB',
  'SLE',
  'SO',
  'T',
  'TGT',
  'TWX',
  'TXN',
  'UNH',
  'UPS',
  'USB',
  'UTX',
  'VZ',
  'WAG',
  'WFC',
  'WMB',
  'WMT',
  'WY',
  'XOM',
  'XRX'
  ]



controller.getEmpresas=(req, res) => {
var URI;
var index=0;

Empresa.deleteMany({})
.then(() => {

  //  AA
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[0]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(0); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[0]);
    respaldoForzado(0);
  });

  //  AAPL
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[1]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(1); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[1]);
    respaldoForzado(1);
  });

  //  ABT
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[2]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(2);});

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[2]);
    respaldoForzado(2);
  });

  //  AEP
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[3]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(3); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[3]);
    respaldoForzado(3);
  });

  //  ALL
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[4]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(4); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[4]);
    respaldoForzado(4);
  });

  //  AMGN
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[5]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(5); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[5]);
    respaldoForzado(5);
  });

  //  AMZN
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[6]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(6); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[6]);
    respaldoForzado(6);
  });

  //  AVP
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[7]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(7); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[7]);
    respaldoForzado(7);
  });

  //  AXP
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[8]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(8); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[8]);
    respaldoForzado(8);
  });

  //  BA
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[9]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(9); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[9]);
    respaldoForzado(9);
  });

  //  BAC
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[10]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(10); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[10]);
    respaldoForzado(10);
  });

  //  BAX
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[11]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(11); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[11]);
    respaldoForzado(11);
  });

  //  BHI  ya no existe

  //  BK
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[12]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(12); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[12]);
    respaldoForzado(12);
  });

  //  BRK.B
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[13]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(13); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[13]);
    respaldoForzado(13);
  });

  //  BMY 

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[14]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(14); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[14]);
    respaldoForzado(14);
  });

  //  C

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[15]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(15); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[15]);
    respaldoForzado(15);
  });

  //  CAT

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[16]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(16); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[16]);
    respaldoForzado(16);
  });

  //  CL

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[17]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(17); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[17]);
    respaldoForzado(17);
  });

  //  CMCSA

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[18]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(18); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[18]);
    respaldoForzado(18);
  });

  //  COF

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[19]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(19); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[19]);
    respaldoForzado(19);
  });

  //  COP

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[20]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(20); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[20]);
    respaldoForzado(20);
  });

  //  COST

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[21]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(21); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[21]);
    respaldoForzado(21);
  });

  //  CPB

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[22]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(22); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[22]);
    respaldoForzado(22);
  });

  //  CSCO

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[23]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(23); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[23]);
    respaldoForzado(23);
  });

  //  CVS

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[24]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(24); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[24]);
    respaldoForzado(24);
  });

  //  CVX

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[25]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(25); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[25]);
    respaldoForzado(25);
  });

  //  DD

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[26]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(26); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[26]);
    respaldoForzado(26);
  });

  //  DELL

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[27]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(27); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[27]);
    respaldoForzado(27);
  });

  //  DIS

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[28]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(28); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[28]);
    respaldoForzado(28);
  });

  //  DOW

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[29]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(29); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[29]);
    respaldoForzado(29);
  });

  //  DVN

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[30]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(30); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[30]);
    respaldoForzado(30);
  });

  //  EMC no jala

  //  ETR

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[31]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(31); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[31]);
    respaldoForzado(31);
  });

  //  EXC

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[32]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(32); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[32]);
    respaldoForzado(32);
  });

  //  F

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[33]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(33); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[33]);
    respaldoForzado(33);
  });

  //  FCX

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[34]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(34); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[34]);
    respaldoForzado(34);
  });

  //  FDX

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[35]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(35); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[35]);
    respaldoForzado(35);
  });

  //  GD

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[36]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(36); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[36]);
    respaldoForzado(36);
  });

  //  GE

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[37]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(37); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[37]);
    respaldoForzado(37);
  });

  //  GILD

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[38]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(38); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[38]);
    respaldoForzado(38);
  });

  //  GOOG

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[39]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(39); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[39]);
    respaldoForzado(39);
  });

  //  GS

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[40]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(40); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[40]);
    respaldoForzado(40);
  });

  //  HAL

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[41]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(41); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[41]);
    respaldoForzado(41);
  });

  //  HD

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[42]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(42); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[42]);
    respaldoForzado(42);
  });

  //  HNZ NO JALA

  //  HON

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[43]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(43); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[43]);
    respaldoForzado(43);
  });

  //  HPQ

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[44]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(44); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[44]);
    respaldoForzado(44);
  });

  //  IBM

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[45]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(45); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[45]);
    respaldoForzado(45);
  });

  //  INTC

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[46]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(46); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[46]);
    respaldoForzado(46);
  });

  //  JNJ

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[47]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(47); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[47]);
    respaldoForzado(47);
  });

  //  JPM

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[48]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(48); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[48]);
    respaldoForzado(48);
  });

  //  KFT NO JALA

  //  KO

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[49]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(49); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[49]);
    respaldoForzado(49);
  });

  //  LMT

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[50]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log(err); respaldoForzado(50); });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[50]);
    respaldoForzado(50);
  });

  //  LOW
  //  MA
  //  MCD
  //  MDT
  //  MET
  //  MMM
  //  MO
  //  MON
  //  MRK
  //  MS

  //  MSFT
  //  NKE
  //  NOV
  //  NSC
  //  NWSA
  //  NYX
  //  ORCL
  //  OXY
  //  PEP
  //  PFE

  //  PG
  //  PM
  //  QCOM
  //  RF
  //  RTN
  //  S
  //  SLB
  //  SLE
  //  SO
  //  T

  //  TGT
  //  TWX
  //  TXN
  //  UNH
  //  UPS
  //  USB
  //  UTX
  //  VZ
  //  WAG
  //  WFC
  
  //  WMB
  //  WMT
  //  WY
  //  XOM
  //  XRX






}).then(res.send(simbolos))
.catch(err => {console.log(err)});


function respaldoForzado(posision){
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+simbolos[posision]+'&outputsize=full&apikey=YAWX1E3QZ0LONC2T', {json: true})
  .then(result => {
    let listaPrecios = [];
    let preciosObject = result['Time Series (Daily)'];
    for (const key in preciosObject) {
      let listadoDias = {fecha: String, open: Number, close: Number, higher:Number, lower: Number, volume: Number};
      listadoDias.fecha = key;
      listadoDias.open = parseFloat(preciosObject[key]['1. open']);
      listadoDias.close = parseFloat(preciosObject[key]['4. close']);
      listadoDias.higher = parseFloat(preciosObject[key]['2. high']);
      listadoDias.lower = parseFloat(preciosObject[key]['3. low']);
      listadoDias.volume = parseInt(preciosObject[key]['5. volume']);
      listaPrecios.push(listadoDias);
    }

    let respaldo = new Empresa({
      simbolo: result['Meta Data']['2. Symbol'],
      ultimaActualizacion: result['Meta Data']['3. Last Refreshed'],
      precios: listaPrecios
    });

    respaldo.save()
    .then(()=>{
      console.log(index + ' ' + respaldo.simbolo);
      index++;
    }).catch(err => { console.log('Respaldo.save() fallida en : '+ respaldo.simbolo +'    '+ err); respaldoForzado(posision);});

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[posision] + '  ' + err);
    respaldoForzado(posision);
  });
}









/*
URI = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=YAWX1E3QZ0LONC2T'
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
    res.send('empresas actualizadas');
  }).catch(err => { console.log(err) });

})
.catch(err => {
  res.send('hola ' + err);
});
*/

}
module.exports=controller;



