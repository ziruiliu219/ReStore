import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/catalog/home/HomePage";
import Catalog from "../../features/catalog/catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/catalog/about/AboutPage";
import ContactPage from "../../features/catalog/contact/ContactPage";
import ServerError from "../errors/serverErrors";
import NotFound from "../errors/NotFound";

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
            {path:'server-error',element:<ServerError/>},
            {path:'not-found',element:<NotFound/>},
            {path:'*',element: <Navigate replace to='/not-found' />},

        ]
    }
])