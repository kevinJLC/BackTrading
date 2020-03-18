const Usuario=require('../models/Usuarios');
const Backtesting = require('../controllers/backtesting.controller');

const controller ={};

controller.postTrading = (req,res) => {
  console.log(req.body);
  console.log(req.userData);
  //Determinando perfil
  time = req.body.periodo;
  money = req.body.capital;
  rendimiento = req.body.rendimiento;

  Backtesting.backtestingTA(money, time, rendimiento, req.userData.id);

  Usuario.findByIdAndUpdate(req.userData.id,
  { tradingActivo: true,
    capital: req.body.capital,
    capitalInicial: req.body.capital,
    rendimiento: req.body.rendimiento,
    periodo: req.body.periodo,
    precioObjetivo: 0,
    precioPerdida: 0,
    capitalEnUso: 0.56
  }).then(res => {

  })
  res.json({message: 'Trading en proceso'});
}

controller.getStopTrading = (req,res) =>{
  Usuario.findByIdAndUpdate(req.userData.id,{tradingActivo: false}).then(res => {

  })
  res.json({message: 'Trading finalizado'});
}

controller.getStatus = (req,res) =>{
  Usuario.findById(req.userData.id).then(tradingData => {
    res.json(tradingData);
  })

}

module.exports=controller;
