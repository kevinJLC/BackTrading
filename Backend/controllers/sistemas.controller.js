const Sistema = require('../models/Sistemas');

const controller ={};

controller.getSistemas = async (req,res) => {

  const sistemas = await Sistema.find( {creador: req.userData.id})
  .then(result => {
    res.json(result);
  })
  .catch( err =>{ res.json({err:err}); });

}

controller.postSistema = async(req,res) => {
  const sistema = new Sistema({
  nombre: req.body.nombre,
  rendimiento: req.body.rendimiento,
  stopLoss: req.body.stoploss,
  periodo: req.body.rango,
  creador: req.userData.id
  });
  await sistema.save()
  .then( result => {res.json(result); })
  .catch( err => {res.json({err: err}); } );
}
module.exports=controller;
