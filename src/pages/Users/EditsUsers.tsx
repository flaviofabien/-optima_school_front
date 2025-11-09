import { HiOutlineMail } from "react-icons/hi"
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm"
import ImgFontLogo from "../../assets/user.jpg"
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
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import Loading from "../../Components/ui/Loader/Loading"
import ButtonLink from "../../Components/ui/Button/ButtonLink"

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
        }
      }, [data, setValue]);


    const mutation = useMutation(
        {
        mutationFn: (newUser : any) => UpdateUsers(token,newUser,id!),
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

    const onSubmit = async (formData: any) => {
        setLoad(true)
        setErrorServer("");
        mutation.mutate(formData);
    }

    if (isLoading) return <Loading />
    if (isError) return <div>Error</div>
   
   
  return (
    <div className="w-full">
        <div className="mt-4 w-full flex justify-center px-8 items-center">
            <div className="rounded-s-3xl w-full h-[800px]  flex  items-center bg-white " >

                <form className="w-full 2xl:w-[500px] p-8 relative rounded-s-3xl lg:rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                        <TitleForm title="Modification d'utilisateurs" />
                        {errorServer  && <Validation errorServer={errorServer} /> }                        
                        
                        <div className="flex justify-between">
                            <Fields 
                            label="Nom" 
                            register={register("nom")}
                            error={errors.nom?.message}/>
                            <Fields 
                            label="Prenom" 
                            register={register("prenom")}
                            error={errors.prenom?.message}/>
                        </div>
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="Email" 
                        register={register("email")}
                        error={errors.nom?.message}/>
                        <div className="lg:flex gap-8 justify-between items-center my-8">
                            <Button text="Modification" type="submit" load={load} />
                            <ButtonLink text="Retour" link="/admin/users" style={1} />
                        </div>
                </form>
                <img src={ImgFontLogo} className="hidden 2xl:block w-full h-[800px]  object-cover  rounded-e-3xl" alt="" />

            </div>
        </div>
    </div>
  )
}