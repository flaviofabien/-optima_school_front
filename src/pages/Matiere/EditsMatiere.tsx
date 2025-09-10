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
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { MatiereEditSchema, type FormDataMatiereEditType } from "../../Zod-Validation/Matiere"
import { UpdateMatieres, getOneMatieres } from "../../api/Matieres"
import { getAllClasses } from "../../api/Classes"
import type { FormDataClasseEditType } from "../../Zod-Validation/Classe"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"

type Props = {}

export default function EditMatiere({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);


    const {data : dataMatiere,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataMatiereEditType>({
        queryKey: ["matieres",token,id],
        queryFn: () => getOneMatieres(token!,id!),
    });

    const {data : data,isLoading :EcoleIsLoading ,isError : EcoleIsError} = useQuery<FormDataClasseEditType[]>({
        queryKey: ["classes",token],
        queryFn: () => getAllClasses(token!),
    });
    
    const { register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataMatiereEditType>({
        resolver : zodResolver(MatiereEditSchema)
    });

    useEffect(() => {
    if (dataMatiere) {
        setValue("nom", dataMatiere.nom);
        setValue("coefficiant", dataMatiere.coefficiant);
        setValue("idClasse", dataMatiere.idClasse);
    }
    }, [dataMatiere, setValue]);


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataMatiereEditType) => UpdateMatieres(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Matiere a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['salles'] });
            navigate("/admin/salles");   
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

    const onSubmit = async (formData: FormDataMatiereEditType) => {
        setLoad(true)                
        setErrorServer("");
        mutation.mutate(formData);
    }

    if ( userOneIsLoading || EcoleIsLoading ) return <div>...loading</div>
    if ( userOneIsError || EcoleIsError) return <div>Error</div>
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Ajouter Matiere" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                        {errorServer  && <Validation errorServer={errorServer} /> }
                        <SelectCustomDataFields 
                        icons={<HiOutlineMail size={24} />} 
                        data={data}
                        register={register("idClasse",{
                            valueAsNumber : true
                        })}
                        label="classe"
                        error={errors.idClasse?.message}/> 

                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="nom" 
                        register={register("nom")}
                        error={errors.nom?.message}/>
                        <Fields 
                        icons={<HiOutlineMail size={24} />} 
                        label="coefficiant" 
                        type="number"
                        register={register("coefficiant",{
                            valueAsNumber : true
                        })}
                        error={errors.coefficiant?.message}/>
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