Array.prototype.add = function(el) {
  this[this.length] = el;
  return this;
};

//http://ejohn.org/blog/javascript-array-remove/
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var express = require('express'),
  crypto = require('crypto');

//crypto.createHash('md5').update("cmilfont@gmail.com").digest("hex");

var app = express.createServer();
app.set('views', __dirname + '/views');
app.register('.html', require('ejs'));
app.set('view engine', 'html');

app.use(express.bodyDecoder());
app.use(express.cookieDecoder());
app.use(express.session({ secret: 'milfont' }));

app.use(app.router);

app.get('/', function(req, res) {
  res.send("Javascript Fundamental");
});

var instrutores = [{id:10, nome:"Christiano Milfont"}];
var cursos = [];
cursos.add({id: 1, 
    nome: "Javascript Fundamental", 
    date: "01/01/2011", 
    description:"", 
    value: "100",
    empresa: {
    	id: 1
    }
});
var cursos_id = 2;

app.get('/instrutores', function(req, res){ 
  res.send(JSON.stringify(instrutores));
});

var oportunidades = [
  {
    id:1
    , data: "2011-08-01"
    , expira: "2011-12-31"
    , descricao: "Teste"
    , empresa: {
      nome: "Milfont Consulting"
    }
    , produto: {
      nome: "Treinamento Javascript Fundamental"
    }
  }
];
app.get('/oportunidades:format', function(req, res){ 
  res.send(JSON.stringify({data: oportunidades}));
});

app.get('/cursos', function(req, res){
  res.send(cursos);
});

app.get('/cursos/:id', function(req, res){
	var curso = {};
	  for(var i = 0; i < cursos.length; i++) {
        var temp = cursos[i];
        if(req.params.id == temp.id) {
            curso = temp;
        }
      }
  res.send(curso);
});

app.post('/cursos', function(req, res){
  console.log(req.rawBody);
  var objeto = JSON.parse(req.rawBody);
  objeto['id'] = cursos_id;
  cursos_id +=1;
  cursos.add(objeto);
  res.send(objeto)
  //res.send(cursos);
});

app.put('/cursos/:id', function(req, res){
  console.log(req.rawBody, req.params.id);
  var objeto = JSON.parse(req.rawBody);
  for(var i = 0; i < cursos.length; i++) {
  	var temp = cursos[i];
  	if(objeto.id == temp.id) {
  		cursos[i] = objeto;
  	}
  }
  res.send(objeto);
});

app.delete('/cursos/:id', function(req, res){
  console.log(req.rawBody, req.params.id);
  var objeto = JSON.parse(req.rawBody);
  for(var i = 0; i < cursos.length; i++) {
    var temp = cursos[i];
    if(objeto.id == temp.id) {
        cursos.remove(i, i);
    }
  }
  res.send(cursos);
});

app.use(express.errorHandler({ showStack: true }));
app.use(express.staticProvider(__dirname));
app.listen(8001);