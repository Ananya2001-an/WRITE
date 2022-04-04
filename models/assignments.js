const mongoose = require('mongoose')

const assignSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    deadline:{
        type: Date,
        required: true
    },

    subject:{
        type: String,
        required: true
    },

    priority:{
        type: Boolean,
        required: true
    },

    assignpdf:{
      type: Buffer,
      required: false
    },
    assignpdfType:{
        type: String,
        required: false
    },

    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

assignSchema.virtual('assignpdfPath').get(function(){
    if (this.assignpdf != null){
        return `data:${this.assignpdfType};charset=utf-8;base64,${this.assignpdf.toString('base64')}`
    }
})

module.exports = mongoose.model('Assign', assignSchema)
