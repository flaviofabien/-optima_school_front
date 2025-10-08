import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import "react-toastify/dist/ReactToastify.css";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { IPLocal } from "../../api/IP";
import { getOneUsers } from "../../api/Users";
import { useQuery } from "@tanstack/react-query";
import Loading from "../ui/Loader/Loading";
import { useState } from "react";
import CardConfirmDeconnexion from "../ui/Card/CardConfirmDeconnexion";

export default function Header() {
  const users = useSelector((state: RootState) => state.dataStorage.user);
  const token = useSelector((state: RootState) => state.dataStorage.token);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState({
    show: false,
    id: NaN
  });

  const {data,isLoading,isError} = useQuery<any>({
    queryKey: ["users",token,users.id],
    queryFn: () => getOneUsers(token!,users.id!),
  });

  const handleLogout = () => {
    setShow({show : true , id : NaN})
  };

  if (isLoading) return <Loading />
  if (isError) return <div>Error</div>
   
  return (
    <div className=' relative  flex justify-between items-center bg-[var(--color-primary)]  px-4 py-4 '>
      <NavBar />        
      <div></div>
      <div className="text-[var(--white)] flex gap-5">
        <div>
            <p className="text-end"> {data?.nom} {data?.prenom} </p>
            <p  className="text-xs text-end"> {data?.email} </p>
        </div>
        <div className="relative group">
          <img className="w-12 h-12  rounded-3xl cursor-pointer "  src={IPLocal + data?.img} alt="img" />
          <div className="absolute  right-0  rounded-xl">
            <div className=" group-hover:p-4 p-0 bg-[var(--white)]">
              <button
                type="button" 
                onClick={() => navigate("/admin/profils")  }
                className={`${" bg-[var(--white)] text-black text-center "} hover:bg-gray-200 py-2 px-2 w-full  cursor-pointer  right-0  group-hover:flex hidden gap-2  items-center`}>
                <BsPerson size={20} className=' ' /> 
                <span className=' '>Profils</span>
              </button>  
              <button
                type="button" 
                onClick={handleLogout}
                className={`${" bg-[var(--white)] text-black text-center "} hover:bg-gray-200 py-2 px-2  w-full cursor-pointer  right-0 group-hover:flex hidden gap-2  items-center`}>
                    <BiLogOut size={20} className=' ' /> 
                  <span className=' '>Deconnexion</span>
              </button>  

            </div>
          </div>
        </div> 
      </div>
      {show.show && (
            <CardConfirmDeconnexion
            show={show}
            setShow={setShow}
            />
        )}
    </div>
  )
}