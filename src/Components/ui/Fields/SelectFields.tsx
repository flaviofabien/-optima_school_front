import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
    data ?: string[]
    label : string
    register : UseFormRegisterReturn;
    error ?: any
}

export default function SelectFields({data,error,register,label}: Props) {
  return (
    <div className="relative mt-4" >
        <label htmlFor="" className="font-light"> {label} </label>
        <div className="group flex mt-2">
            <select  id="" {...register}
                    className="text-sm text-gray-500 outline-0 w-full border-b-4 py-2 pl-2 border-[var(--color-primary-transparent)] focus:border-[var(--color-primary)] " >                 
                <option selected disabled value={""}> selectionner un {label} </option> 

                {
                    data?.map(item => <option value={item}> {item} </option> )
                }
            </select>
        </div>

        { error && <p className=' max-w-64 text-xs text-red-500'>{error} </p>  }
    </div>
  )
}