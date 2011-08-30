Array.prototype.add = function(el) {
  this[this.length] = el;
  return this;
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
cursos.add({id: 1, nome: "Javascript Fundamental"});

app.get('/cursos', function(req, res){
  res.send(JSON.parse(cursos));
});

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

app.post('/cursos', function(req, res){

  console.log(req.rawBody);

  //var objeto = req.rawBody;
  var objeto = req.body.objeto;
  objeto['id'] = 1;
  
  //cursos.add(JSON.parse(objeto));
  res.send(JSON.parse(objeto));
});

app.get('/djr', function(req, res){
  var arr = [];
  for(var name in req) {
    //console.log(name);
    arr.add[name];
  }
  console.log(app);
  res.send("teste");
});

app.use(express.errorHandler({ showStack: true }));
app.use(express.staticProvider(__dirname));
app.listen(8001);

