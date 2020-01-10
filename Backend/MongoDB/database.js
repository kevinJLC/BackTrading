const mongoose= require('mongoose');

const URI= 'mongodb+srv://developer:QLm5pkgvEtmBOx73@cluster0-dmvlm.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(db=> console.log('Conectado a mongo Atlas/Backtrading'))
.catch(err=>console.log(err));

module.exports = mongoose;
