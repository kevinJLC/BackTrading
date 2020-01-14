const mongoose = require ("mongoose");

const ActualizacionApi=mongoose.Schema({
  //id:  {type: String, required: false},
  fechaDeActualizacion: {type: String, required: true},
  EstadoDeActualizacion: {type: Boolean, required: true}
});

module.exports=mongoose.model('ActualizacionApi', ActualizacionApi);
