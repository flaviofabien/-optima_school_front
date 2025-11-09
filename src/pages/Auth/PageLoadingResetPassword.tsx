import TitleForm from "../../Components/ui/Text/TitleForm";
import ImgFont from "../../assets/classroom.jpg";
import { SiComma } from "react-icons/si";
import ImgLogo from "../../assets/logo.png";

export default function PageLoadingResetPassword() {
  return (
    <div className="w-full h-screen flex justify-center items-center  bg-[var(--font)]" >
      <div className="relative bg-[var(--white)] w-[1500px] rounded-s-3xl h-[800px] flex items-center  rounded-4xl">
        <form className=" rounded-2xl p-16 flex justify-center lg:justify-start items-center w-full">
          <div className="w-[300px]">
            <img src={ImgLogo} className="relative lg:absolute lg:left-16 lg:top-16 left-0 top-0  w-40 mb-12 lg:mb-8 object-cover rounded-r-4xl" alt="" />
            <TitleForm title="Vérification"  />
            <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-4 px-8 relative">
              <SiComma className="absolute right-8 lg:text-4xl text-xl"  />
                <p className="text-center text-gray-500 py-8  lg:text-xl"> Si l'email existe bien, un lien a été envoyé </p>
            </div>

          </div>
        </form>
        <img src={ImgFont} className=" w-full h-full  object-cover rounded-r-4xl hidden  min-[1000px]:block rounded-e-3xl" alt="" />
      </div>
    </div>
  )
}