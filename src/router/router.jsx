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
import DashBoardLayout from "../layouts/DashBoardLayout/DashBoardLayout";
import ArticleDetails from "../Pages/ArticleDetails/ArticleDetails";
import MyAddArticlesDetails from "../Pages/MyAddArticlesDetails/MyAddArticlesDetails";
import EditArticle from "../Pages/EditArticle/EditArticle";
import AddPublisher from "../Pages/DashBoard/AddPublisher/AddPublisher";
import DashBoardAllArticles from "../Pages/DashBoard/DashBoardAllArticles/DashBoardAllArticles";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import DashBoardHome from "../Pages/DashBoard/DashBoardHome/DashBoardHome";

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
            path: "/add-article",
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
            path: "/my-article/:id",
            element: <PrivateRoute>
                <MyAddArticlesDetails></MyAddArticlesDetails>
            </PrivateRoute>
        },
        {
            path: "/edit-article/:id",
            element: <PrivateRoute>
                <EditArticle></EditArticle>
            </PrivateRoute>
        },
        {
            path: "/profile",
            element: <PrivateRoute>
                <MyProfile></MyProfile>
            </PrivateRoute>
        },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <DashBoardLayout></DashBoardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                element: <DashBoardHome></DashBoardHome>
            }, {
                path: "add-publisher",
                element: <AddPublisher></AddPublisher>
            },
            {
                path: "all-articles",
                element: <DashBoardAllArticles></DashBoardAllArticles>
            },
            {
                path: "all-users",
                element: <AllUsers></AllUsers>
            }





        ]
    }

]);