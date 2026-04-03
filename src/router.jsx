import { createHashRouter } from "react-router";
import FrontendLayout from "./layout/FrontendLayut.jsx";
import Home from "./views/front/Home.jsx";
import Products from "./views/front/Products.jsx";
import SingleProduct from "./views/front/SingleProduct.jsx";
import Cart from "./views/front/Cart.jsx";
import NotFound from "./views/front/NotFound.jsx";
import About from "./views/front/About.jsx";
import AboutCrystal from "./views/front/AboutCrystal.jsx";
import ReturnAndExchangePolicy from "./views/front/ReturnAndExchangePolicy.jsx";
import Checkout from "./views/front/Checkout.jsx";
import ShoppingInfo from "./views/front/ShoppingInfo.jsx";
import Login from "./views/front/Login.jsx";
import AboutBrand from "./views/front/AboutBrand.jsx";
import AdminProducts from "./views/admin/AdminProducts.jsx";
import Locations from "./views/front/Locations.jsx";


export const router = createHashRouter([
    {  
        path: "/",
        element: <FrontendLayout />,
        children: [
            {    
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                element: <About />, 
            },
            {
                path: "aboutcrystal",
                element: <AboutCrystal />, 
            },
            {
                path: "aboutbrand",
                element: <AboutBrand />, 
            },
            { path: "locations",
              element: <Locations />, 
            },  
            
            {path: "ShoppingInfo",
                element: <ShoppingInfo />,
            },
            {
                path: "return-exchange",
                element: <ReturnAndExchangePolicy />, 
            },
            {
                path: "products",
                element: <Products />, 
            },
            {
               path: "product/:id",
                element: <SingleProduct />, 
            },
            {
                path:"cart",
                element:<Cart />,
            },
            {
                path:"checkout",
                element:<Checkout />,
            },
            
             {
                path:"login",
                element:<Login />,
            },

             {
                path: "/admin/products",
                element: <AdminProducts />,
             }

]
},{
    path: "*",
    element: <NotFound />,
}  
]);