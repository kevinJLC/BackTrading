const Usuario=require('../models/Usuarios');
const controller = {};

  controller.getUsuarios=async (req,res)=>{
    const usuarios= await Usuario.find();
    res.json(usuarios)
  }
  controller.postUser= async (req,res) =>{
    const usuario=new Usuario(req.body)
    await usuario.save();
    res.json({
      status: 'Usuario agregado'
    });
  }

module.exports=controller;
