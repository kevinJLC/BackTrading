const mongoose = require ('mongoose');
const SistemaSchema=mongoose.Schema({

  nombre: {type: String, required: true},
  rendimiento: {type: Number, required: true },
  StopLoss: {type: Number, required: true},
  Periodo:  {type: Number, required: true},
  Inicio: {type: Date, required: true},
  Fin:  {type: Date, required: true},
  Condicion: {type: Array, required: true},
  creador: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true}
});

module.exports= mongoose.model('Sistema',SistemaSchema);
