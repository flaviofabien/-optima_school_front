import Profils from "../Components/header/Profils";
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
import AddExamen from "../pages/Examen/AddExamen";
import Examen from "../pages/Examen/Examen";
import AddMatiere from "../pages/Matiere/AddMatiere";
import EditMatiere from "../pages/Matiere/EditsMatiere";
import MatiereContent from "../pages/Matiere/MatiereContent";
import AddNiveau from "../pages/Niveau/AddNiveaux";
import EditNiveau from "../pages/Niveau/EditNiveaux";
import NiveauContent from "../pages/Niveau/NiveauxContent";
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
import PartitionSalle from "../pages/PartitionSalle/PartitionSalle";
import AddPartitionSalle from "../pages/PartitionSalle/AddPartition";
import NotesContent from "../pages/Notes/NotesContent";
import AddNotes from "../pages/Notes/AddNotes";
import ClientPage from "../Client";
import AnneeScolaireContent from "../pages/Annee Scolaire/AnneeScolaireContent";
import AddAnneeScolaire from "../pages/Annee Scolaire/AddAnneeScolaire";
import EditAnneeScolaire from "../pages/Annee Scolaire/EditAnneeScolaire";
import AddPeriode from "../pages/Periode/AddPeriode";
import EditPeriode from "../pages/Periode/EditPeriode";
import PeriodeContent from "../pages/Periode/PeriodeContent";
import EditNotes from "../pages/Notes/EditsNotes";
import Bulletin from "../pages/Bulletin/Bulletin";
import AbsenceContent from "../pages/Absence/AbsenceContent";
import AddAbsence from "../pages/Absence/AddAbsence";
import EditAbsence from "../pages/Absence/EditsAbsence";
import PayementContent from "../pages/Payement/PayementContent";
import AddPayement from "../pages/Payement/AddPayement";
import EditPayement from "../pages/Payement/EditPayement";
import AddSousPeriode from "../pages/Sous-Periode/AddSousPeriode";
import SousPeriodeContent from "../pages/Sous-Periode/SousPeriodeContent";
import EditSousPeriode from "../pages/Sous-Periode/EditSousPeriode";
import Message from "../pages/Message/MessageAncien";
import Layout from "../pages/Layout";

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
      element: <ClientPage />
    },
    {
      path: "/admin/dashboard",
      element: <PrivateRoute element={Layout}  children={<Dashboard />} />
    },
    {
      path: "/admin/profils",
      element: <PrivateRoute element={Layout}  children={<Profils />} />
    },

    /* User */
    {
      path: "/admin/users",
      element: <PrivateRoute element={Layout}  children={<UserContent />} />
    },
    {
      path: "/admin/users/add",
      element: <PrivateRoute element={Layout}  children={<AddUser />} />
    },
    {
      path: "/admin/users/edit/:id",
      element: <PrivateRoute element={Layout}  children={<EditUser />} />
    },



  /****** student *********/
  {
    path: "/admin/students",
    element: <PrivateRoute element={Layout} children={<StudentContent />} />,
  },
  {
    path: "/admin/students/add",
    element: <PrivateRoute element={Layout} children={<AddStudent />} />,
  },
  {
    path: "/admin/students/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditStudent />} />,
  },

  /****** teachs *********/
  {
    path: "/admin/teachs",
    element: <PrivateRoute element={Layout} children={<TeachContent />} />,
  },
  {
    path: "/admin/teachs/add",
    element: <PrivateRoute element={Layout} children={<AddTeach />} />,
  },
  {
    path: "/admin/teachs/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditTeach />} />,
  },

  /* ecole */
  {
    path: "/admin/ecoles",
    element: <PrivateRoute element={Layout} children={<EcoleContent />} />,
  },
  {
    path: "/admin/ecoles/add",
    element: <PrivateRoute element={Layout} children={<AddEcole />} />,
  },
  {
    path: "/admin/ecoles/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditEcole />} />,
  },

  /* anneeScolaire */
  {
    path: "/admin/annee-scolaires",
    element: <PrivateRoute element={Layout} children={<AnneeScolaireContent />} />,
  },
  {
    path: "/admin/annee-scolaires/add",
    element: <PrivateRoute element={Layout} children={<AddAnneeScolaire />} />,
  },
  {
    path: "/admin/annee-scolaires/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditAnneeScolaire />} />,
  },
  /* type */
  {
    path: "/admin/niveaux",
    element: <PrivateRoute element={Layout} children={<NiveauContent />} />,
  },
  {
    path: "/admin/niveaux/add",
    element: <PrivateRoute element={Layout} children={<AddNiveau />} />,
  },
  {
    path: "/admin/niveaux/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditNiveau />} />,
  },

  /* classes */
  {
    path: "/admin/classes",
    element: <PrivateRoute element={Layout} children={<ClasseContent />} />,
  },
  {
    path: "/admin/classes/add",
    element: <PrivateRoute element={Layout} children={<AddClasse />} />,
  },
  {
    path: "/admin/classes/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditClasse />} />,
  },

  /* salle */
  {
    path: "/admin/salles",
    element: <PrivateRoute element={Layout} children={<SalleContent />} />,
  },
  {
    path: "/admin/salles/add",
    element: <PrivateRoute element={Layout} children={<AddSalle />} />,
  },
  {
    path: "/admin/salles/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditSalle />} />,
  },

  /* course */
  {
    path: "/admin/Courses",
    element: <PrivateRoute element={Layout} children={<CourseContent />} />,
  },
  {
    path: "/admin/courses/add",
    element: <PrivateRoute element={Layout} children={<AddCourse />} />,
  },
  {
    path: "/admin/courses/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditCourse />} />,
  },

  /* matiere */
  {
    path: "/admin/matieres",
    element: <PrivateRoute element={Layout} children={<MatiereContent />} />,
  },
  {
    path: "/admin/matieres/add",
    element: <PrivateRoute element={Layout} children={<AddMatiere />} />,
  },
  {
    path: "/admin/matieres/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditMatiere />} />,
  },

  /* EmploiDuTemps */
  {
    path: "/admin/temps",
    element: <PrivateRoute element={Layout} children={<EmploiDuTemps />} />,
  },

  /* Periode */
  {
    path: "/admin/periodes/add",
    element: <PrivateRoute element={Layout} children={<AddPeriode />} />,
  },
  {
    path: "/admin/periodes",
    element: <PrivateRoute element={Layout} children={<PeriodeContent />} />,
  },
  {
    path: "/admin/periodes/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditPeriode />} />,
  },


  // sous periode 
  {
    path: "/admin/sous-periodes/add",
    element: <PrivateRoute element={Layout} children={<AddSousPeriode />} />,
  },
  {
    path: "/admin/sous-periodes",
    element: <PrivateRoute element={Layout} children={<SousPeriodeContent />} />,
  },
  {
    path: "/admin/sous-periodes/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditSousPeriode />} />,
  },
 


  /* Examen */
  {
    path: "/admin/examens/add",
    element: <PrivateRoute element={Layout} children={<AddExamen />} />,
  },
  {
    path: "/admin/examens",
    element: <PrivateRoute element={Layout} children={<Examen />} />,
  },
  /* Partition salle */
  {
    path: "/admin/partition-salles/add",
    element: <PrivateRoute element={Layout} children={<AddPartitionSalle />} />,
  },
  {
    path: "/admin/partition-salles",
    element: <PrivateRoute element={Layout} children={<PartitionSalle />} />,
  },

  /* Notes */
  {
    path: "/admin/notes/add",
    element: <PrivateRoute element={Layout} children={<AddNotes />} />,
  },
   {
    path: "/admin/notes/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditNotes />} />,
  },
  {
    path: "/admin/notes",
    element: <PrivateRoute element={Layout} children={<NotesContent />} />,
  },

// Bulletin
  {
    path: "/admin/bulletins",
    element: <PrivateRoute element={Layout} children={<Bulletin />} />,
  },

  /* absences */
  {
    path: "/admin/absences/add",
    element: <PrivateRoute element={Layout} children={<AddAbsence />} />,
  },
   {
    path: "/admin/absences/edit/:id",
    element: <PrivateRoute element={Layout} children={<EditAbsence />} />,
  },
  {
    path: "/admin/absences",
    element: <PrivateRoute element={Layout} children={<AbsenceContent />} />,
  },

    /* payement */
    {
      path: "/admin/payements/add",
      element: <PrivateRoute element={Layout} children={<AddPayement />} />,
    },
     {
      path: "/admin/payements/edit/:id",
      element: <PrivateRoute element={Layout} children={<EditPayement />} />,
    },
    {
      path: "/admin/payements",
      element: <PrivateRoute element={Layout} children={<PayementContent />} />,
    },

    //    message
    {
      path: "/admin/messages",
      element: <PrivateRoute element={Layout} children={<Message />} />,
    },
]