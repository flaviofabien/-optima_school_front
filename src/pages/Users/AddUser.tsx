import { HiOutlineMail } from "react-icons/hi"
import Header from "../../Components/header/Header"
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm"
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
import { BsLock, BsPerson } from "react-icons/bs"
import { GiPerson } from "react-icons/gi"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import FieldImage from "../../Components/ui/Fields/FieldImage"
import ImgFontLogo from "../../assets/web-design-3411373_1280.jpg"
import ButtonLink from "../../Components/ui/Button/ButtonLink"

export default function AddUser() {
    const token = useSelector((state: RootState) => state.dataStorage.token);

    const { setValue,register, formState: { errors }, handleSubmit } = useForm<FormDataUserType>({
        resolver : zodResolver(userSchema)
    });

    const navigate = useNavigate();
    const [fileURLs, setFileURLs] = useState();
    const [file, setFile] = useState(); 
    const [load,setLoad] = useState(false);
    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();
    
    const dispatch = useDispatch(); 
    const mutation = useMutation(
        {
        mutationFn: (newUser : FormData) => CreateUsers(token,newUser),
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

    const onSubmit = async (form : any) => {
        const formData = new FormData();

        setLoad(true)
        setErrorServer("");
        formData.append("nom",form.nom)
        formData.append("prenom",form.prenom)
        formData.append("email",form.email)
        formData.append("password",form.password)
        formData.append("role","admin")
        if (file) formData.append("img", file);


        mutation.mutate(formData);
    }
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-4 w-full flex justify-center px-8 lg:pl-60 items-center">
            <div className="w-[1500px] h-[800px]  flex  items-center" >
                <form className=" h-full w-[500px] bg-white p-8 relative rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                        <TitleForm title="Ajouter Utilisateurs" />
                        {errorServer  && <Validation errorServer={errorServer} /> }                        
                        <div className="flex w-full justify-center">
                            <FieldImage 
                            fileURLs={fileURLs!} 
                            setFileURLs={setFileURLs} 
                            setFile={setFile}
                            /> 
                        </div>
                        <div className="flex justify-between">
                            <Fields 
                            icons={<BsPerson size={24} />} 
                            label="Nom" 
                            register={register("nom")}
                            error={errors.nom?.message}
                            />
                            <Fields 
                            icons={<GiPerson size={24} />} 
                            label="Prenom" 
                            register={register("prenom")}
                            error={errors.prenom?.message}/>
                        </div>
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="Email" 
                        register={register("email")}
                        error={errors.nom?.message}/>
                        <Fields 
                            icons={<BsLock size={24} />} 
                            show={true}
                            type="password"
                            label="password" 
                            register={register("password")}
                            generatePassword={true}
                            setValue={setValue}
                            name="password"
                            error={errors.password?.message}/> 

                        <div className="lg:flex gap-8 justify-between items-center my-8">
                            <Button text="Ajouter" type="submit" load={load} />
                            <ButtonLink text="Retour" link="/admin/users" style={1} />
                        </div>
                </form>
                <img src={ImgFontLogo} className="w-[1000px] h-full  object-cover  rounded-e-3xl" alt="" />

            </div>
        </div>
    </div>
  )
}