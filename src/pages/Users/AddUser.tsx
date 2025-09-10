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
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateUsers } from "../../api/Users"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { BsPerson } from "react-icons/bs"
import { GiPerson } from "react-icons/gi"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"

export default function AddUser() {
    const token = useSelector((state: RootState) => state.dataStorage.token);

    const { register, formState: { errors }, handleSubmit } = useForm<FormDataUserType>({
        resolver : zodResolver(userSchema)
    });

    const navigate = useNavigate();

    const [load,setLoad] = useState(false);
    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();
    
    const dispatch = useDispatch(); 
    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataUserType) => CreateUsers(token,newUser),
        onSuccess: () => { 
            dispatch(setAlert({status : true,message : `Utilisateur a ete Ajouter avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate("/admin/users");
            setLoad(false)
            setErrorServer("");
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

    const onSubmit = async (formData: FormDataUserType) => {
        setLoad(true)
        setErrorServer("");
        const newUser = {...formData , role : "admin"}
        mutation.mutate(newUser);
    }
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Ajouter Utilisateurs" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                    {errorServer  && <Validation errorServer={errorServer} /> }                        <Fields 
                        icons={<BsPerson size={24} />} 
                        label="Nom" 
                        register={register("nom")}
                        error={errors.nom?.message}/>
                        <Fields 
                        icons={<GiPerson size={24} />} 
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

                        <div className="lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Ajouter" type="submit" load={load} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}