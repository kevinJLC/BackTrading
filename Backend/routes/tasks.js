const router = require('express').Router();
const mongoose = require('mongoose');
const Usuario= require('../models/Usuarios');

const login=require('../controllers/login.controller');
const registro=require('../controllers/registro.controller');
const sistemas = require('../controllers/sistemas.controller');
const autorizacion = require('../middleware/autorizacion');
const recuperacion = require('../controllers/Recuperacion.controller');
const changepass = require('../controllers/changePass.controller');
const empresas = require('../controllers/empresas.controller');
const backtesting = require('../controllers/backtesting.controller');
const trading = require('../controllers/trading.controller');

router.get('/api/usuarios',login.getUsers);


// Inicio de sesion
router.post('/api/login', login.postUser);
router.get('/api/login', login.getUsers);

// Recuperación de cuenta
router.post('/api/recuperar', recuperacion.postRecuperacion);
router.get('/api/recuperar/:token/:newpsw/:correorec', recuperacion.getRecuperacion);

// Actualizar contraseña
router.post('/api/updatepass',autorizacion,changepass.postCambiaContra);

// Registro de usuarios
router.post('/api/registro',registro.postUser);
router.get('/api/activacion/:token/:nombre/:correo/:password/:nacimiento',registro.getActivacion);

// Crear sistemas de trading
router.post('/api/sistemas',autorizacion,sistemas.postSistema);
router.get('/api/sistemas',autorizacion,sistemas.getSistemas);
router.delete('/api/sistemas/:id',autorizacion, sistemas.deleteSistema);
router.post('/api/sistemas/update', autorizacion,sistemas.updateSistema);

// Obtener precios S&P 100
router.get('/api/empresas',empresas.getEmpresas);

// Ejecutar Backtesting
router.post('/api/backtesting',autorizacion,backtesting.postBacktesting);

// Trading Automático
router.post('/api/trading',autorizacion,trading.postTrading);
router.get('/api/trading',autorizacion,trading.getStopTrading);
router.get('/api/trading/status',autorizacion,trading.getStatus);

module.exports=router;
