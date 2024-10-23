const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const bookModel = require('./models/bookSchema');
const {getDataBase} = require('./db');
getDataBase();

app.engine('hbs',exhbs.engine({layoutsDir:'./views',defaultLayout:'main',extname:'hbs',runtimeOptions:{
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
}}))

app.set('view engine','hbs')
app.set('views','views');
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',async (req,res)=>{
    let message;

    if(req.query.status == '1'){
       message = 'User successfully inserted!'
    }
    else if(req.query.status == '2') message = 'user edited successfully';
    else{
        message = 'something went wrong'
    }

    let employees = await bookModel.find({})

    res.render('main',{message,employees})
})

app.get('/edit_details/:id',async (req,res)=>{
    let fetch_id = req.params.id;
   
    let employees = await bookModel.find({})
    let edit_details = await  bookModel.findOne({_id: fetch_id});

 res.render('main',{employees,edit_details});
})

app.post('/post_empdetails',async (req,res)=>{
   
    let empName = req.body.name;
    let empAge = req.body.age;
    let empPosition = req.body.position;
    let empSalary = req.body.salary;
    let newUserDetails = await new bookModel({name:empName,age:empAge,position:empPosition,salary:empSalary});
    newUserDetails.save()
    res.redirect('/?status=1')
})

app.post('/edit_empdetails/:id',async (req,res)=>{
    let fetchedId = req.params.id;
    let empName = req.body.name;
    let empAge = req.body.age;
    let empPosition = req.body.position;
    let empSalary = req.body.salary;
          await bookModel.findOneAndUpdate({_id:fetchedId},{$set: {name:empName,age:empAge,position:empPosition,salary:empSalary}});

     res.redirect('/?status=2')
})

app.get('/delete_details/:id',async (req,res)=>{
    let fetchedId = req.params.id;
          await bookModel.deleteOne({_id:fetchedId});
   res.redirect('/?status=1')
})

app.listen(8000,()=> console.log('server is running successfully'));