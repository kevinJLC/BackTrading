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
  'BMY',
  'C',
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
  'EMC',
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
  'HNZ',
  'HON',
  'HPQ',
  'IBM',
  'INTC',
  'JNJ',
  'JPM',
  'KFT',
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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

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
    }).catch(err => { console.log(err) });

  })
  .catch(err => {
    console.log('Request fallida: ' + simbolos[13]);
    respaldoForzado(13);
  });



  //  COST
  //  CPB
  //  CSCO
  //  CVS
  //  CVX
  //  DD
  //  DELL
  //  DIS
  //  DOW
  //  DVN
  //  EMC
  //  ETR
  //  EXC
  //  F
  //  FCX
  //  FDX
  //  GD
  //  GE
  //  GILD
  //  GOOG
  //  GS
  //  HAL
  //  HD
  //  HNZ
  //  HON
  //  HPQ
  //  IBM
  //  INTC
  //  JNJ
  //  JPM
  //  KFT
  //  KO
  //  LMT
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
    }).catch(err => { console.log('Respaldo.save() fallida en : '+ respaldo.simbolo +'    '+ err) });

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



