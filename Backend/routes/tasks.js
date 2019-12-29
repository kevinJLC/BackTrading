const router = require('express').Router();
const mongoose = require('mongoose');
const Usuario= require('../models/Usuarios');

const login=require('../controllers/login.controller');
const registro=require('../controllers/registro.controller');
const sistemas = require('../controllers/sistemas.controller')
const autorizacion = require('../middleware/autorizacion')

router.get('/',login.getUsers);


// Inicio de sesion
router.post('/login', login.postUser);
router.get('/login', login.getUsers);

// Registro de usuarios
router.post('/registro',registro.postUser);
router.get('/activacion/:token/:nombre/:correo/:password/:nacimiento',registro.getActivacion)

// Crear sistemas de trading
router.post('/sistemas',autorizacion,sistemas.postSistema);
router.get('/sistemas',autorizacion,sistemas.getSistemas);


module.exports=router;
