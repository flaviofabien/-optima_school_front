import { useDispatch, useSelector } from 'react-redux';
import { DataMenu } from './DataMenu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { RootState } from '../../store/store';
import { setToken } from '../../store/Users/Users';
import { BiLogOut } from 'react-icons/bi';

export default function NavBar() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const users = useSelector((state: RootState) => state.dataStorage.user);

    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(setToken(""));
        navigate("/login")
    };
    return (
        <div 
            className='bg-white  py-12 absolute left-0 top-14 rounded-r-[45px]'
            >
            {
                DataMenu.filter( filtre => {
                    if (token && users.role === "admin") {
                        return  (filtre.label !== "Utilisateur")
                    } else if (token && users.role === "superAdmin") {
                        return (filtre.label === "Logout") || (filtre.label === "Utilisateur") || (filtre.label === "Dashboard")
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
                        <Link key={i.label} to={i.path}  className={`${isActive ? " bg-[var(--color-primary)] text-white " : "hover:bg-gray-100 hover:border-l-4 border-white border-l-4 hover:border-[var(--color-primary)]"} 
                                block p-4 `}>
                            <i.icons size={25} className='inline-block mr-4' /> 
                            {i.label}
                        </Link>)})  
            }
              <a 
                onClick={handleLogout}
                className={`${" hover:bg-gray-100 hover:border-l-4 border-white hover:border-[var(--color-primary)]"} 
                block p-4 cursor-pointer`}>
                    <BiLogOut size={25} className='inline-block mr-4' /> 
                    Logout
            </a>
        </div>
    )
} 