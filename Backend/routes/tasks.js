const router = require('express').Router();

router.get('/api',(req, res, next)=>{
  res.send('Hola desde las task')
});

module.exports=router;
