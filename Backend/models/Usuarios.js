const mongoose = require ('mongoose');
const UsuarioSchema=mongoose.Schema({
  //id:  {type: String, required: false},
  nombre: {type: String, required: true},
  correo: {type: String, required: true},
  contraseña: {type: String, required: true},
  nacimiento: {type: Date, required: true}
});

module.exports=mongoose.model('Usuario', UsuarioSchema);
