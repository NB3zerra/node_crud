var express = require('express')
var router = express.Router()

/* GET home page. 
req - contém informações da requisição HTTP que disparou essa function. A
partir dele podemos saber informações do cabeçalho (header) e do corpo (body)
da requisição livremente;

res - é o objeto para enviar uma resposta ao requisitante
(response). Essa resposta geralmente é uma página HTML, mas 
pode ser um arquivo, um objeto JSON, um erro HTTP, ou o que for.

next - é um objeto que permite repassar a requisição para outra função manipular.


o router é o controller que liga o model com a view!!
sintaxe:
router.get('/', function(req,res,next){
  res.render('nome_view',{model_prop : 'Prop_value'})
  - sendo o model um JSON
}

*/

/** Quando recebemos um GET /, a função de callback dessa rota
é disparada e com isso usamos o findAll que acabamos de programar. Por
parâmetro passamos a função callback que será executada quando a consulta
terminar, exibindo um erro (e) ou renderizando a view index com o array de
documentos (docs) como model. */
/* GET home page. */
router.get('/', function (req, res) {
  global.db.findAll((e, docs) => {
    if (e) {
      return console.log(e)
    }
    res.render('index', { title: 'Lista de Clientes', docs: docs })
  })
})

//pagina para inclusão de clientes
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: {"nome":"","idade":""}, action: '/new' });
});

//rota para adicionar o cliente ao banco 
router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.insert({nome, idade}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
})

//rota para buscar um cliente no banco e redirecionar para a tela de edição
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', { title: 'Edição de Cliente', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
})

//rota para dar update no cliente
router.post('/edit/:id',function (req, res) {  
  var id = req.params.id
  var nome = req.body.nome
  var idade = parseInt(req.body.idade)
  global.db.update(id, {nome, idade}, (e, result)=>{
    if(e){
      return console.log(e)
    }
    res.redirect('/')
  })
})

//rota para executar o delete do cliente
router.get('/delete/:id', function (req,res) {  
  var id = req.params.id
  global.db.deleteOne(id, (e,r) =>{
    if(e){return console.log(e)}
    res.redirect('/')
  })
})

module.exports = router
