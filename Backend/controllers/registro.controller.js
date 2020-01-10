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

      var repetido;
      Usuario.exists({correo: usuario.correo}, (err ,result) => {
        if(err){
          console.log(err);
        }

        if(result){
          console.log(true);
          res.json(true);
        } else {
          console.log(false);
        console.log('Del req: ' +req.body.fecha);
        console.log('Del usuario: ' +usuario.nacimiento);
        const tokentemporal= jwt.sign({correo: req.body.correo, nombre: req.body.nombre},'colomos2019', {expiresIn: '1h'});
        console.log(usuario);
        res.json(false);
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

    html: '<b> Click en el siguiente enlace para verificar tu cuenta</b> <br> <a href ="http://localhost:3000/api/activacion/'+ tokentemporal + '/'+ usuario.nombre+ '/'+ usuario.correo +'/'+ req.body.pass +'/'+ req.body.fecha +'"> http://localhost/activacion/ </a>'
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
        }
      })




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
        nacimiento: req.params.nacimiento
      });
      console.log(usuario);
      usuario.save()
      .then(res.redirect('http://localhost:4200'))
      .catch( err => {
        console.log('No pudo dar el Usuario.save() linea:84 solution en commit del 06/01/2020' + err );
        res.status(500).json({ message:  'error brutal'}); });
    })
    .catch(err => {console.log(err) });
  };



module.exports=controller;
