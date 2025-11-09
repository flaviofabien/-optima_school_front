import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
    register : UseFormRegisterReturn;
    error? : string;
    label : string,
    data :  any,
    none ?: string,
}
export default function FieldCheckBoxCustom({ label,register,error,data}: Props) {
  return (
    <div className='w-full mt-4 '>
                <p className='inline-block pr-2 font-light'> {label} : </p>
        <div className={`w-full border-b-4 py-2 border-[var(--color-primary-transparent)] ${error ? "":"mb-4" } `}>
                {
                    data?.map((option : any) => (
                        <>
                        <div key={option.id} className='inline-block mr-4 text-[var(--gray)]'>
                            <label className=' font-light text-sm' htmlFor={`${option.id}`}> {option.nom} : </label> 
                            <input id={`${option.id}`} {...register}  type='checkbox' className=' w-6' value={parseInt(option.id)}   /> 
                        </div>
                        </>
                    ) ) 
                } 
        </div>
        {error && <span className='text-xs text-red-500'>{error} </span> }
    </div>
  )
}