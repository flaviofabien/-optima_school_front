import { BiAnalyse, BiCalendar} from "react-icons/bi";
import {  CgNotes, CgTime } from "react-icons/cg";
import { FaUserMd } from "react-icons/fa";
import { GiCalendarHalfYear, GiLevelTwo, GiTeacher } from "react-icons/gi";
import { GrDashboard, GrTest } from "react-icons/gr";
import { MdEvent, MdRoom, MdRoomPreferences } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { SiCoursera, SiLevelsdotfyi } from "react-icons/si";

export const DataMenu = [
    {
        path : "/admin",
        label : "Dashboard",
        icons : GrDashboard,
    },
    {
        path : "/admin/users",
        label : "Utilisateur",
        icons : FaUserMd,
    },
    {
        path : "/admin/niveaux",
        label : "Niveaux",
        icons : GiLevelTwo,
    },
    {
        path : "/admin/ecoles",
        label : "Ecoles",
        icons : BiCalendar,
    },
    {
        path : "/admin/annee-scolaires",
        label : "Annee Scolaires",
        icons : GiCalendarHalfYear,
    },
    

    {
        path : "/admin/classes",
        label : "Classes",
        icons : BiAnalyse,
    },
    {
        path : "/admin/salles",
        label : "Salle",
        icons : MdRoom,
    },
    {
        path : "/admin/matieres",
        label : "Matiere",
        icons : MdEvent,
    },   
    {
        path : "/admin/students",
        label : "Eleve",
        icons : PiStudent,
    },
    {
        path : "/admin/teachs",
        label : "Enseigant",
        icons : GiTeacher,
    },
    
    {
        path : "/admin/categories",
        label : "Categorie",
        icons : SiLevelsdotfyi,
    },
    {
        path : "/admin/examens",
        label : "Examen",
        icons : GrTest,
    },
    {
        path : "/admin/partition-salles",
        label : "PartitionSalle",
        icons : MdRoomPreferences,
    },

    {
        path : "/admin/courses",
        label : "Cours",
        icons : SiCoursera,
    },
    {
        path : "/admin/notes",
        label : "Notes",
        icons : CgNotes,
    },
    {
        path : "/admin/temps",
        label : "Emploi du temps",
        icons : CgTime,
    },
]