const express = require('express');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

// Database 
connection
  .authenticate()
  .then(() => {
    console.log('Conexão Feita com o Banco de dados!')
  })
  .catch((msgErro)=> {
    console.log(msgErro);
  })

// express
const app = express();

// usando o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'));

// Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Rotas
app.get('/',(req, res) => {
  Pergunta.findAll({ raw:true, order:[
    ['id','DESC'] // ASC - Crescente 
  ] }).then(perguntas => {
    res.render("index", { perguntas: perguntas });
  });
});

app.get('/perguntar', (req, res) => {
  res.render("formulario.ejs");
});

app.post('/salvarPerguntas', (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao; 
  
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(()=> {
    res.redirect('/');
  });

});

app.get('/pergunta/:id', (req, res) => {
  
  var id = req.params.id;
  
  Pergunta.findOne({
    where:{ id:id }, 
  }).then(pergunta => {
    if(pergunta != undefined){
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [['id', 'DESC']]
      }).then(respostas => {
        res.render("pergunta",{
          pergunta: pergunta,
          respostas: respostas
        });  
      });
    }else{
      res.redirect("/")
    }
  });

});

app.post('/responder',(req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;

  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`);
  });
});

app.listen(3333,()=>{
  console.log('Servidor Iniciado com Sucesso');
});