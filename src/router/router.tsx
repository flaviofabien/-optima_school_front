import App from "../App";
import Login from "../pages/Auth/Login";
import PageLoadingResetPassword from "../pages/Auth/PageLoadingResetPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import AddUser from "../pages/Users/AddUser";
import EditUser from "../pages/Users/EditsUsers";
import UserContent from "../pages/Users/UserContenu";

export const Router = [
    /****** Autentification ********/
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/reset-password",
      element: <ResetPassword />
    },
    {
      path: "/load-verification",
      element: <PageLoadingResetPassword />
    },
    {
      path: "/update-password/:id",
      element: <UpdatePassword />
    },
    
    {
      path: "/",
      element: <App />
    },

    /******  *********/
      
    {
      path: "/admin/users",
      element: <UserContent />
    },
    {
      path: "/admin/users/add",
      element: <AddUser />
    },
    {
      path: "/admin/users/edit/:id",
      element: <EditUser />
    },
  ]