const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const {getDataBase,ObjectID} = require('./db');

app.engine('hbs',exhbs.engine({layoutsDir:'./views',defaultLayout:'main',extname:'hbs'}))
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

    let employeesCollection = await getDataBase();
    const employees = await employeesCollection.find().toArray();


    res.render('main',{message,employees})
})

app.get('/edit_details/:id',async (req,res)=>{
    let fetch_id = req.params.id;
    let employeesCollection = await getDataBase();
    const employees = await employeesCollection.find().toArray();
    let edit_details = await  employeesCollection.findOne({_id: new ObjectID(fetch_id)});

 res.render('main',{employees,edit_details});
})

app.post('/post_empdetails',async (req,res)=>{
    let employeesCollection = await getDataBase();
    let empName = req.body.name;
    let empAge = req.body.age;
    let empPosition = req.body.position;
    let empSalary = req.body.salary;
    await employeesCollection.insertOne({name:empName,age:empAge,position:empPosition,salary:empSalary});
    res.redirect('/?status=1')
})

app.post('/edit_empdetails/:id',async (req,res)=>{
    let fetchedId = req.params.id;
    let empName = req.body.name;
    let empAge = req.body.age;
    let empPosition = req.body.position;
    let empSalary = req.body.salary;
    let employeesCollection = await getDataBase();
          await employeesCollection.updateOne({_id:new  ObjectID(fetchedId)},{$set: {name:empName,age:empAge,position:empPosition,salary:empSalary}});

     res.redirect('/?status=2')
})

app.get('/delete_details/:id',async (req,res)=>{
    let fetchedId = req.params.id;
    let employeesCollection = await getDataBase();
          await employeesCollection.deleteOne({_id:new ObjectID(fetchedId)});
   res.redirect('/?status=1')
})

app.listen(8000,()=> console.log('server is running successfully'));