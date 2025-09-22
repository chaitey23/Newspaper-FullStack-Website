import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllArticles from "../Pages/AllArticles/AllArticles";
import Subscription from "../Pages/Subscription/Subscription";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AddArticles from "../Pages/AddArticles/AddArticles";
import MyArticles from "../Pages/MyArticles/MyArticles";
import MyProfile from "../Pages/MyProfile/MyProfile";
import AdminRoute from "./AdminRoute/AdminRoute";
import DashBoardLayout from "../layouts/DashBoardLayout/DashBoardLayout";
import DashBoardHome from "../Pages/DashBoard/DashBoardHome";
import ArticleDetails from "../Pages/ArticleDetails/ArticleDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [{
            index: true,
            element: <Home></Home>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
            path: "/all-articles",
            element: <AllArticles></AllArticles>
        },
        {
            path: "/article/:id",
            element: <PrivateRoute>
                <ArticleDetails></ArticleDetails>
            </PrivateRoute>
        },
        {
            path: "/subscription",
            element: <Subscription></Subscription>
        },
        {
            path: "/add-articles",
            element: <PrivateRoute>
                <AddArticles></AddArticles>
            </PrivateRoute>
        },
        {
            path: "/my-articles",
            element: <PrivateRoute>
                <MyArticles></MyArticles>
            </PrivateRoute>
        },
        {
            path: "/profile",
            element: <PrivateRoute>
                <MyProfile></MyProfile>
            </PrivateRoute>
        },
        {
            path: "/dashboard",
            element: <AdminRoute>
                <DashBoardLayout></DashBoardLayout>
            </AdminRoute>,
            children: [{
                index: true,
                element: <DashBoardHome></DashBoardHome>
            }]
        }



        ]
    },

]);