import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { userType } from "../../../typescript/Users";

type Props = {
    data ?: userType[]
    icons : ReactNode
    register : UseFormRegisterReturn;
    error ?: string
    disabled ?: boolean
}

export default function SelectCustomDataFields({data,icons,error,register,disabled}: Props) {
  return (
        <div className="relative mt-4  w-full" >
            <div className= {` ${disabled && "bg-gray-200"} group flex mt-4 `} >
                <span className="py-2 absolute text-[var(--color-primary-transparent)] group-focus-within:text-[var(--color-primary)] ">{icons}</span>
                <select  id="" {...register} disabled={disabled}
                        className="text-sm text-gray-500 outline-0 w-full border-b-4 py-2 pl-7 border-[var(--color-primary-transparent)] focus:border-[var(--color-primary)] " >                 
                    <option value={""} className="" selected> Selectionner un utiisateur  </option>
                    {
                        data?.map(item => <option value={item.id} className=""> {item.nom}  {item.prenom}  </option> )
                    }
                </select>
            </div>
            { error && <p className=' max-w-64 text-xs text-red-500'>{error} </p>  }
        </div>
    )
}