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
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import FieldCheckBox from "../../Components/ui/Fields/InputCheckBox"
import { EcoleEditSchema, type FormDataEcoleEditType } from "../../Zod-Validation/Ecole"
import { UpdateEcoles, getOneEcoles } from "../../api/Ecole"
import { setAlert } from "../../store/Users/Users"
import Loading from "../../Components/ui/Loader/Loading"
import Validation from "../../Components/ui/Error/Validation"
import { FaSchool } from "react-icons/fa"
import { BiImage } from "react-icons/bi"
import { BsHouse, BsPerson } from "react-icons/bs"

export default function EditEcole() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data : userOne,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataEcoleEditType>({
        queryKey: ["users",token,id],
        queryFn: () => getOneEcoles(token!,id!),
    });
    
    const {setError , register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataEcoleEditType>({
        resolver : zodResolver(EcoleEditSchema)
    });

    useEffect(() => {
        if (userOne) {
            setValue("nom", userOne.nom);
            setValue("adresse", userOne.adresse);
            if (typeof userOne.type === 'string') {
                try {
                    setValue("type", JSON.parse(userOne.type));
                } catch (error) {
                    setValue("type", userOne.type);
                }
            } else {
                setValue("type", userOne.type);
            }        }
    }, [userOne, setValue]);


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormData) => UpdateEcoles(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Utilisateur a ete modifier avec succes`}))
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

    const onSubmit = async (formData: FormDataEcoleEditType) => {
        setLoad(true)
        const newFormData = new FormData();


                
        if ((formData.img as FileList).length <= 0) {
            setError("img", { message: "Veuillez choisir une image." });
            setLoad(false);
            console.log("dans if");
            
            return; 
        }

        newFormData.append("nom",formData.nom)
        newFormData.append("adresse",formData.adresse)
        newFormData.append("type", JSON.stringify(formData.type));
        newFormData.append("img", (formData.img as FileList)[0]);        
        setErrorServer("");
        mutation.mutate(newFormData);
    }

    if ( userOneIsLoading) return <Loading />
    if ( userOneIsError) return <div>Error</div>
   
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Modification Ecole" />
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
                            register={register("img")}
                            type="file"
                            error={errors.img?.message}/> 
                        </div>
                        <FieldCheckBox
                        data={["Primaire", "Collège", "Lycée", "Université"]} 
                        icons={<FaSchool size={24} className="inline-block" />} 
                        label="type" 
                        register={register("type")}
                        error={errors.type?.message}/>
                        
                        <div className="lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Modifier" type="submit" load={load} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}