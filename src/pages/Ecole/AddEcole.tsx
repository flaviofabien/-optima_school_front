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
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { EcoleSchema, type FormDataEcoleType } from "../../Zod-Validation/Ecole"
import { CreateEcoles } from "../../api/Ecole"
import FieldCheckBox from "../../Components/ui/Fields/InputCheckBox"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import { BsHouse, BsPerson } from "react-icons/bs"
import { BiImage } from "react-icons/bi"
import { FaSchool } from "react-icons/fa"

type Props = {}

export default function AddEcole({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const user = useSelector((state: RootState) => state.dataStorage.user);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const { register, formState: { errors }, handleSubmit } = useForm<FormDataEcoleType>({
        resolver : zodResolver(EcoleSchema)
      });

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormData) => CreateEcoles(token,newUser),
        onSuccess: () => {
            setErrorServer("");            
            dispatch(setAlert({status : true,message : `Ecole a ete ajouter avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['ecoles'] });
            navigate("/admin/ecoles");
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

    const onSubmit = async (formData: FormDataEcoleType) => {
        setLoad(true)
        const newFormData = new FormData();        
        newFormData.append("nom",formData.nom)
        newFormData.append("adresse",formData.adresse)
        newFormData.append("idUser", JSON.stringify(user.id) )
        newFormData.append("type", JSON.stringify(formData.type));
        newFormData.append("img", (formData.img as FileList)[0]);        
        setErrorServer("");
        mutation.mutate(newFormData);
    }


  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Ajouter Ecole" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                    {errorServer  && <Validation errorServer={errorServer} /> }
                        <Fields 
                        icons={<BsPerson size={24} />} 
                        label="nom" 
                        register={register("nom")}
                        error={errors.nom?.message}/>
                        <div className="lg:flex justify-between items-end">
                            <Fields 
                            icons={<BsHouse size={24} />} 
                            label="adresse" 
                            register={register("adresse")}
                            error={errors.adresse?.message}/> 
                            <Fields 
                            icons={<BiImage size={24} />} 
                            label="img" 
                            type="file"
                            register={register("img")}
                            error={errors.img?.message}/> 
                        </div>
                        <FieldCheckBox
                        data={["Primaire", "Collège", "Lycée", "Université"]} 
                        icons={<FaSchool size={24} className="inline-block" />} 
                        label="type" 
                        register={register("type")}
                        error={errors.type?.message}/>
                        
                        <div className="lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Ajouter" type="submit" load={load}  />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}