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
import { ClasseSchema, type FormDataClasseType } from "../../Zod-Validation/Classe"
import { getAllEcoles } from "../../api/Ecole"
import { CreateClasses } from "../../api/Classes"
import { setAlert } from "../../store/Users/Users"
import type { EcoleData } from "../../typescript/Ecole"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import Validation from "../../Components/ui/Error/Validation"
import Loading from "../../Components/ui/Loader/Loading"
import { FaSchool } from "react-icons/fa"
import { MdNumbers } from "react-icons/md"


export default function AddClasse() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const user = useSelector((state: RootState) => state.dataStorage.user);
    const  [paramsPatient ] = useState( {
        limit : 100,
        page : 1,
        sortBy : "nom",
        order : "order",
        search : ""
      } )  
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data,isLoading,isError} = useQuery<EcoleData>({
      queryKey : ["ecoles",token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
      queryFn : () =>  getAllEcoles(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
    })
    
    const { register, formState: { errors }, handleSubmit } = useForm<FormDataClasseType>({
        resolver : zodResolver(ClasseSchema)
      });

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataClasseType) => CreateClasses(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Classe a ete ajouter avec succes`}))
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

    const onSubmit = async (formData: FormDataClasseType) => {
        setLoad(true)
        setErrorServer("");
        const newUser = {...formData , idUser : user.id}
        mutation.mutate(newUser);
    }

    if (isLoading) return <Loading  />
    if (isError) return <div>Error</div>

  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Ajoute d'une classe" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                    {errorServer  && <Validation errorServer={errorServer} /> }
                            <SelectCustomDataFields 
                            icons={<FaSchool size={24} />} 
                            data={data?.data}
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
                            <Button text="Ajouter" type="submit" load={load}  />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}