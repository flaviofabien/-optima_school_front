import { useDispatch, useSelector } from 'react-redux';
import { DataMenu } from './DataMenu'
import { Link, useLocation } from 'react-router-dom'
import type { RootState } from '../../store/store';
import { setToken } from '../../store/Users/Users';
import { useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import ImgLogo from '../../assets/logo.png'
import ImgLogoPetit from '../../assets/logoPetit.png'

export default function NavBar() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const users = useSelector((state: RootState) => state.dataStorage.user);
    const [menu , setMenu] = useState(true);

    const dispatch = useDispatch()
    const { pathname } = useLocation()

    return (
        <div className='bg-white text-zinc-500 py-4 px-4 absolute left-0 top-0 h-screen max-h-screen overflow-auto'>
            <div className='flex border-b-2 border-gray-200 items-center py-4 mb-4'>
            {
                menu ? <img src={ImgLogo} className= 'w-40  object-cover' alt="" />:<img src={ImgLogoPetit} className= 'w-16  object-cover' alt="" />
            }

            {
                menu ? <SlArrowLeft onClick={() => setMenu(false)} className=" text-3xl cursor-pointer" /> :  <SlArrowRight onClick={() => setMenu(true)} className=" text-3xl cursor-pointer" />
            }
            </div>
            {
                menu ? (
                <div className="">
                    {
                        DataMenu.filter( filtre => {
                            if (token && users.role === "admin") {
                                return  (filtre.label !== "Utilisateur")  && (filtre.label !== "Niveaux")
                            } else if (token && users.role === "superAdmin") {
                                return (filtre.label === "Niveaux") || (filtre.label === "Utilisateur") || (filtre.label === "Dashboard")
                            }else if (token && users.role === "eleve") {
                                return (filtre.label === "Bulletin") || (filtre.label === "Absence") ||(filtre.label === "Message") ||(filtre.label === "Emploi du temps") || (filtre.label === "Notes") || (filtre.label === "Dashboard")
                            }else if (token && users.role === "Enseignant") {
                                return  (filtre.label === "Message") ||(filtre.label === "Emploi du temps") || (filtre.label === "Notes") || (filtre.label === "Dashboard")
                            } else {
                                return filtre
                            }
                        }).map( i =>  {
                            const isActive = (pathname === i.path || pathname.includes(i.path)) 
                            const isLogout = pathname === "/login"
                            if (isLogout) {
                                dispatch(setToken(""))
                            }
                            return (
                                <>
                                    <Link key={i.label} to={i.path}  className={`  ${isActive ? " bg-[var(--color-primary)] text-white " : "hover:bg-gray-100 hover:border-l-4 border-white border-l-4 hover:border-[var(--color-primary)]"} 
                                            block py-2 px-4 `}>
                                        <i.icons size={25} className='inline-block mr-4' /> 
                                        {i.label}
                                    </Link>
                                        {
                                            ((i.label === "Matiere" ) || (i.label === "Enseigant" ) || (i.label === "PartitionSalle" ) ) && <div className='border-b-2 my-4'></div>
                                        }
                                </>
                            )})  
                    }
                  


                </div>
                ) : (  <div className="">
                    {
                        DataMenu.filter( filtre => {
                            if (token && users.role === "admin") {
                                return  (filtre.label !== "Utilisateur") && (filtre.label !== "Niveaux") 
                            } else if (token && users.role === "superAdmin") {
                                return (filtre.label === "Niveaux") || (filtre.label === "Utilisateur") || (filtre.label === "Dashboard")
                            } else {
                                return filtre
                            }
                        }).map( i =>  {
                            const isActive = pathname === i.path
                            const isLogout = pathname === "/login"
                            if (isLogout) {
                                dispatch(setToken(""))
                            }
                            return (
                                <Link key={i.label} to={i.path}  className={`${isActive ? " bg-[var(--color-primary)] text-white " : "hover:bg-gray-100 hover:border-l-4  border-white border-l-4 hover:border-[var(--color-primary)]"} 
                                        block p-2 text-center`}>
                                    <i.icons size={25} className='inline-block mr-4' /> 
                                    {/* {i.label} */} 
                                </Link>)})  
                    }
                    
                </div>)
            }
        </div>
    )
} 