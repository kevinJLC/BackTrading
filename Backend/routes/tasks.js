const router = require('express').Router();
const mongoose = require('mongoose');
const Usuario= require('../models/Usuarios');

const login=require('../controllers/login.controller');

router.get('/', login.getUsuarios);
router.post('/',login.postUser);
router.get('/:id', login.getUsuario);
router.put('/:id',login.putUsuario);


module.exports=router;