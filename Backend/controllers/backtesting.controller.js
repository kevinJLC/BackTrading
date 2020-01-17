const Sistema = require('../models/Sistemas');

const controller ={};

controller.postBacktesting = (req,res) =>{
    


    console.log(req.body.sistema);
    console.log(req.body.condicion);
    res.json({message: "hola desde el controlador"});
}

module.exports=controller;