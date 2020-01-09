const mongoose = require ('mongoose');
const EmpresaSchema=mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: {type: String, required: true},
  apertura: {type: Number,required: true},
  cierre: {type: Number,required: true},
  maximo: {type: Number,required: true},
  minimo: {type: Number,required: true},
  volumen: {type: Number,required: true},
  ajuste: {type: Number,required: true}
});

module.exports=mongoose.model('Empresa', EmpresaSchema);
