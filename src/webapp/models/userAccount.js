const mongoose = require('mongoose');


//References Schema
const referenceSchema = mongoose.Schema({
    references:{
        type:String,
        required:true
    }
});


const nameSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    });


//tag schema for research work 
const tagSchema = mongoose.Schema({
    tags:{
        type: String,
        required: true
    }
});



//research_work schema for education_background
const researchWorkSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:[tagSchema],
    members:[nameSchema],
    date:{
        type:Date,
        required: true
    },
    references:[referenceSchema]

});
//project schema for education_background
const projectSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    tags:[tagSchema],
    members:[nameSchema],
    references:[referenceSchema],
    date: {
        type: Date,
        required: true
    }
});
const educationBackgroundSchema = mongoose.Schema({
    degree_name:{
        type: String,
        required: true
    },
    start_date:{
        type: Date,
        required:true
    },
    end_date:{
        type: Date,
        required:true
    },
    university_name:{
        type: String,
        required: true
    },
    grade:{
        type:Number,
        required:true
    },
    projects:[projectSchema]

  

});
//User Details
const userAccountSchema= mongoose.Schema({
    user_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required: true
    },
    photo:{
        type:String,
        required: true
    },
    education_background:[educationBackgroundSchema],
    research_work:[researchWorkSchema]
});


//education background Schema for userAccount




    

const userAccountModel = module.exports = mongoose.model('useraccount', userAccountSchema, 'useraccount');