import { MdOutlineMenuOpen } from "react-icons/md";
import NavBar from "../navBar/NavBar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

type Props = {}

export default function Header({}: Props) {
  const [menu , setMenu] = useState(false);

  return (
    <div className='text-gray-600 flex justify-between items-center bg-[var(--color-primary)] p-4 '>
        <MdOutlineMenuOpen 
          onClick={() => setMenu(!menu)}
          className="text-white text-4xl lg:hidden cursor-pointer"
        />
        <AnimatePresence>
          {
            menu && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}   
                animate={{ opacity: 1, x: 0 }}     
                exit={{ opacity: 0, x: -50 }}       
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-3 left-0  w-full z-10"
              >
                <NavBar />
              </motion.div>
            )}
        </AnimatePresence>
        <div className="hidden lg:block "><NavBar /></div>
        <div>Logo</div>
        <div>
            image
        </div>

        
    </div>
  )
}