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
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import {  getAllClasses} from "../../api/Classes"
import { UpdateSalles, getOneSalles } from "../../api/Salles"
import { SalleEditSchema, type FormDataSalleEditType } from "../../Zod-Validation/Salles"
import { setAlert } from "../../store/Users/Users"
import type { EcoleType } from "../../typescript/Salle"
import { MdNumbers, MdOutlineExploreOff } from "react-icons/md"
import { BsHouse } from "react-icons/bs"
import Validation from "../../Components/ui/Error/Validation"
import Loading from "../../Components/ui/Loader/Loading"

export default function EditSalle() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 

    const {data,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataSalleEditType>({
        queryKey: ["classes",token,id],
        queryFn: () => getOneSalles(token!,id!),
    });

    const {data : dataEcole,isLoading :EcoleIsLoading ,isError : EcoleIsError} = useQuery<EcoleType>({
        queryKey: ["ecoles",token],
        queryFn: () => getAllClasses(token!),
    });
    
    const { register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataSalleEditType>({
        resolver : zodResolver(SalleEditSchema)
    });

    useEffect(() => {
    if (data) {
        setValue("nom", data.nom);
        setValue("effectif", data.effectif);
        setValue("idClasse", data.idClasse);
    }
    }, [data, setValue]);


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataSalleEditType) => UpdateSalles(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Salles a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['salles'] });
            navigate("/admin/salles");
        },
        onError: (error : ErrorServerForm ) => {
            if (error.response && error.response.data) {
            setErrorServer(error.response.data.message);
            } else {
            setErrorServer("An unexpected error occurred");
            }
        }
    });

    const onSubmit = async (formData: FormDataSalleEditType) => {
        
        setErrorServer("");
        mutation.mutate(formData);
    }

    if ( userOneIsLoading || EcoleIsLoading ) return <Loading />
    if ( userOneIsError || EcoleIsError) return <div>Error</div>
   
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Moifier Eleve" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                    {errorServer  && <Validation errorServer={errorServer} /> }
                            <SelectCustomDataFields 
                            icons={<MdNumbers size={24} />} 
                            data={dataEcole?.data}
                            register={register("idClasse",{
                                valueAsNumber : true
                            })}
                            label="classe"
                            error={errors.idClasse?.message}/> 
                            <Fields 
                            icons={<BsHouse size={24} />} 
                            label="nom" 
                            register={register("nom")}
                            error={errors.nom?.message}/>
                            <Fields 
                            icons={<MdOutlineExploreOff size={24} />} 
                            label="effectif" 
                            type="number"
                            register={register("effectif",{
                                valueAsNumber : true
                            })}
                            error={errors.effectif?.message}/>
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