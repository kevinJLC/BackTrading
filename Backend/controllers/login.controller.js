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
  };
  controller.getUsuario=async (req,res) =>{
    const usuario= await Usuario.findById(req.params.id);
    res.json(usuario);
  };
  controller.putUsuario=async (req,res)=>{
    const {id} = req.params;
    const usuario={
      nombre: req.body.nombre,
      correo: req.body.correo,
      contraseña: req.body.contraseña,
      nacimiento: req.body.nacimiento
    }
    await Usuario.findByIdAndUpdate(id,{$set: usuario},{new:true});
    res.json({
      status: 'Usuario actualizado'
    })
  };

  

module.exports=controller;
