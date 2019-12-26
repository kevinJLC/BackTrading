const mongoose= require('mongoose');

const URI= 'mongodb://localhost/firstDB';

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(db=> console.log('Conectado a firstDB'))
.catch(err=>console.err(err));

module.exports = mongoose;
