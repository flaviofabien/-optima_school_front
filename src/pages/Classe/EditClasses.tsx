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
import { ClasseEditSchema, type FormDataClasseEditType } from "../../Zod-Validation/Classe"
import { UpdateClasses, getOneClasses } from "../../api/Classes"
import { getAllEcoles } from "../../api/Ecole"
import { setAlert } from "../../store/Users/Users"
import type { EcoleData } from "../../typescript/Ecole"
import Loading from "../../Components/ui/Loader/Loading"
import Validation from "../../Components/ui/Error/Validation"
import { FaSchool } from "react-icons/fa"
import { MdNumbers } from "react-icons/md"

export default function EditClasse() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const  [paramsPatient ] = useState( {
        limit : 100,
        page : 1,
        sortBy : "nom",
        order : "order",
        search : ""
      } )  
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data : DataEcole,isLoading : isLoadingEcole,isError : isErrorEcole} = useQuery<EcoleData>({
      queryKey : ["ecoles",token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
      queryFn : () =>  getAllEcoles(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
    })
    
    const {data,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataClasseEditType>({
        queryKey: ["classes",token,id],
        queryFn: () => getOneClasses(token!,id!),
    });

    
    const { register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataClasseEditType>({
        resolver : zodResolver(ClasseEditSchema)
    });

    useEffect(() => {
    if (data) {
        setValue("nom", data.nom);
        setValue("idEcole", data.idEcole);
    }
    }, [data, setValue]);


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataClasseEditType) => UpdateClasses(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Classe a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['classes'] });
            navigate("/admin/classes");
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

    const onSubmit = async (formData: FormDataClasseEditType) => {    
        setLoad(true)
        setErrorServer("");
        mutation.mutate(formData);
    }

    if ( userOneIsLoading || isLoadingEcole ) return <Loading />
    if ( userOneIsError || isErrorEcole) return <div>Error</div>
   
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Modifier classe" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                    {errorServer  && <Validation errorServer={errorServer} /> }
                        <SelectCustomDataFields 
                        icons={<FaSchool size={24} />} 
                        data={DataEcole?.data}
                        register={register("idEcole",{
                            valueAsNumber : true
                        })}
                        label="ecole"
                        error={errors.idEcole?.message}/> 
                        <Fields 
                        icons={<MdNumbers size={24} />} 
                        label="nom" 
                        register={register("nom")}
                        error={errors.nom?.message}/>
                        
                        <div className="lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Moification" type="submit" load={load} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}