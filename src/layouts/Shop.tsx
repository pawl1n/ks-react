import { Route, Routes } from "react-router-dom";

// import pages
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";

// import Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Login } from "../pages/Login";

const Shop = () => {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Sidebar />
      <Footer />
    </div>
  );
};

export default Shop;
