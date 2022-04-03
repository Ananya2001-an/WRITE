const express = require('express')
const router = express.Router()
const Assign = require('../models/assignments')

router.get('/', async(req, res)=>{
    let searchOptions = {}
    if(req.query.name !=null && req.query.name !== '')
    {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const assignments = await Assign.find(searchOptions)
        res.render('assignments/index',{
            assignments: assignments,
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }

})
router.get('/new', (req, res)=>{
    res.render('assignments/new', {assignment: new Assign()})
})

router.post('/', async(req, res)=>{
    const assignment = new Assign({
        name: req.body.name,
        deadline: new Date(req.body.deadline),
        subject: req.body.subject,
        priority: req.body.priority
    })

    if(req.body.assignpdf != null && req.body.assignpdf != '')
    {
        savepdf(assignment, req.body.assignpdf)
    }

    try{
       const newassign = await assignment.save()
       res.redirect(`assignments/${newassign.id}`)
    }catch{
        renderNewPage(res, assignment, true)
    }
})


router.get('/:id', async(req, res)=>{
    const assignment = await Assign.findById(req.params.id)
    res.render('assignments/show', {assignment: assignment})
})

router.get('/:id/edit', async(req, res)=>{
    const assignment = await Assign.findById(req.params.id)
    res.render('assignments/edit', {assignment: assignment})
})

router.put('/:id', async(req, res)=>{
    let assignment
    try{
    assignment = await Assign.findById(req.params.id)
    assignment.name = req.body.name
    assignment.deadline = new Date(req.body.deadline)
    assignment.subject = req.body.subject
    assignment.priority = req.body.priority
    if(req.body.assignpdf != null && req.body.assignpdf != '')
    {
        savepdf(assignment, req.body.assignpdf)
    }
    
    await assignment.save()
    res.redirect(`assignments/${assignment.id}`)
    }
    catch{
        if(assignment == null)
        {res.redirect('/')} 
        else{
            renderEditPage(res, assignment, true)
        }
       
    }
})

router.delete('/:id', async(req, res)=>{
    let assignment
    try{
        assignment = await Assign.findById(req.params.id)
        await assignment.remove()
        res.redirect('/assignments')
    }catch{
        if(assignment == null)
        {res.redirect('/')}
        else{
            res.render('assignments/show',{
                assignment: assignment,
                errorMessage: 'Could not remove assignment!'
            })
        }

    }
})

async function renderNewPage(res, assignment, hasError = false) {
    renderFormPage(res, assignment, 'new', hasError)
  }
  
async function renderEditPage(res, assignment, hasError = false) {
    renderFormPage(res, assignment, 'edit', hasError)
  }
  
async function renderFormPage(res, assignment, form, hasError = false) {
    try {
      const params = {
        assignment: assignment
      }
      if(hasError)
      {
        if(form === 'edit')
        {
          params.errorMessage = 'Error Updating assignment'
        }else{
          params.errorMessage = 'Error Creating assignment'
        }
      }
      res.render(`assignments/${form}`, params)
  
    } catch {
      res.redirect('/assignments')
    }
  }


function savepdf(assignment, pdfencoded)
{
    if(pdfencoded == null) return
    const assignpdfnew = JSON.parse(pdfencoded)
    if(assignpdfnew != null && assignpdfnew.type == 'application/pdf')
    {
    assignment.assignpdf = new Buffer.from(assignpdfnew.data, 'base64')
    assignment.assignpdfType = assignpdfnew.type
    }
}
module.exports = router