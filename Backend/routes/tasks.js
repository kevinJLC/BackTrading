const router = require('express').Router();
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SomeModelSchema = new Schema();
var db = mongoose.model('db', SomeModelSchema) 

// get para obtener todo, una consulta general
router.get('/tasks',(req, res, next)=>{
  db.find((err, tasks) => { 
    if(err) return next(err);
    res.json(tasks);
  })
});

router.get('/tasks/:id',(req, res, next)=>{
  db.findOne({_id: mongoose.Types.ObjectId(req.params._id)}, (err, task) => {
    if(err) return next(err);
    res.json(task);
  })
});

router.post('/tasks',(req, res, next)=>{
  
  const task = req.body;
  if(!task.title || !(task.isDone + '')){
    res.status(400).json({
      error: 'Bad data'
    });
  }
  else{
    db.save(task, (err, task) => {
      if(err) return next(err);
     res.json(task);
    });
  }
});

router.delete('/tasks/:id', (res, req, next)=>{
  db.remove({_id: mongoose.Types.ObjectId(req.params._id)}, (err, result)=>{
    if(err) return next(err);
     res.json(result);
  });
});

router.put('/tasks/:id', (req, res, next) =>{
  const task = req.body;
  const updateTask={};

  if(task.isDone){
    updateTask.isDone = task.isDone;
  }

  if(task.title){
    updateTask.title = task.title;
  }

  if(!updateTask){
    res.status(400).json({
      error: 'Bad Request'
    });
  }
  else{
    db.update({_id: mongoose.Types.ObjectId(req.params._id)}, (err, task)=>{
      if(err) return next(err);
      res.json(task);
    });
  }
  
});
router.post('api',(req,res,next)=>{
  
})
module.exports=router;
