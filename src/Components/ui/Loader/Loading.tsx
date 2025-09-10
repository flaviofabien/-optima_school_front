import { VscLoading } from "react-icons/vsc";

export default function Loading() {
  return (
    <div className='w-full h-screen z-50 bg-[var(--color-primary)] fixed top-0 left-0 flex justify-center items-center'>
        <VscLoading className="inline-block animate-spin" size={100} />
    </div>
  )
}