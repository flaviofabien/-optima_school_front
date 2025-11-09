import { useState } from "react"
import { getAllMatieres } from "../../../api/Matieres"
import { useQuery } from "@tanstack/react-query"
import type { RootState } from "../../../store/store"
import { useSelector } from "react-redux"
import Loading from "../Loader/Loading"
import Button from "../Button/Button"

type Props = {
    label : string
    append : any
    remove : any
    fields : any
    register : any
    error : any
}

export default function FieldNotesAdd({label ,append , remove, fields , register  , error}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    
    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["matieres" , token] ,
        queryFn : () =>  getAllMatieres(token!,1,100000000,"","desc","nom")
      })
    

    if (isLoading ) return <Loading />
    if (isError ) return <div>Error</div>

  return (
    <>
    <div className=" w-full flex flex-col">
        <label htmlFor=" "> {label} </label>
        {
            fields?.map( (field : any , index : any)  => <div key={field.id} className="py-4 flex h-20">
                <select className="w-1/3 border-b-2 border-[var(--color-primary)] h-12"  {...register( `notes.${index}.matiere` )} >
                    <option  defaultValue={"choissir matiere"}></option>
                    {
                        data?.data.map((j : any,i : any) => <option value={j.nom}> {j.nom} </option>)
                    }
                </select>
                <input className="w-2/3 border-b-2 border-[var(--color-primary)] mt-4 " type="text" {...register( `notes.${index}.note` )} />
                <button type={"button"} onClick={() => remove(index) }>
                    - Suprimer 
                </button>
            </div> )
            
        }
        
        <Button type={"button"} onClick={() => append({
            note : "", matiere : ""
        }) }
        text="+ Ajouter "
        />
        

    </div>
    </>
    
  )
}