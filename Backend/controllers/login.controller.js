const Usuario=require('../models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const eventemither = require ('events').EventEmitter
const controller = {};
var intentos = 0;

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
        // aumenta campo de intentos 0-4
        intentos++;
        if(intentos>4){
          intentos=0;
          // Envio de correo

          var options = {

        auth: {

          api_user: 'kevin36joel',

          api_key: '333ingeniero777'

        }

          }
          var client = nodemailer.createTransport(sgTransport(options));

          var email = {

            from: 'Baktesting',

            to: 'lopezcarrillokevin36@gmail.com',

            subject: ' Alerta de seguridad [Intentos de inicio de sesion]',

            html: '<b> Se ha intentado iniciar sesión en tu cuenta más de 4 veces seguidas sin éxito</b> <br> <p> <strong> Si fuiste tú, ignora este mensaje  </strong> </p>' };
          client.sendMail(email, function(err, info){

            if (err ){

            console.log(err);

            } else {

            console.log('Message sent: ' + info.response);

        }

          });

          console.log('Ve a tu correo y verifica tu cuenta');

        }

        Usuario.findByIdAndUpdate(fetchuser._id,{intentos: intentos}).then(res => {console.log(res)}).catch(err => {console.log(err)});

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
