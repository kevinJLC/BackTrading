const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UsuarioSchema=mongoose.Schema({
  //id:  {type: String, required: false},
  nombre: {type: String, required: true, unique: true},
  correo: {type: String, required: true, unique: true},
  contraseña: {type: String, required: true},
  nacimiento: {type: Date, required: true},
});

UsuarioSchema.plugin(uniqueValidator);
module.exports=mongoose.model('Usuario', UsuarioSchema);
