import Login from "../pages/Auth/Login";
import PageLoadingResetPassword from "../pages/Auth/PageLoadingResetPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import AddClasse from "../pages/Classe/AddClasse";
import ClasseContent from "../pages/Classe/ClasseContent";
import EditClasse from "../pages/Classe/EditClasses";
import AddCourse from "../pages/Course/AddCourse";
import CourseContent from "../pages/Course/CourseContent";
import EditCourse from "../pages/Course/EditsCourse";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddEcole from "../pages/Ecole/AddEcole";
import EcoleContent from "../pages/Ecole/EcoleContent";
import EditEcole from "../pages/Ecole/EditsEcole";
import EmploiDuTemps from "../pages/EmploiDuTemps/EmploiDuTemps";
import Examen from "../pages/Examen/Examen";
import AddMatiere from "../pages/Matiere/AddMatiere";
import EditMatiere from "../pages/Matiere/EditsMatiere";
import MatiereContent from "../pages/Matiere/MatiereContent";
import AddSalle from "../pages/Salle/AddSalle";
import EditSalle from "../pages/Salle/EditSalle";
import SalleContent from "../pages/Salle/SalleContent";
import AddStudent from "../pages/Students/AddStudent";
import EditStudent from "../pages/Students/EditsStudent";
import StudentContent from "../pages/Students/StudentContent";
import AddTeach from "../pages/Teachs/AddTeach";
import EditTeach from "../pages/Teachs/EditsTeach";
import TeachContent from "../pages/Teachs/TeachContenu";
import AddUser from "../pages/Users/AddUser";
import EditUser from "../pages/Users/EditsUsers";
import UserContent from "../pages/Users/UserContenu";
import PrivateRoute from "./PrivateRoute";

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
      element: <Login />
    },
    {
      path: "/admin",
      element: <PrivateRoute element={Dashboard}   />
    },

     /****** Users *********/
  {
    path: "/admin/users",
    element: <PrivateRoute element={UserContent} />,
  },
  {
    path: "/admin/users/add",
    element: <PrivateRoute element={AddUser} />,
  },
  {
    path: "/admin/users/edit/:id",
    element: <PrivateRoute element={EditUser} />,
  },

  /****** student *********/
  {
    path: "/admin/students",
    element: <PrivateRoute element={StudentContent} />,
  },
  {
    path: "/admin/students/add",
    element: <PrivateRoute element={AddStudent} />,
  },
  {
    path: "/admin/students/edit/:id",
    element: <PrivateRoute element={EditStudent} />,
  },

  /****** teachs *********/
  {
    path: "/admin/teachs",
    element: <PrivateRoute element={TeachContent} />,
  },
  {
    path: "/admin/teachs/add",
    element: <PrivateRoute element={AddTeach} />,
  },
  {
    path: "/admin/teachs/edit/:id",
    element: <PrivateRoute element={EditTeach} />,
  },

  /* ecole */
  {
    path: "/admin/ecoles",
    element: <PrivateRoute element={EcoleContent} />,
  },
  {
    path: "/admin/ecoles/add",
    element: <PrivateRoute element={AddEcole} />,
  },
  {
    path: "/admin/ecoles/edit/:id",
    element: <PrivateRoute element={EditEcole} />,
  },

  /* classes */
  {
    path: "/admin/classes",
    element: <PrivateRoute element={ClasseContent} />,
  },
  {
    path: "/admin/classes/add",
    element: <PrivateRoute element={AddClasse} />,
  },
  {
    path: "/admin/classes/edit/:id",
    element: <PrivateRoute element={EditClasse} />,
  },

  /* salle */
  {
    path: "/admin/salles",
    element: <PrivateRoute element={SalleContent} />,
  },
  {
    path: "/admin/salles/add",
    element: <PrivateRoute element={AddSalle} />,
  },
  {
    path: "/admin/salles/edit/:id",
    element: <PrivateRoute element={EditSalle} />,
  },

  /* course */
  {
    path: "/admin/Courses",
    element: <PrivateRoute element={CourseContent} />,
  },
  {
    path: "/admin/courses/add",
    element: <PrivateRoute element={AddCourse} />,
  },
  {
    path: "/admin/courses/edit/:id",
    element: <PrivateRoute element={EditCourse} />,
  },

  /* matiere */
  {
    path: "/admin/matieres",
    element: <PrivateRoute element={MatiereContent} />,
  },
  {
    path: "/admin/matieres/add",
    element: <PrivateRoute element={AddMatiere} />,
  },
  {
    path: "/admin/matieres/edit/:id",
    element: <PrivateRoute element={EditMatiere} />,
  },

  /* EmploiDuTemps */
  {
    path: "/admin/temps",
    element: <PrivateRoute element={EmploiDuTemps} />,
  },

  /* Examen */
  {
    path: "/admin/examen",
    element: <PrivateRoute element={Examen} />,
  },
]