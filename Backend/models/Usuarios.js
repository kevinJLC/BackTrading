const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UsuarioSchema=mongoose.Schema({
  //id:  {type: String, required: false},
  nombre: {type: String, required: true, unique: true},
  correo: {type: String, required: true, unique: true},
  contraseña: {type: String, required: true},
  nacimiento: {type: Date, required: true},
  intentos: {type: Number},

  tradingActivo: {type: Boolean, default: false},
  capital: {type: Number},
  capitalInicial: {type: Number},
  rendimiento: {type: Number},
  periodo: {type: Number},
  stoploss: {type: Number},
  empresa: {type: String},
  indicador: {type: String},
  parametro: {type: []},
  diasOperacion: {type: Number},
  precioObjetivo: {type: Number},
  precioPerdida: {type: Number},

  modoFicticio: {type: Boolean, default: true},
  opEnCurso: {type: Number,default: 0},
  opUnoCapital: {type: Number},
  capitalEnUso: {type: Number}

});

UsuarioSchema.plugin(uniqueValidator);
module.exports=mongoose.model('Usuario', UsuarioSchema);
