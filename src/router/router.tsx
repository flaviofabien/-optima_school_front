import App from "../App";
import Login from "../pages/Auth/Login";
import PageLoadingResetPassword from "../pages/Auth/PageLoadingResetPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import AddStudent from "../pages/Students/AddStudent";
import EditStudent from "../pages/Students/EditsStudent";
import StudentContent from "../pages/Students/StudentContent";
import AddTeach from "../pages/Teachs/AddTeach";
import EditTeach from "../pages/Teachs/EditsTeach";
import TeachContent from "../pages/Teachs/TeachContenu";
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

    /****** Users *********/
      
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

      /****** student *********/
    {
      path: "/admin/students",
      element: <StudentContent />
    },
    {
      path: "/admin/students/add",
      element: <AddStudent />
    },
    {
      path: "/admin/students/edit/:id",
      element: <EditStudent />
    },

      /****** teachs *********/
    {
      path: "/admin/teachs",
      element: <TeachContent />
    },
    {
      path: "/admin/teachs/add",
      element: <AddTeach />
    },
    {
      path: "/admin/teachs/edit/:id",
      element: <EditTeach />
    },
  ]