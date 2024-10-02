const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require("jsonwebtoken");
const jwtKey = "infi-e-comm-23";

const app = express();

app.use(express.json());
app.use(cors());

//Code to get the result from the user and save it into the DB
app.post("/register", async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();

    //Code for not showing user's Password delete password
    result = result.toObject(); //converting json data to object
    delete result.password; // we cannot use -password while using save()

    //Code for sending the JWT token on Registartion
    Jwt.sign({result}, jwtKey, {expiresIn: "2h"}, (err, token) => {
        if(err){
             resp.send({result: "Something went wrong, Please try after sometime !"});
        }
         resp.send({result, auth: token});
     })
})

//Code for Login and checks the user's email and password
app.post("/login", async(req, resp)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        //Code for not showing user's Password (-password)

        //Code for sending the JWT token on login
        if(user){
            Jwt.sign({user}, jwtKey, {expiresIn: "2h"}, (err, token) => {
               if(err){
                    resp.send({result: "Something went wrong, Please try after sometime !"});
               }
                resp.send({user, auth: token});
            })
        }
        else{
            resp.send({result : "No User Found !"})
        }
    }
    else{
        resp.send({result:"No User Found !"})
    }
})

// Code for adding the Products in the DB
app.post("/add-product", async (req, resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);      
});

// Code for listing Products on the Page
app.get("/show-products", async(req, resp)=>{
    let products = await Product.find();
    if(products.length>0){
        resp.send(products);               
    }
    else{
        resp.send({result : "No Products found"});
    }
});

// Code for deleting Products from the DB
app.delete("/product/:id", async (req, resp)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    resp.send(result);
});

//Code for getting prefilled data on Update Product Page
app.get("/product/:id", async (req, resp)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({result : "No Records Found !!"});
    }
})

//Code for Updating the Details of Products
app.put("/product/:id", async (req, resp)=>{
    let result = await Product.updateOne(

        {_id : req.params.id},
        {
            $set : req.body
        }

    )
    resp.send(result);
});


//Code for Searching the contents of the Web Page
app.get("/search/:key", async (req, resp)=>{
    let result = await Product.find({
        "$or" : [
            {name: {$regex:req.params.key}},
            {category: {$regex:req.params.key}},
            {brand: {$regex:req.params.key}},
            {price: {$regex:req.params.key}}
        ]
    });
    resp.send(result); 
})

app.listen(5000);