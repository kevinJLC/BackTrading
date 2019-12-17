const mongoose = require ('mongoose');
const sistemaSchema=mongoose.Schema({
  nombre: {type: String, required: true},
  rendimiento: {type: Number, required: true },
  StopLoss: {type: Number, required: true},
  Periodo:  {type: Number, required: true},
  Inicio: {type: Date, required: true},
  Fin:  {type: Date, required: true},
  Condicion: {type: Array, required: true}
});

module.exports= mongoose.model('Sistemas',sistemaSchema);
