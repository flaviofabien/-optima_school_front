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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { CreateStudents,  } from "../../api/Student"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectFieldsCustom"
import type { userType } from "../../typescript/Users"
import { getAllStudentUsers } from "../../api/Users"
import { ClasseSchema, type FormDataClasseType } from "../../Zod-Validation/Classe"
import { getAllEcoles } from "../../api/Ecole"
import { CreateClasses } from "../../api/Classes"


type Props = {}

export default function AddClasse({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
  
    const {data,isLoading,isError} = useQuery<userType[]>({
        queryKey: ["users",token],
        queryFn: () => getAllEcoles(token!),
    })
    
    const { register, formState: { errors }, handleSubmit } = useForm<FormDataClasseType>({
        resolver : zodResolver(ClasseSchema)
      });

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataClasseType) => CreateClasses(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            queryClient.invalidateQueries({ queryKey: ['classes'] });
            navigate("/admin/classes");
        },
        onError: (error : ErrorServerForm ) => {
            if (error.response && error.response.data) {
            setErrorServer(error.response.data.message);
            } else {
            setErrorServer("An unexpected error occurred");
            }
        }
    });

    const onSubmit = async (formData: FormDataClasseType) => {
        console.log(formData);
        
        setErrorServer("");
        mutation.mutate(formData);
    }

    if (isLoading) return <div>...loading</div>
    if (isError) return <div>Error</div>

  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Ajouter Eleve" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                    {errorServer  && <p className="bg-red-400 max-w-64 text-sm text-white text-center p-2 my-2"> {errorServer} </p> }
                            <SelectCustomDataFields 
                            icons={<HiOutlineMail size={24} />} 
                            data={data}
                            register={register("idEcole",{
                                valueAsNumber : true
                            })}
                            error={errors.idEcole?.message}/> 
                            <Fields 
                            icons={<HiOutlineMail size={24} />} 
                            label="nom" 
                            register={register("nom")}
                            error={errors.nom?.message}/>
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