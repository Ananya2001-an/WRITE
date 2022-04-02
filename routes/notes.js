const express = require('express')
const router = express.Router()
const Note = require('../models/notes')

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

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

router.get('/:id', async(req, res)=>{
    const note = await Note.findById(req.params.id)
    res.render('notes/show', {note: note})
})

router.get('/:id/edit', async(req, res)=>{
    const note = await Note.findById(req.params.id)
    res.render('notes/edit', {note: note})
})

router.put('/:id', async(req, res)=>{
  let note
    try{
    note = await Note.findById(req.params.id)
    note.name = req.body.name
    note.note = req.body.note
    
    savecover(note, req.body.cover)
        
    await note.save()
    res.render('notes/show',{note: note})
    }catch{
        if(note == null)
        res.redirect('/')
        else{
            res.render('notes/edit', {
                note: note,
                errorMessage: 'Error updating note!'
            })
        }
        
    }
})

router.delete('/:id', async(req, res)=>{
    let note
    try{
        note = await Note.findById(req.params.id)
        await note.remove()
        res.redirect('/notes')
    }catch{
        if(note == null)
        {res.redirect('/')}
        else{
            res.redirect(`/notes/${note.id}`)
        }

    }
})

router.post('/', async(req, res)=>{
    const note = new Note({
        name: req.body.name,
        note: req.body.note
    })
    savecover(note, req.body.cover)
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

function savecover(note, coverencoded)
{
    if(coverencoded == null)return
    const covernew = JSON.parse(coverencoded)
    if(covernew !=null && imageMimeTypes.includes(covernew.type))
    {
        note.cover = new Buffer.from(covernew.data, 'base64')
        note.coverType = covernew.type
    }
}
module.exports = router