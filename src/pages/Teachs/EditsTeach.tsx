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
import {  UpdateStudents } from "../../api/Student"
import { TeachEditSchema, type FormDataTeachEditType } from "../../Zod-Validation/Teach"
import { getOneTeachs } from "../../api/Teach"
import SelectFields from "../../Components/ui/Fields/SelectFields"

type Props = {}

export default function EditTeach({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()

    const {data : userOne,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataTeachEditType>({
        queryKey: ["users",token,id],
        queryFn: () => getOneTeachs(token!,id!),
    });
    
    const { register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataTeachEditType>({
        resolver : zodResolver(TeachEditSchema)
      });

    useEffect(() => {
    if (userOne) {
        setValue("sex", userOne.sex);
        setValue("address", userOne.address );
        setValue("phone", userOne.phone);
        setValue("specialite", userOne.specialite);
        setValue("matricule", userOne.matricule);
        setValue("email", userOne.email );
        setValue("nom", userOne.nom);
        setValue("prenom", userOne.prenom);
    }
    }, [userOne, setValue]);


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataTeachEditType) => UpdateStudents(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            queryClient.invalidateQueries({ queryKey: ['students'] });
            navigate("/admin/students");
        },
        onError: (error : ErrorServerForm ) => {
            if (error.response && error.response.data) {
            setErrorServer(error.response.data.message);
            } else {
            setErrorServer("An unexpected error occurred");
            }
        }
    });

    const onSubmit = async (formData: FormDataTeachEditType) => {        
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
                <TitleForm title="Modifier Enseignant" />
                <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                {errorServer  && <p className="bg-red-400 max-w-64 text-sm text-white text-center p-2 my-2"> {errorServer} </p> }
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="matricule" 
                        register={register("matricule")}
                        error={errors.matricule?.message}/>
                    <div className="lg:flex justify-between items-end">
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="nom" 
                        register={register("nom")}
                        error={errors.nom?.message}/>
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="prenom" 
                        register={register("prenom")}
                        error={errors.prenom?.message}/> 
                    </div>
                    <div className="lg:flex justify-between items-end">
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="address" 
                        register={register("address")}
                        error={errors.address?.message}/>
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="phone" 
                        type="number"

                        register={register("phone",{
                            valueAsNumber : true
                        })}
                        error={errors.phone?.message}/> 
                    </div>
                    <div className="lg:flex justify-between items-end">
                        <SelectFields 
                        icons={<HiOutlineMail size={24} />} 
                        label="Specialite" 
                        data={["Encadreur","Proffeseur","Retraite"]} 
                        register={register("specialite")}
                        error={errors.specialite?.message}/> 

                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="email" 
                        register={register("email")}
                        error={errors.email?.message}/>
                    </div>
                        <SelectFields
                        data={["Homme","Femme"]} 
                        icons={<HiOutlineMail size={24} />} 
                        label="sex" 
                        register={register("sex")}
                        error={errors.sex?.message}/> 
 
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