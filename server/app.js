const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')

app.use(bodyParser.json())
const mongoUri = "mongodb+srv://o310:aQ2YaSP389PUmmq@cluster0.iagbf.mongodb.net/<dbname>?retryWrites=true&w=majority"

const Employee=mongoose.model("employee")

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on("connected",()=>{
    console.log("connected to mongo")
})
mongoose.connection.on("error",(err)=>{
    console.log("error",err)
})
app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})
app.post('/send-data',(req,res)=>{
     const employee = new Employee({
         name:req.body.name,
         email:req.body.email,
         salary:req.body.salary,
         phone:req.body.phone,
         position:req.body.position,
         picture:req.body.picture
     })
     employee.save()
     .then(data=>{
         console.log(data)
    res.send("success")
}).catch(err=>{
    console.log(err)
})
})
app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)

    }).catch(err=>{
        console.log(err)
    })
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
         email:req.body.email,
         salary:req.body.salary,
         phone:req.body.phone,
         position:req.body.position,
         picture:req.body.picture
    }).then(data=>{
        console.log(data)
        res.send(data)
    
    })
    .catch(err=>{
        console.log(err)
    })
})

app.listen(3000,()=>{
    console.log('Server running')
})

// {
    // "name":"omar",
    // "email":"hi",
    // "salary":"12",
    // "phone":"13",
    // "position":"junior dev",
    // "picture":"j"
// }