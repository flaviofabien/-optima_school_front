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
      element: <Dashboard />
    },
    {
      path: "/admin",
      element: <Dashboard />
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

    /* ecole */

    {
      path: "/admin/ecoles",
      element: <EcoleContent />
    },
    {
      path: "/admin/ecoles/add",
      element: <AddEcole/>
    },
    {
      path: "/admin/ecoles/edit/:id",
      element: <EditEcole />
    },
    /* classes */

    {
      path: "/admin/classes",
      element: <ClasseContent />
    },
    {
      path: "/admin/classes/add",
      element: <AddClasse />
    },
    {
      path: "/admin/classes/edit/:id",
      element: <EditClasse />
    },

    /* salle */

    {
      path: "/admin/salles",
      element: <SalleContent />
    },
    {
      path: "/admin/salles/add",
      element: <AddSalle />
    },
    {
      path: "/admin/salles/edit/:id",
      element: <EditSalle />
    },
    /* course */

    {
      path: "/admin/Courses",
      element: <CourseContent />
    },
    {
      path: "/admin/courses/add",
      element: <AddCourse />
    },
    {
      path: "/admin/courses/edit/:id",
      element: <EditCourse />
    },
    /* matiere */

    {
      path: "/admin/matieres",
      element: <MatiereContent />
    },
    {
      path: "/admin/matieres/add",
      element: <AddMatiere />
    },
    {
      path: "/admin/matieres/edit/:id",
      element: <EditMatiere />
    },

    /* EmploiDuTemps */
    {
      path: "/admin/temps",
      element: <EmploiDuTemps />
    },
    /* Examen */
    {
      path: "/admin/examen",
      element: <Examen />
    },
  ]