const express = require('express')
const router = express.Router()
const Note = require('../models/notes')

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

router.get('/', async(req, res)=>{
    let searchOptions = {}
    if(req.query.name !=null && req.query.name !=='')
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
    if(req.body.cover != null && req.body.cover != '')
    {
        savecover(note, req.body.cover)
    }
    try{
        const newnote = await note.save()
        res.redirect(`notes/${newnote.id}`)
    }catch{
        renderNewPage(res, note, true)
    }
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
    
    if(req.body.cover != null && req.body.cover != '')
    {
        savecover(note, req.body.cover)
    }
        
    await note.save()
    res.redirect(`notes/${note.id}`)
    
    }catch{
        if(note == null)
        {res.redirect('/')}
        else{
           renderEditPage(res, note, true)
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
            res.render('notes/show',{
                note: note,
                errorMessage: 'Could not remove note!'
            })
        }

    }
})

async function renderNewPage(res, note, hasError = false) {
    renderFormPage(res, note, 'new', hasError)
  }
  
async function renderEditPage(res, note, hasError = false) {
    renderFormPage(res, note, 'edit', hasError)
  }
  
async function renderFormPage(res, note, form, hasError = false) {
    try {
      const params = {
        note: note
      }
      if(hasError)
      {
        if(form === 'edit')
        {
          params.errorMessage = 'Error Updating note'
        }else{
          params.errorMessage = 'Error Creating note'
        }
      }
      res.render(`notes/${form}`, params)
  
    } catch {
      res.redirect('/notes')
    }
  }




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