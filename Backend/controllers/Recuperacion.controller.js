const nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const Usuario=require('../models/Usuarios');
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');

const controller = {};

function contra(length){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

controller.postRecuperacion= async(req,res) =>{
await Usuario.exists({correo: req.body.correoRecuperacion}, (err, result) =>{
    if(err){
        console.log(err);
    }
    else{
        if(result == false){
            console.log(result);
            res.json(false);
        }
        else{
            console.log(result);
            res.json(true);
            var options = {
                auth: {
                  api_user: 'kevin36joel',
                  api_key: '333ingeniero777'
                }
            }
            var client = nodemailer.createTransport(sgTransport(options));
            var newcontra = contra(7);
            const tokentemporal= jwt.sign({correo: req.body.correoRecuperacion},'colomos2019', {expiresIn: '1h'});
            var email = {
                from: req.body.correoRecuperacion,
                to: 'lopezcarrillokevin36@gmail.com',
                subject: ' Contraseña de recuperacion',
                html: '<b> Click en el siguiente enlace para actualizar tu contraseña a la siguiente: '+ newcontra +' </b> <br> <a href ="http://backtrading.com.mx/api/recuperar/'+ tokentemporal +'/'+ newcontra +'/'+ req.body.correoRecuperacion +'"> http://backtrading.com.mx/recuperar/ </a>'
            };
            client.sendMail(email, function(err, info){
                if (err ){
                  console.log(err);
                }
                else {
                  console.log('Message sent');
                }
            });
            console.log("Ve a tu correo y cambia la contraseña");
        }
    }
});
    console.log(req.body.correoRecuperacion);
}

controller.getRecuperacion= (req,res) =>{
    bcrypt.hash(req.params.newpsw,10)
    .then (hash =>{
        Usuario.findOneAndUpdate({correo: req.params.correorec}, {contraseña: hash}, {new: true}, (err, response) =>{
            if(err){
                console.log(err);
            }
            else{
                console.log(response);
            }
        });
        res.redirect('http://backtrading.com.mx');
    })
    .catch(err => {
        console.log(err);
        res.json({ message: 'error desconocido xd'});
    })
}

module.exports=controller;
