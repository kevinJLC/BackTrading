const Usuario=require('../models/Usuarios');
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');


const controller = {};

controller.postCambiaContra=(req, res) =>{
    Usuario.findOne({_id: req.userData.id})
    .then(result => {
        return bcrypt.compare(req.body.nowContra, result.contraseña);
    })
    .then(found =>{
        if(!found)
        {
            res.json(false);
        }
        else
        {
            bcrypt.hash(req.body.newContra,10)
            .then (hash =>{ 
                Usuario.findByIdAndUpdate(req.userData.id, {contraseña: hash})
                .then(user =>{
                    console.log(user);
                    res.json(true);
                })
                .catch(err =>{
                    res.json(false);
                })
             })
            .catch(err => {
                console.log(err);
                res.json({ message: 'no se pudo encriptar la contraseña'});
            })  
        }
    })
    .catch(err =>{
        res.json(err);
    })
}

module.exports=controller;