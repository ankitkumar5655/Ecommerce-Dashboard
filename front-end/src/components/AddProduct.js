import React, {useState} from "react";
import  Button  from "react-bootstrap/Button";

const AddProduct = ()=>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [error, setError] = useState(false);

    const addProduct = async()=>{

        if(!name || !price || !category || !brand){
            setError(true);
            return false;
        }



        const userID = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch("http://localhost:5000/add-product",{
            method : "post",
            body: JSON.stringify({name, price, category, brand, userID}),
            headers : {
                "Content-Type":"application/json"
            }
        });
        result = await result.json();
        console.warn(result);
    }

    return(
        <div className="product-pg">
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter Product Name" className="inputBox" value={name} onChange = {(e)=>{setName(e.target.value)}} />
            {/* Checking if the name is not entered then show error message */}
            {error && !name && <span className="invalid-input">Enter valid name ! </span>}

            <input type="text" placeholder="Enter Product Price" className="inputBox"  value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            {/* Checking if the price is not entered then show error message */}
            {error && !price && <span className="invalid-input">Enter valid price ! </span>}

            <input type="text" placeholder="Enter Category of the Product" className="inputBox" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            {/* Checking if the category is not entered then show error message */}
            {error && !category && <span className="invalid-input">Enter valid category ! </span>}

            <input type="text" placeholder="Enter Product Brand" className="inputBox" value={brand} onChange = {(e)=>{setBrand(e.target.value)}} />
            {/* Checking if the brand is not entered then show error message */}
            {error && !brand && <span className="invalid-input">Enter valid brand ! </span>}

            <Button onClick={addProduct} className="app-button" variant="dark">Add Product</Button>
        </div>
    )
}

export default AddProduct;