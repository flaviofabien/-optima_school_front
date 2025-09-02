import { HiOutlineMail } from "react-icons/hi"
import Header from "../../Components/header/Header"
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm"
import Button from "../../Components/ui/Button/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { useNavigate, useParams } from "react-router-dom"
import {  useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import {  type FormDataStudentType, type FormDataStudentEditType } from "../../Zod-Validation/Students"
import {  UpdateStudents} from "../../api/Student"
import { SiDatev, SiZcool } from "react-icons/si"
import { GrLocal } from "react-icons/gr"
import FieldCheckBox from "../../Components/ui/Fields/InputCheckBox"
import { EcoleEditSchema, type FormDataEcoleEditType } from "../../Zod-Validation/Ecole"
import { UpdateEcoles, getOneEcoles } from "../../api/Ecole"

export default function EditEcole() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()

    const {data : userOne,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataEcoleEditType>({
        queryKey: ["users",token,id],
        queryFn: () => getOneEcoles(token!,id!),
    });
    
    const { register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataEcoleEditType>({
        resolver : zodResolver(EcoleEditSchema)
    });

    useEffect(() => {
    if (userOne) {
        setValue("nom", userOne.nom);
        setValue("adresse", userOne.adresse);
        setValue("type", userOne.type);
        setValue("anneeScolaire", userOne.anneeScolaire );
    }
    }, [userOne, setValue]);


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataEcoleEditType) => UpdateEcoles(token,newUser,id!),
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

    const onSubmit = async (formData: FormDataEcoleEditType) => {
        console.log(formData);
        
        setErrorServer("");
        mutation.mutate(formData);
    }

    if ( userOneIsLoading) return <div>...loading</div>
    if ( userOneIsError) return <div>Error</div>
   
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Modification Ecole" />
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
                            <Button text="Modifier" type="submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}