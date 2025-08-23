import { useState, type ReactNode } from "react"
import type { UseFormRegisterReturn } from "react-hook-form";
import { BsEyeFill } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";

type Props = {
    icons : ReactNode
    label : string
    register : UseFormRegisterReturn;
    error ?: string
    show ? : boolean
    type? : string
}

export default function Fields({icons,label,error,register,show,type}: Props) {
  let [TypeRealy,setChange] = useState(type);
  return (
    <div className="relative">
      <div className="group flex mt-4">
          <span className="py-2 absolute text-[var(--color-primary-transparent)] group-focus-within:text-[var(--color-primary)] ">{icons}</span>
          <input 
            type={`${TypeRealy}`} 
            placeholder={label} 
            {...register}
          className="text-sm text-gray-500 outline-0 w-full border-b-4 py-2 pl-7 border-[var(--color-primary-transparent)] focus:border-[var(--color-primary)] " />
      </div>
      { show && <div className='absolute -top-5 right-0 p-4 mt-4 text-[var(--color-primary)]'>
                  { TypeRealy === "password" ? <FaEyeSlash onClick={() => setChange("text")  } /> : <BsEyeFill onClick={() => setChange("password")  } /> }
                </div>}  
      { error && <p className=' max-w-64 text-xs text-red-500'>{error} </p>  }
    </div>
  )
}