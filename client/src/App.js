import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/shared/layout"
import Product from "./components/store/Product"
import Basket from "./components/store/Basket"
import Contact from "./components/store/contact"
import Login from "./components/store/Login"
import Register from "./components/store/Register"
import LogOut from "./components/store/LogOut"
import Home from "./components/store/home"
import Users from "./components/store/Users"
import NewBornPage from "./components/store/NewBornPage"
import AccessoriesPage from "./components/store/AccessoriesPage"
import DisneyPage from "./components/store/DisneyPage"
import ProductPage from "./components/store/ProductPage"
import ClothesPage from "./components/store/ClothesPage"
import Single from "./components/store/single"
import Ichs from "./components/store/Ichs"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/users" element={<Users />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/newBorn" element={<NewBornPage />} />
            <Route path="/product/accessories" element={<AccessoriesPage />} />
            <Route path="/product/Disney&jeans" element={<DisneyPage />} />
            <Route path="/product/productsp" element={<ProductPage />} />
            <Route path="/product/Clothes" element={<ClothesPage />} />
            <Route path="/product/:_id" element={<Single/>}/>
          </Route>
          <Route path="/game" element={<Ichs/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
