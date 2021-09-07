/* Lubango news */

const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')



                        //CONFIGURACOES
//body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Sessao
app.use(session({
    secret: 'CursoNode',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

//Middleware
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

//handlebars
app.engine('.hbs', hbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

//public
app.use(express.static(path.join(__dirname, 'public')))

//MONGOOSE
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lubanews_db', {useNewUrlParser: true, useUnifiedTopology: true}
    ).then(()=>{
    console.log('BD lubanews_db conectado com sucesso!')
}).catch((erro)=>{
    console.log('Erro ao conectar a MongoDB' + erro)
})

//ROTAS
app.use('/admin', admin)


//Servidor
app.listen(7733, 'localhost', ()=>{
    console.log('Servidor App, na porta 7733')
})