//I cannot figure out how to get the data dump from mongodb - sorry
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//customer schema
const custschemaData = mongoose.Schema({
    title : String,
    fname : String,
    lname : String,
    mobile : Number,
    email : String,
    haddres1 : String,
    haddress2 : String,
    htown : String,
    hcounty : String,
    heircode : String,
    saddres1 : String,
    saddress2 : String,
    stown : String,
    scounty : String,
    seircode : String,
})

const customerModel = mongoose.model("customer",custschemaData)

//get 
// ​http://localhost:8080/retrieveCustomer
app.get("/retrieveCustomer",async(req,res)=>{
    const data = await customerModel.find({})
    res.json({success : true, data : data})
})

//create
// ​http://localhost:8080/insertCustomer
/*
{
    "title" : "",
    "fname" : "",
    "lname" : "",
    "mobile" : ,
    "email" : "",
    "haddres1" : "",
    "haddress2" : "",
    "htown" : "",
    "hcounty" : "",
    "heircode" : "",
    "saddres1" : "",
    "saddress2" : "",
    "stown" : "",
    "scounty" : "",
    "seircode" : ""
}
*/
app.post("/insertCustomer",async(req,res)=>{
    console.log(req.body)
    const data = new customerModel(req.body)
    await data.save()
    res.send({success : true, message : "customer saved", data : data})
})

//update
// ​http://localhost:8080/updateCustomer
/*
{
    "id" : "",
    "title" : "",
    "fname" : "",
    "lname" : "",
    "mobile" : ,
    "email" : "",
    "haddres1" : "",
    "haddress2" : "",
    "htown" : "",
    "hcounty" : "",
    "heircode" : "",
    "saddres1" : "",
    "saddress2" : "",
    "stown" : "",
    "scounty" : "",
    "seircode" : ""
}
*/
app.put("/updateCustomer",async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body
    console.log(rest)
    const data = await customerModel.updateOne({_id : req.body.id},rest)
    res.send({success : true, message : "customer updated", data : data})
})

//delete
// ​http://localhost:8080/deleteCustomer/id
app.delete("/deleteCustomer/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await customerModel.deleteOne({_id : id})
    res.send({success : true, message : "customer deleted", data : data})
})

//items sold schema
const itemschemaData = mongoose.Schema({
    manufacturer : String,
    model : String,
    price : Number,
})

const itemModel = mongoose.model("item",itemschemaData)

//get 
// ​http://localhost:8080/retrieveItem
app.get("/retrieveItem",async(req,res)=>{
    const data = await itemModel.find({})
    res.json({success : true, data : data})
})

//create
// ​http://localhost:8080/addItem
/*
{
    "manufacturer" : "",
    "model" : "",
    "price" : ""
}
*/
app.post("/addItem",async(req,res)=>{
    console.log(req.body)
    const data = new itemModel(req.body)
    await data.save()
    res.send({success : true, message : "item added", data : data})
})

//update
// ​http://localhost:8080/updateItem
/*
{
    "id" = "",
    "manufacturer" : "",
    "model" : "",
    "price" : ""
}
*/
app.put("/updateItem",async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body
    console.log(rest)
    const data = await itemModel.updateOne({_id : req.body.id},rest)
    res.send({success : true, message : "item updated", data : data})
})

//delete
// ​http://localhost:8080/deleteItem/id
app.delete("/deleteItem/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await itemModel.deleteOne({_id : id})
    res.send({success : true, message : "item deleted", data : data})
})


//orders schema
const orderschemaData = mongoose.Schema({
    fname : String,
    lname : String,
    email : String,
    mobile : Number,
    numitems : Number,
    pricepaid : Number,
})

const orderModel = mongoose.model("order",orderschemaData)

//get 
// ​http://localhost:8080/retrieveOrder
app.get("/retrieveOrder",async(req,res)=>{
    const data = await orderModel.find({})
    res.json({success : true, data : data})
})

//create
// ​http://localhost:8080/addOrder
/*
{
    "fname" : "",
    "lname" : "",
    "email" : "",
    "mobile" : "",
    "numitems" : ,
    "pricepaid" : 
}
*/
app.post("/addOrder",async(req,res)=>{
    console.log(req.body)
    const data = new orderModel(req.body)
    await data.save()
    res.send({success : true, message : "Order added", data : data})
})

//update
// ​http://localhost:8080/updateOrder
/*
{
    "id" = "",
    "fname" : "",
    "lname" : "",
    "email" : "",
    "mobile" : "",
    "numitems" : ,
    "pricepaid" : 
}
*/
app.put("/updateOrder",async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body
    console.log(rest)
    const data = await orderModel.updateOne({_id : req.body.id},rest)
    res.send({success : true, message : "Order updated", data : data})
})

//delete
// ​http://localhost:8080/deleteOrder/id
app.delete("/deleteOrder/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await orderModel.deleteOne({_id : id})
    res.send({success : true, message : "Order deleted", data : data})
})

//connection
mongoose.connect("mongodb+srv://store:paSSword1@store.hiwzp1m.mongodb.net/Store?retryWrites=true&w=majority&appName=Store")
.then(()=>{
    console.log("connected to db")
    app.listen(PORT,()=>console.log("server is running"))
})
.catch(()=>console.log("failed"))

/*
To start db -
open assignment05-22425236 folder in explorer section on vscode
in terminal 
    cd server (to enter server folder)
    npm start (to activate db)


Commands tested with RapidApi client on vscode
guide -
first comment shows what method to use
link comment should be pasted in the link section
each crud method has a comment showing how to use each command

for updating the id has to be added and whatever is being updated should be typed after
for deleting id goes into the link as shown in comments
*/