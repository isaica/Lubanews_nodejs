//FICHEIRO RESPONSAVEL PELA BD
const mongoose = require('mongoose')
const Schema = mongoose.Schema;



//dFENIR O model Categorias
const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    data: {
        type: Date,
        default: Date.now()
    }
})


mongoose.model('categorias', Categoria)

