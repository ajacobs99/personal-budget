const cors = require('cors'); 
const express = require('express'); 
// note : need to use bodyparser 
const bodyParser = require("body-parser"); 

const mongoose = require('mongoose'); 
const budgetModel = require('./models/budget_schema'); 

const app = express();
const port = 3000; 
let url = 'mongodb://localhost:27017/budget'

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); 
app.use('/', express.static('public')); 

app.get('/budget', (req,res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            budgetModel.find({})
                .then((data) => {
                    res.json(data);
                    mongoose.connection.close();  
                })
                .catch((connectionError)=>{
                    console.log(connectionError); 
                }); 
        })
        .catch((connectionError)=> {
            console.log(connectionError); 
        })
    // res.json(budget.json); 
    // res.sendFile('budget.json', {root: __dirname}); 
}); 

app.post('/add_budget', (req, res)=>{
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            budgetItems = {
                title: req.body.title, 
                value: req.body.value, 
                color: req.body.color
                
            }; 
            budgetModel.insertMany(budgetItems)
                .then((data)=>{
                    res.json(data);
                    mongoose.connection.close();  
                })
                .catch((connectionError)=>{
                    console.log(connectionError); 
                }); 
        })
        .catch((connectionError) => {
            console.log(connectionError); 
        }); 
}); 


app.listen(port, () => {
    console.log(`API Served at http://localhost:${port}`); 
}); 

// const budget = {
//     myBudget: [
//     {
//         title: 'Eat out',
//         budget: 30
//     },
//     {
//         title: 'Rent', 
//         budget: 350
//     },
//     {
//         title: 'Groceries', 
//         budget: 90
//     },
// ]}; 
