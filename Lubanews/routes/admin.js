/* PAINEL ADMIN DO BLOG */


const express = require('express') 
const router = express.Router()
const mongoose = require('mongoose')
require('../models/categoria')
const Categoria = mongoose.model('categorias')



//Rotas da pagina
router.get('/', (req, res)=>{
    res.render('admin/index')
})

router.get('/posts', (req, res)=>{
    res.send('Pagina de postegens')
})

router.get('/categorias', (req, res)=>{
    Categoria.find().then((categorias)=>{ //Exibir a lista de categorias na Pagina Categirias
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err)=>{
        req.flash('error_msg', 'Houve erro ao listar as categorias')
        res.redirect('/admin')
    })
})

router.get('/categorias/add', (req, res)=>{
    res.render('admin/addcategorias')
})



router.post('/categorias/nova', (req, res)=>{
    //Validacao
    var erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Nome invalido'})
    }
    
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: 'Slug invalido'})
    }

    if(req.body.nome.length < 2){
        erros.push({texto: 'Nome da categoria muito pequena'})
    }

    if(erros.length > 0){ //Se tiver mais d um erro,eh pq xta errado
        res.render('admin/addcategorias', {erros: erros})
    }
    else{
        //Cadastramento
    const NovaCategoria = {

        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(NovaCategoria).save().then(()=>{
        req.flash('success_msg', 'Categoria salva com sucesso')
        res.redirect('/admin/categorias')
    }).catch((err)=>{
        req.flash('error_msg', 'Houve erro ao salvar a categoria')
        res.redirect('/admin')
    })
    }
    
})


module.exports = router