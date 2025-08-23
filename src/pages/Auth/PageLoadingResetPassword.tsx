import TitleForm from "../../Components/ui/Text/TitleForm";
import ImgFont from "../../assets/classroom.jpg"
import { SiComma } from "react-icons/si";


export default function PageLoadingResetPassword() {
  return (
    <div className="w-full h-screen flex justify-center items-center" >
        <img src={ImgFont} className="-z-10 absolute bottom-0  w-full h-screen object-cover" alt="" />
        <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl"  >
        <TitleForm title="Mot de passe oublie"  />
        <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-24 px-8 relative">
            <SiComma className="absolute right-8 lg:text-4xl text-xl"  />
            <p className="text-center text-gray-500 py-8  lg:text-xl"> Si cet email existe, un lien a été envoyé </p>
        </div>
        </form>
    </div>
 
  )
}