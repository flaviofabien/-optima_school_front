import { VscLoading } from "react-icons/vsc";
import Img from "../../../assets/logo.png"

export default function Loading() {
  return (
    <div className='w-full h-screen z-50 bg-[var(--white)] fixed top-0 left-0 flex justify-center items-center'>
        <VscLoading className="inline-block animate-spin text-[var(--color-primary)] absolute " size={300} />
        <img className="w-[200px] object-cover" src={Img} alt="" />
    </div>
  )
}