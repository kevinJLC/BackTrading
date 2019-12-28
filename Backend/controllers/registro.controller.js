const Usuario=require('../models/Usuarios');
const bcrypt=require("bcrypt");
const nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

const controller = {};

  controller.postUser=(req,res) =>{

    bcrypt.hash(req.body.pass,10)
    .then(hash => {
      const usuario=new Usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,
        contraseña: hash,
        nacimiento: req.body.fecha,
        //creator: req.userData.id
      });
      nameForm=usuario.nombre;
      console.log(usuario);

      // Código para verificar correo
      var options = {

        auth: {

          api_user: 'kevin36joel',

          api_key: '333ingeniero777'

        }

      }
      var client = nodemailer.createTransport(sgTransport(options));



var email = {

  from: 'Coopel@mail.com',

  to: 'correodeldeshecho@gmail.com',

  subject: ' NoReply: Deuda pendiente folio#34728',

  html: '<b> Que chingue a su madre el Monterrey y viva el América </b>'
};



client.sendMail(email, function(err, info){

    if (err ){

      console.log(err);

    }

    else {

      console.log('Message sent: ' + info.response);

    }

});

      usuario.save()
      .then(result => {res.json(usuario);})
      .catch( err => { res.status(500).json({ err: err}); });

    })
    .catch(err => {console.log('bcryp fallido') });


  };





module.exports=controller;
