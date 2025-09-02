import React, { useState } from 'react';
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
    // const [showInput, setShowInput] = useState(false);
    // const [autherData,setAutherData] = useState("")

    // const HandleClick = (auter : string) => {
    //     data[data.length] = auter
    //     setShowInput(false)
    // }

   
  return (
    <div className='w-full mt-4  flex '>

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

                    {/* <button onClick={() => setShowInput(!showInput)} type='button' className={`${none}  bg-yellow-400 px-4 rounded-md hover:bg-yellow-300 group`}>... autre (a saisir )</button>
                    {showInput && ( <div> <input value={autherData} onChange={(e) =>
                        {
                            setAutherData(e.target.value)
                        } } type="text" className='inline-block mt-2 p-1 border rounded-md' />


                        
                         <button type='button' onClick={() => HandleClick(autherData)  } className={`px-4 bg-yellow-400 hover:bg-yellow-300 ml-2 rounded-md py-1 `}>ok</button> </div>
                    )} */}
                        
            </div>
            
        {error && <span className='text-xs text-red-500'>{error} </span> }
    </div>
  )
}