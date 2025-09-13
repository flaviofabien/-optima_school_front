import { useDispatch, useSelector } from 'react-redux';
import { DataMenu } from './DataMenu'
import { Link, useLocation } from 'react-router-dom'
import type { RootState } from '../../store/store';
import { setToken } from '../../store/Users/Users';

export default function NavBar() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const users = useSelector((state: RootState) => state.dataStorage.user);

    const dispatch = useDispatch()
    const { pathname } = useLocation()
    return (
        <div 
            className='bg-white  py-12 absolute left-0 top-14 rounded-r-[45px]'
            >
            {
                DataMenu.filter( filtre => {
                    if (token && users.role === "admin") {
                        return (filtre.label !== "Ecoles") && (filtre.label !== "Utilisateur")
                    } else if (token && users.role === "superAdmin") {
                        return (filtre.label === "Logout") || (filtre.label === "Utilisateur") || (filtre.label === "Dashboard")
                    } else {
                        return filtre
                    }
                }).map( i =>  {
                    const isActive = pathname === i.path
                    if (i.path === "/") {
                        dispatch(setToken(""))
                    }
                    return (
                        <Link key={i.label} to={i.path}  className={`${isActive ? " bg-[var(--color-primary)] text-white " : "hover:bg-gray-100 hover:border-l-4 border-white border-l-4 hover:border-[var(--color-primary)]"} 
                                block p-4 `}>
                            <i.icons size={25} className='inline-block mr-4' /> 
                            {i.label}
                        </Link>)})  
            }
        </div>
    )
} 