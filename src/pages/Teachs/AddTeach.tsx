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
import { getAllTeachUsers } from "../../api/Users"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import type { userType } from "../../typescript/Users"
import { CreateTeachs } from "../../api/Teach"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectFieldsCustom"
import { TeachSchema, type FormDataTeachType } from "../../Zod-Validation/Teach"

type Props = {}

export default function AddTeach({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
  
    const {data,isLoading,isError} = useQuery<userType[]>({
        queryKey: ["users",token],
        queryFn: () => getAllTeachUsers(token!),
    })
    
    const { register, formState: { errors }, handleSubmit } = useForm<FormDataTeachType>({
        resolver : zodResolver(TeachSchema)
    });

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataTeachType) => CreateTeachs(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            queryClient.invalidateQueries({ queryKey: ['teacher'] });
            navigate("/admin/teachs");
        },
        onError: (error : ErrorServerForm ) => {
            if (error.response && error.response.data) {
            setErrorServer(error.response.data.message);
            } else {
            setErrorServer("An unexpected error occurred");
            }
        }
    });

    const onSubmit = async (formData: FormDataTeachType) => {
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
                    <TitleForm title="Ajouter Utilisateurs" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                    {errorServer  && <p className="bg-red-400 max-w-64 text-sm text-white text-center p-2 my-2"> {errorServer} </p> }
                            <SelectCustomDataFields 
                            icons={<HiOutlineMail size={24} />} 
                            data={data}
                            register={register("userId",{
                                valueAsNumber : true
                            })}
                            error={errors.userId?.message}/> 
                            <Fields 
                            icons={<HiOutlineMail size={24} />} 
                            label="sex" 
                            register={register("sex")}
                            error={errors.sex?.message}/>
                        <div className="lg:flex justify-between items-end">
                            <Fields 
                            icons={<HiOutlineMail size={24} />} 
                            label="address" 
                            register={register("address")}
                            error={errors.address?.message}/>
                            <Fields 
                            icons={<HiOutlineMail size={24} />} 
                            label="phone" 
                            register={register("phone")}
                            error={errors.phone?.message}/> 
                        </div>
                        <div className="lg:flex justify-between items-end">
                            <Fields 
                            icons={<HiOutlineMail size={24} />} 
                            label="specialite" 
                            register={register("specialite")}
                            error={errors.specialite?.message}/>
                            <Fields 
                            icons={<HiOutlineMail size={24} />} 
                            label="status" 
                            register={register("status")}
                            error={errors.status?.message}/> 
                        </div>
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