import { HiOutlineMail } from "react-icons/hi"
import Header from "../../Components/header/Header"
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm"

import Button from "../../Components/ui/Button/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { userEditSchema, type FormDataUserEditType } from "../../Zod-Validation/Users"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {  UpdateUsers, getOneUsers } from "../../api/Users"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import type { userType } from "../../typescript/Users"
import { BsPerson, BsPersonUp } from "react-icons/bs"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import Loading from "../../Components/ui/Loader/Loading"

type Props = {}

export default function EditUser({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const navigate = useNavigate();
    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data,isLoading,isError} = useQuery<userType>({
        queryKey: ["users",token,id],
        queryFn: () => getOneUsers(token!,id!),
    });

    const { register, setValue,formState: { errors }, handleSubmit } = useForm<FormDataUserEditType>({
        resolver : zodResolver(userEditSchema),
    });

    useEffect(() => {
        if (data) {
          setValue("nom", data.nom);
          setValue("prenom", data.prenom);
          setValue("email", data.email);
          setValue("role", data.role || "" );
        }
      }, [data, setValue]);


    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataUserEditType) => UpdateUsers(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Utilisateur a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate("/admin/users");
            setLoad(false)
        },
        onError: (error : ErrorServerForm ) => {
            if (error.response && error.response.data) {
                setErrorServer(error.response.data.message);
            } else {
                setErrorServer("An unexpected error occurred");
            }
            setLoad(false)
        }
    });

    const onSubmit = async (formData: FormDataUserEditType) => {
        setLoad(true)
        setErrorServer("");
        mutation.mutate(formData);
    }

    if (isLoading) return <Loading />
    if (isError) return <div>Error</div>
   
   
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Modification Utilisateurs" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                        {errorServer  && <Validation errorServer={errorServer} /> }
                        <Fields 
                        icons={<BsPerson size={24} />} 
                        label="Nom" 
                        register={register("nom")}
                        error={errors.nom?.message}/>
                        <Fields 
                        icons={<BsPersonUp size={24} />} 
                        label="Prenom" 
                        register={register("prenom")}
                        error={errors.prenom?.message}/>
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="Email" 
                        register={register("email")}
                        error={errors.nom?.message}/>
                        <div className="lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Modification" type="submit" load={load} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}