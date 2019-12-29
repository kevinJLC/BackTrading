const Usuario=require('../models/Usuarios');
const jwt = require('jsonwebtoken');
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
      });
      const tokentemporal= jwt.sign({correo: req.body.correo, nombre: req.body.nombre},'colomos2019', {expiresIn: '1h'});
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

  from: usuario.correo,

  to: 'lopezcarrillokevin36@gmail.com',

  subject: ' NoReply: Deuda pendiente folio#34728',

  html: '<b> Click en el siguiente enlace para verificar tu cuenta</b> <br> <a href ="http://localhost:3000/activacion/'+ tokentemporal + '/'+ usuario.nombre+ '/'+ usuario.correo +'/'+ req.body.pass +'/'+ usuario.nacimiento +'"> http://localhost/activacion/ </a>'
      };
      client.sendMail(email, function(err, info){

    if (err ){

      console.log(err);

    }

    else {

      console.log('Message sent: ' + info.response);

    }

      });

      console.log('Ve a tu correo y verifica tu cuenta');
    })
    .catch(err => {console.log(err) });


  };


  controller.getActivacion=(req,res) =>{
    bcrypt.hash(req.params.password,10)
    .then(hash => {
      const usuario=new Usuario({
        nombre: req.params.nombre,
        correo: req.params.correo,
        contraseña: hash,
        nacimiento: req.params.nacimiento,
      });

      usuario.save()
      .then(res.redirect('http://localhost:4200'))
      .catch( err => { res.status(500).json({ err: err}); });



    })
    .catch(err => {console.log(err) });
  };



module.exports=controller;
