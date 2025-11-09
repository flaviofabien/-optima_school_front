import { BiAnalyse, BiCalendar, BiMoney} from "react-icons/bi";
import {  CgNotes, CgTime } from "react-icons/cg";
import { FaLevelDownAlt, FaSms, FaUserMd } from "react-icons/fa";
import { GiCalendarHalfYear, GiLevelTwo, GiTeacher } from "react-icons/gi";
import { GrDashboard, GrTest } from "react-icons/gr";
import { MdEvent, MdRoom, MdRoomPreferences } from "react-icons/md";
import { PiEmpty, PiNewspaper, PiStudent } from "react-icons/pi";
import { SiCoursera, SiLevelsdotfyi } from "react-icons/si";

export const DataMenu = [
    {
        path : "/admin/dashboard",
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
        path : "/admin/periodes",
        label : "Periode",
        icons : SiLevelsdotfyi,
    },
 {
        path : "/admin/sous-periodes",
        label : "Sous periode",
        icons : FaLevelDownAlt,
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
        path : "/admin/courses",
        label : "Cours",
        icons : SiCoursera,
    },
        
    {
        path : "/admin/temps",
        label : "Emploi du temps",
        icons : CgTime,
    },
    {
        path : "/admin/examens",
        label : "Examen",
        icons : GrTest,
    },
    {
        path : "/admin/partition-salles",
        label : "Partition Salle",
        icons : MdRoomPreferences,
    },
    {
        path : "/admin/notes",
        label : "Notes",
        icons : CgNotes,
    },
     {
        path : "/admin/bulletins",
        label : "Bulletin",
        icons : PiNewspaper,
    },
    {
        path : "/admin/absences",
        label : "Absence",
        icons : PiEmpty,
    },
    {
        path : "/admin/payements",
        label : "Payement",
        icons : BiMoney,
    },
     {
        path : "/admin/messages",
        label : "Message",
        icons : FaSms,
    },
]