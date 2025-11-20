import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
    data ?: any[]
    register : UseFormRegisterReturn;
    error ?: any
    disabled ?: boolean
    label ?: string
}

export default function SelectCustomDataFields({data,error,register,disabled,label}: Props) {
  return (
        <div className="relative mt-4  w-full" >
            <div className= {` ${disabled && "bg-gray-200"} group flex mt-4 `} >
                <select  id="" {...register} disabled={disabled}
                        className="text-sm text-gray-500 outline-0 w-full border-b-4 py-2 pl-7 border-[var(--color-primary-transparent)] focus:border-[var(--color-primary)] " >                 
                    <option value={""} className="" selected> Selectionner un {label}  </option>
                    {
                        data?.map( (item : any) => <option value={item.id} className="py-2"> {item.nom}  {item.prenom}  </option> )
                    }
                </select>
            </div>
            { error && <p className=' max-w-64 text-xs text-red-500'>{error} </p>  }
        </div>
    )
}