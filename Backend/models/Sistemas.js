const mongoose = require ('mongoose');
const SistemaSchema=mongoose.Schema({

  nombre: {type: String, required: true},
  rendimiento: {type: Number, required: true },
  stopLoss: {type: Number, required: true},
  periodo:  {type: Number, required: true},
  //Condicion: {type: Array, required: true},
  creador: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true}
});

module.exports= mongoose.model('Sistema',SistemaSchema);
