// VARIABLES
const express = require('express');

const Poems = require('../functions/poems')

// Initialisation
var router = express.Router();

// ROUTES
// Index
router.get("/", (req, res) => {
    res.render('pages/index')
})

// Affiche les poèmes
router.get("/poems", (req, res) => {
    let poems = Poems.getPoems()

    res.render('pages/poems', {poems : poems})
})

router.post("/poems", (req, res) => {
    let poem = Poems.createPoem(req.body.author, req.body.text)

    Poems.addPoem(poem)
    
    res.render('pages/index', {alert : "Ajout effectué"})
})

// Affiche 1 poème
router.get("/poems/:id", (req, res) => {
    let poem = Poems.getPoem(req.params.id)
    let author = Poems.getAuthor(poem.author)

    res.render('pages/poem', {poem : poem, author : author})
})

// Affiche les auteurs
router.get("/authors", (req, res) => {
    let authors = Poems.getAuthors();

    res.render('pages/authors', {authors : authors})
})

router.post("/authors", (req, res) => {
    let author = Poems.createAuthor(req.body.firstname, req.body.lastname, req.body.birthday, req.body.age, req.body.adr_number, req.body.adr_street, req.body.adr_city, req.body.adr_cde, req.body.adr_country, req.body.phone)


    Poems.addAuthor(author)
    
    res.render('pages/index', {alert : "Ajout effectué"})
})


// Affiche 1 auteur
router.get("/authors/:id", (req, res) => {
    let author = Poems.getAuthor(req.params.id)
    let poems = Poems.getPoemsByAuthor(author.id)
    
    res.render('pages/author', {author : author, poems : poems})
})

router.get("/add/poem", (req, res) => {
    res.render('pages/addPoems', {authors : Poems.getAuthors()})
})

router.get("/add/author", (req, res) => {
    res.render('pages/addAuthor')
})

// EXPORT
module.exports = router;