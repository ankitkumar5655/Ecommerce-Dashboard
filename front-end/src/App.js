import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">

        <BrowserRouter>
          <Nav />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/show-products" element={<ProductList />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/update/:id" element={<UpdateProduct />}/>
              <Route path="/logout" element={<h1>Logout Component</h1>} />
              <Route path="/profile" element={<h1>Profile Component</h1>} />
            </Route>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route path="/policy" element={<h1>Welcome to Privacy Policy page</h1>} />
            <Route path="/terms-of-service" element={<h1>Welcome to Terms of Service Page</h1>} />
            <Route path="/sitemap" element={<h1>Welcome to Sitemap page</h1>} />
          </Routes>
        </BrowserRouter>
      </div>

      <Footer />
    </div>
  );
}

export default App;
