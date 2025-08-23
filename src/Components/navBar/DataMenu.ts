import { BiAnalyse, BiCalendar, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { FaUserMd } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { GrDashboard } from "react-icons/gr";
import { MdEvent } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { SiCoursera } from "react-icons/si";

export const DataMenu = [
    {
        path : "/admin",
        label : "dashboard",
        icons : GrDashboard,
    },
    {
        path : "/admin/users",
        label : "Utilisateur",
        icons : FaUserMd,
    },
    {
        path : "/admin/student",
        label : "Eleve",
        icons : PiStudent,
    },
    {
        path : "/admin/teach",
        label : "Enseigant",
        icons : GiTeacher,
    },
    {
        path : "/admin/calendar",
        label : "Emploi du temps",
        icons : BiCalendar,
    },
    {
        path : "/admin/rapport",
        label : "Rapport",
        icons : BiAnalyse,
    },
    {
        path : "/admin/event",
        label : "Evenement",
        icons : MdEvent,

    },
    {
        path : "/admin/course",
        label : "Cours",
        icons : SiCoursera,
    },
    {
        path : "/admin/setting",
        label : "Parametre",
        icons : CiSettings,
    },
    {
        path : "/admin/profils",
        label : "Profils",
        icons : CgProfile,
    },
    {
        path : "/",
        label : "Deconnexion",
        icons : BiLogOut,
    },
]