const Usuario=require('../models/Usuarios');

const controller ={};

controller.postTrading = (req,res) => {
  console.log(req.body);
  console.log(req.userData);
  Usuario.findByIdAndUpdate(req.userData.id,{tradingActivo: true}).then(res => {

  })
  res.json({message: 'Trading en proceso'});
}

controller.getTrading = (req,res) =>{
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
