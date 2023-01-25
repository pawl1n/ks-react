import {useState} from "react";
import "./App.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

// import pages
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

// import Componen¡ts
import Header from './components/Header';
import Footer from './components/Footer';
import CartItem from "./components/CartItem";
import Hero from "./components/Hero";
import Product from "./components/Product";
import Sidebar from "./components/Sidebar";

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div className='overflow-hidden'>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='products/:id' element={<ProductDetails/>}/>
                </Routes>
                <Sidebar/>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
