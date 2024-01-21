import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/catalog/home/HomePage";
import Catalog from "../../features/catalog/catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/catalog/about/AboutPage";
import ContactPage from "../../features/catalog/contact/ContactPage";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {path:'',element:<HomePage/>},
            {path:'catalog',element:<Catalog/>},
            {path:'catalog/:id',element:<ProductDetails/>},
            {path:'about',element:<AboutPage/>},
            {path:'contact',element:<ContactPage/>},

        ]
    }
])