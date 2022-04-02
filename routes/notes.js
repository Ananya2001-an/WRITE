const express = require('express')
const router = express.Router()
const Note = require('../models/notes')

router.get('/', async(req, res)=>{
    let searchOptions = {}
    if(req.query.name !=null && req.query.name !='')
    {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const notes = await Note.find(searchOptions)
        res.render('notes/index', {
            notes: notes,
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }
})
router.get('/new', (req, res)=>{
    res.render('notes/new', {note: new Note()})
})

router.post('/', async(req, res)=>{
    const note = new Note({
        name: req.body.name,
        note: req.body.note
    })

    try{
        const newnote = await note.save()
        res.redirect('/notes')
    }catch{
        res.render('notes/new', {
            note: note,
            errorMessage: 'Error creating note!'
        })
    }
})
module.exports = router