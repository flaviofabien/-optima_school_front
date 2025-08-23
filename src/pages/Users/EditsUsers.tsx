import { HiOutlineMail } from "react-icons/hi"
import Header from "../../Components/header/Header"
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm"
import { BiLock } from "react-icons/bi"
import Button from "../../Components/ui/Button/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { userSchema, type FormDataUserType } from "../../Zod-Validation/Users"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {  UpdateUsers, getOneUsers } from "../../api/Users"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { Role } from "../../Utils/Role"
import SelectFields from "../../Components/ui/Fields/SelectFields"
import type { userType } from "../../typescript/Users"

type Props = {}

export default function EditUser({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const navigate = useNavigate();
    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const {data,isLoading,isError} = useQuery<userType>({
        queryKey: ["users",token,id],
        queryFn: () => getOneUsers(token!,id!),
    });

    const { register, setValue,formState: { errors }, handleSubmit } = useForm<FormDataUserType>({
        resolver : zodResolver(userSchema),
    });

    useEffect(() => {
        if (data) {
          setValue("nom", data.nom);
          setValue("prenom", data.prenom);
          setValue("password", data.password);
          setValue("email", data.email);
          setValue("role", data.role || "" );
        }
      }, [data, setValue]);


    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataUserType) => UpdateUsers(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate("/admin/users");
        },
        onError: (error : ErrorServerForm ) => {
            if (error.response && error.response.data) {
                setErrorServer(error.response.data.message);
            } else {
                setErrorServer("An unexpected error occurred");
            }
        }
    });

    const onSubmit = async (formData: FormDataUserType) => {
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
                    <TitleForm title="Modification Utilisateurs" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                        {errorServer  && <p className="bg-red-400 max-w-64 text-sm text-white text-center p-2 my-2"> {errorServer} </p> }
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="Nom" 
                        register={register("nom")}
                        error={errors.nom?.message}/>
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="Prenom" 
                        register={register("prenom")}
                        error={errors.prenom?.message}/>
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="Email" 
                        register={register("email")}
                        error={errors.nom?.message}/>
                        <Fields 
                        icons={<BiLock size={24} />} 
                        label="Password" 
                        register={register("password")}
                        show={true}
                        type="password"
                        error={errors.password?.message}/>
                        <SelectFields 
                        icons={<BiLock size={24} />} 
                        data={Role}
                        label="Role" 
                        register={register("role")}
                        error={errors.password?.message}/>
                        <div className="lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Modification" type="submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}