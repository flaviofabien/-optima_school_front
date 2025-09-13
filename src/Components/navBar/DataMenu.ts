import { BiAnalyse, BiCalendar, BiLogOut} from "react-icons/bi";
import {  CgTime } from "react-icons/cg";
import { FaUserMd } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { GrDashboard, GrTest } from "react-icons/gr";
import { MdEvent, MdRoom } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { SiCoursera } from "react-icons/si";

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
        path : "/admin/ecoles",
        label : "Ecoles",
        icons : BiCalendar,
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
        path : "/admin/courses",
        label : "Cours",
        icons : SiCoursera,
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
        path : "/admin/temps",
        label : "Emploi du temps",
        icons : CgTime,
    },
    
    {
        path : "/admin/examen",
        label : "Examen",
        icons : GrTest,
    },
    // {
    //     path : "/login",
    //     label : "Logout",
    //     icons : BiLogOut,
    // },
]