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
  console.log(req.body.condicion);

  const sistema = new Sistema({
  nombre: req.body.sistema.nombre,
  rendimiento: req.body.sistema.rendimiento,
  stopLoss: req.body.sistema.stoploss,
  periodo: req.body.sistema.rango,
  condicion: req.body.condicion,
  creador: req.userData.id
  });
  await sistema.save()
  .then( result => {res.json(result); })
  .catch( err => {res.json({err: err}); } );
}

controller.deleteSistema = async (req,res) =>{
  console.log(req.params.id);
  await Sistema.findByIdAndRemove(req.params.id)
  .then(res.json({message: req.params.id + ' eliminado'}))
  .catch(res.json({message: 'error al eliminar'}));

}

controller.updateSistema = async(req, res) => {

  console.log(req.body);

    Sistema.findByIdAndUpdate(req.body.id,{
    nombre: req.body.sistema.nombre,
    rendimiento: req.body.sistema.rendimiento,
    stopLoss: req.body.sistema.stoploss,
    periodo: req.body.sistema.rango,
    condicion: req.body.condicion
    })
  .then( result => { res.json(result); })
  .catch(console.log('hola'));
}
module.exports=controller;
