const mongoose= require('mongoose');

const URI= 'mongodb://localhost/firstDB';

mongoose.connect(URI)
.then(db=> console.log('Conectado a firstDB'))
.catch(err=>console.err(err));

module.exports = mongoose;
