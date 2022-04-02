const express = require('express')
const router = express.Router()
const Assign = require('../models/assignments')

router.get('/', async(req, res)=>{
    let searchOptions = {}
    if(req.query.name !=null && req.query.name != '')
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

    savepdf(assignment, req.body.assignpdf)

    try{
       const newassign = await assignment.save()
       res.redirect('/assignments')
    }catch(err){
        console.log(err)
        res.render('assignments/new',{
            assignment: assignment,
            errorMessage: 'Error creating assignment!' 
        } )
    }
})

function savepdf(assignment, pdfencoded)
{
    if(pdfencoded == null) return
    const assignpdfnew = JSON.parse(pdfencoded)
    if(assignpdfnew != null && assignpdfnew.type == 'application/pdf')
    {
    assignment.assignpdf = new Buffer.from(assignpdfnew.data, 'base64')
    }
}
module.exports = router