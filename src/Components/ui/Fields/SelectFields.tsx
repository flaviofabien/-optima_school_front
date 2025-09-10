import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
    data ?: string[]
    icons : ReactNode
    label : string
    register : UseFormRegisterReturn;
    error ?: string
}

export default function SelectFields({data,icons,error,register}: Props) {
  return (
    <div className="relative mt-4" >
        <div className="group flex mt-4">
            <span className="py-2 absolute text-[var(--color-primary-transparent)] group-focus-within:text-[var(--color-primary)] ">{icons}</span>
            <select  id="" {...register}
                    className="text-sm text-gray-500 outline-0 w-full border-b-4 py-2 pl-7 border-[var(--color-primary-transparent)] focus:border-[var(--color-primary)] " >                 
                {
                    data?.map(item => <option value={item}> {item} </option> )
                }
            </select>
        </div>

        { error && <p className=' max-w-64 text-xs text-red-500'>{error} </p>  }
    </div>
  )
}