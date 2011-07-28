Array.prototype.add = function(el) {
  this[this.length] = el;
  return this;
};

var express = require('express'),
  crypto = require('crypto');

var app = express.createServer();
app.set('views', __dirname + '/views');
app.register('.html', require('ejs'));
app.set('view engine', 'html');

app.use(express.bodyDecoder());
app.use(express.cookieDecoder());
app.use(express.session({ secret: 'milfont' }));

app.get('/', function(req, res) {
  res.send("Javascript Fundamental");
});

var instrutores = [{id:10, nome:"Christiano Milfont"}];
var cursos = [];
cursos.add({
  instrutores: instrutores, nome: "Javascript Fundamental"
});

app.get('/cursos', function(req, res){
  res.send(JSON.stringify(cursos));
});

app.get('/instrutores', function(req, res){ 
  res.send(JSON.stringify(instrutores));
});

app.post('/cursos', function(req, res){

  console.log(req.rawBody);

  //var objeto = req.rawBody;
  var objeto = req.body.objeto;
  
  cursos.add(JSON.parse(objeto));
  res.send(JSON.parse(objeto));
});

app.use(express.errorHandler({ showStack: true }));
app.use(express.staticProvider(__dirname));
app.listen(8001);

