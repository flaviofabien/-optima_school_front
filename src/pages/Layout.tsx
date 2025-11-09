import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import NavBar from "../Components/navBar/NavBar";
import Header from "../Components/header/Header";
import type { JSX } from "react";

type Pros = {
    children : JSX.Element
}

export default function Layout({children}:Pros) {
   const menu = useSelector((state: RootState) => state.dataStorage.menu);

  return (
    <div className="bg-[var(--font)] h-screen max-h-screen flex">
        <NavBar />  
        <div className={` ${menu ? " contentEnter" : "contentLeave"} w-full h-full flex flex-col`} >
          <Header />
          <div className="w-full h-full overflow-auto p-2 sm:p-8">
                {children}
          </div>
        </div>
    </div>
  )
}