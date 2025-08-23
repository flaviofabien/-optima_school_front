import { DataMenu } from './DataMenu'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
    const { pathname } = useLocation()
    return (
        <div 
            className='bg-white  py-8 absolute left-0 top-14 rounded-r-[45px] '
            >
            {
                DataMenu.map( i =>  {
                    const isActive = pathname === i.path
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