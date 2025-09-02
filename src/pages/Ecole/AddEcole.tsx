import { HiOutlineMail } from "react-icons/hi"
import Header from "../../Components/header/Header"
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm"
import Button from "../../Components/ui/Button/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { EcoleSchema, type FormDataEcoleType } from "../../Zod-Validation/Ecole"
import { CreateEcoles } from "../../api/Ecole"
import FieldCheckBox from "../../Components/ui/Fields/InputCheckBox"
import { SiDatev, SiZcool } from "react-icons/si"
import { GrLocal } from "react-icons/gr"

type Props = {}

export default function AddEcole({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    
    const { register, formState: { errors }, handleSubmit } = useForm<FormDataEcoleType>({
        resolver : zodResolver(EcoleSchema)
      });

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataEcoleType) => CreateEcoles(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            queryClient.invalidateQueries({ queryKey: ['ecoles'] });
            navigate("/admin/ecoles");
        },
        onError: (error : ErrorServerForm ) => {
            if (error.response && error.response.data) {
            setErrorServer(error.response.data.message);
            } else {
            setErrorServer("An unexpected error occurred");
            }
        }
    });

    const onSubmit = async (formData: FormDataEcoleType) => {
        console.log(formData);
        setErrorServer("");
        mutation.mutate(formData);
    }


  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Ajouter Ecole" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                    {errorServer  && <p className="bg-red-400 max-w-64 text-sm text-white text-center p-2 my-2"> {errorServer} </p> }
                        <Fields 
                        icons={<SiZcool size={24} />} 
                        label="nom" 
                        register={register("nom")}
                        error={errors.nom?.message}/>
                        <div className="lg:flex justify-between items-end">
                            <Fields 
                            icons={<GrLocal size={24} />} 
                            label="adresse" 
                            register={register("adresse")}
                            error={errors.adresse?.message}/> 
                            <Fields 
                            icons={<SiDatev size={24} />} 
                            label="anneeScolaire" 
                            register={register("anneeScolaire")}
                            error={errors.anneeScolaire?.message}/> 
                        </div>
                        <FieldCheckBox
                        data={["Primaire","College","Lycee","Universite"]} 
                        icons={<HiOutlineMail size={24} className="inline-block" />} 
                        label="type" 
                        register={register("type")}
                        error={errors.type?.message}/>
                        
                        <div className="lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Ajouter" type="submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}