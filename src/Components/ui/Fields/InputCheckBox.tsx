import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
    register : UseFormRegisterReturn;
    error? : string;
    label : string,
    data : string[],
    none ?: string,
    icons ? : React.ReactNode
}

export default function FieldCheckBox({ label,register,error,data,icons}: Props) {
  return (
    <div className='w-full mt-4  flex flex-col'>
        <div className={`w-full border-b-4 py-2 border-[var(--color-primary-transparent)] ${error ? "":"mb-4" } `}>
                <div className='inline-block pr-2  text-[var(--color-primary)] text-sm'> {icons} Type : </div>
                {
                    data?.map((option) => (
                        <>
                        <div key={option} className='inline-block mr-4 text-[var(--gray)]'>
                            <label className=' font-light text-sm' htmlFor={`${option}`}> {option} : </label> 
                            <input id={`${label}`} {...register}  type='checkbox' className=' w-6' value={option}   /> 
                        </div>
                        </>
                    ) ) 
                }                 
        </div>
        {error && <span className='text-xs block text-red-500'>{error} </span> }
    </div>
  )
}