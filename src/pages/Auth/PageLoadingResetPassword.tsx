import TitleForm from "../../Components/ui/Text/TitleForm";
import ImgFont from "../../assets/classroom.jpg";
import { SiComma } from "react-icons/si";
import ImgLogo from "../../assets/logo.png";

export default function PageLoadingResetPassword() {
  return (
    <div className="w-full h-screen flex justify-center items-center  bg-[var(--font)]" >
      <div className="relative bg-[var(--white)] w-[1500px] h-[800px] flex items-center  rounded-4xl">
        <form className="  rounded-2xl p-8">
          <img src={ImgLogo} className="absolute top-8  w-40 mb-8 object-cover rounded-r-4xl" alt="" />
          <TitleForm title="Vérification"  />
          <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-4 px-8 relative">
            <SiComma className="absolute right-8 lg:text-4xl text-xl"  />
              <p className="text-center text-gray-500 py-8  lg:text-xl"> Si cet email existe, un lien a été envoyé </p>
          </div>
        </form>
        <img src={ImgFont} className=" w-full h-full object-cover" alt="" />
      </div>
    </div>
  )
}