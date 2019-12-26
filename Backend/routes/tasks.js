const router = require('express').Router();
const mongoose = require('mongoose');
const Usuario= require('../models/Usuarios');

const login=require('../controllers/login.controller');
const registro=require('../controllers/registro.controller');
const autorizacion = require('../middleware/autorizacion')

router.get('/',login.getUsers);


// Inicio de sesion
router.post('/login', login.postUser);
router.get('/login', login.getUsers);

// Registro de usuarios
router.post('/registro',autorizacion,registro.postUser);


module.exports=router;
