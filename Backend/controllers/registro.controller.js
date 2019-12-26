const Usuario=require('../models/Usuarios');
const bcrypt=require("bcrypt");


const controller = {};

  controller.postUser= (req,res) =>{
    bcrypt.hash(req.body.pass,10)
    .then(hash => {
      const usuario=new Usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,
        contraseña: hash,
        nacimiento: req.body.fecha
      });

      usuario.save().then(result => {
        res.json(usuario);
      })
      .catch( err => { res.status(500).json({ err: err}); });

    })
    .catch(err => {res.json({message: 'bcryp invalido'}); });


  };





module.exports=controller;
