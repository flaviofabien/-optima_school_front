import Header from "../../Components/header/Header"
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm"
import Button from "../../Components/ui/Button/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import { SalleSchema, type FormDataSalleType } from "../../Zod-Validation/Salles"
import { CreateSalles } from "../../api/Salles"
import { getAllClasses } from "../../api/Classes"
import { setAlert } from "../../store/Users/Users"
import Loading from "../../Components/ui/Loader/Loading"
import { MdNumbers, MdOutlineExploreOff } from "react-icons/md"
import { BsHouse } from "react-icons/bs"
import Validation from "../../Components/ui/Error/Validation"

type Props = {}

export default function AddSalle({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const  [paramsPatient ] = useState( {
        limit : 50,
        page : 1,
        sortBy : "nom",
        order : "desc",
        search : ""
      } )  

    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["classes",token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
        queryFn : () =>  getAllClasses(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
      })
    
    const { register, formState: { errors }, handleSubmit } = useForm<FormDataSalleType>({
        resolver : zodResolver(SalleSchema)
      });

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataSalleType) => CreateSalles(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Salles a ete ajouter avec succes`}))
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

    const onSubmit = async (formData: FormDataSalleType) => {           
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
                    <TitleForm title="Ajouter salle" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                        {errorServer  && <Validation errorServer={errorServer} /> }
                        <SelectCustomDataFields 
                        icons={<MdNumbers size={24} />} 
                        data={data?.data}
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
                            <Button text="Ajouter" type="submit" load={load} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}