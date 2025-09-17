import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import AddRecipesPage from "../pages/AddRecipesPage/AddRecipesPage";
import RecipesInfoPage from "../pages/RecipesInfoPage/RecipesInfoPage";
import MyPage from "../pages/MyPage/MyPage";


export const router = createBrowserRouter([
    {
        path: "/", element:<MainLayout/>, children:[
            {index:true, element:<HomePage/>},
            {path:"/login", element:<LoginPage/>},
            {path:"/addrecipe", element:<AddRecipesPage/>},
            {path:"/me", element:<MyPage/>},
            {path:"/info", element:<RecipesInfoPage/>}
        ]
    }
])