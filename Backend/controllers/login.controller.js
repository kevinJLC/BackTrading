const Usuario=require('../models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const controller = {};
const intentos = 0;

controller.getUsers=async (req,res)=>{
  const usuarios= await Usuario.find();
  res.json(usuarios)
}

controller.postUser=(req,res) => {
  let fetchuser;
    Usuario.findOne( {correo: req.body.email} )
    .then(user=> {
      fetchuser=user;
      if(!user){
        return res.status(401).json({ message: 'Autentificación inválida'});
      }
      return bcrypt.compare(req.body.password,user.contraseña);

    })
    .then(result => {

      if(!result){

        console.log(fetchuser);
        // aumenta campo de intentos 0-4
        Usuario.findByIdAndUpdate(fetchuser._id,{nombre: 'modificado'}).then( user => res.json(user))

        return res.status(402).json({ message: 'Autentificación inválida'});
      }
      //existe el correo, existe un usuario y coinciden las contraseñas, ahora crea el token
      const token = jwt.sign({correo: fetchuser.correo, id: fetchuser._id},'colomos2019', {expiresIn: '1h'});
      res.json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch( err => {
      return res.status(403).json({ message: 'Autentificación inválida'});
    });
}



module.exports=controller;
