import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import  Button  from "react-bootstrap/Button";

const UpdateProduct = ()=>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        console.warn(params);
        getProductDetails();
    }, [])

    //Code for getting the prefilled product details
    const getProductDetails = async ()=>{
        console.warn(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setBrand(result.brand);
    }

    //Code for updating the details of the Product
    const updateProduct = async()=>{
        console.warn(name,price, category,brand);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method : 'PUT',
            body : JSON.stringify({name,price, category,brand}),
            headers : {
                'Content-Type' : "application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        navigate("/show-products");
    }

    return(
        <div className="product-pg">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter Product Name" className="inputBox prefilled-color" value={name} onChange = {(e)=>{setName(e.target.value)}} />
           
            <input type="text" placeholder="Enter Product Price" className="inputBox prefilled-color"  value={price} onChange={(e)=>{setPrice(e.target.value)}}/>

            <input type="text" placeholder="Enter Category of the Product" className="inputBox prefilled-color" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>

            <input type="text" placeholder="Enter Product Brand" className="inputBox prefilled-color" value={brand} onChange = {(e)=>{setBrand(e.target.value)}} />

            <Button onClick={updateProduct} className="app-button" variant="dark">Update Product</Button>
        </div>
    )
}

export default UpdateProduct;