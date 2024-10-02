import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import  Button  from "react-bootstrap/Button";
import { Link } from "react-router-dom";


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/show-products",{
      //Sending JWT token to the Product Page
      headers : {
        authorization : JSON.parse(localStorage.getItem("token"))
      }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) =>{
    let result = await fetch(`http://localhost:5000/product/${id}`,{
      method: "Delete"
    });

    result = await result.json();
    if(result){
      getProducts();
    }
  };

  const searchHandle = async (event) =>{
    let key = event.target.value;
    let key_upper = key.toUpperCase();
    let key_lower = key.toLowerCase();
 
    if ( key_upper || key_lower){
      let result = await fetch(`http://localhost:5000/search/${key}`)
      result = await result.json();

      if(result){
      setProducts(result);
      }
    }else{
      getProducts();
    }
    

  }

  return (
    <div>

      <div className="container">
        <div className="row py-3">
          <div className="col-6">
            <h3>Product List</h3>
          </div>
          <div className="col-6">
            <input type="text" placeholder="Type here to search the products" onChange={searchHandle} className="rounded-pill search-box" />
          </div>
        </div>
      </div>

      <Table striped responsive="md" variant="dark" className="border-white">
        <thead>
          <tr>
            <td>S. No</td>
            <td>Name</td>
            <td>Price</td>
            <td>Category</td>
            <td>Brand</td>
            <td colSpan={2} className="text-center">Utility</td>
          </tr>
        </thead>

        {
          //Code for searching the products and displaying the result if no items are found
          products.length>0 ? products.map((item, index) => 
                <tbody>
                    <tr>
                      <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>{item.brand}</td>
                        <td><Button variant="danger" onClick={()=>deleteProduct(item._id)}>Delete</Button></td>
                        <td><Button variant="warning"><Link to={"/update/" + item._id} className="util-links">Update</Link></Button></td>
                    </tr>
                </tbody>
            )
            :<h1>No Result Found !!!</h1>
        }

      </Table>

      

      

    </div>
  );
};

export default ProductList;
