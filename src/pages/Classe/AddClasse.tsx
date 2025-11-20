import TitleForm from "../../Components/ui/Text/TitleForm"
import Button from "../../Components/ui/Button/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
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
import { getAllNiveaux } from "../../api/Niveau"
import SelectFields from "../../Components/ui/Fields/SelectFields"
import ImgFontLogo from "../../assets/school-953123_1280.jpg"
import { HandleNiveaux } from "../../Utils/Niveau"

export default function AddClasse() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
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

    const {data: dataNiveau,isLoading: isLoadingNiveau,isError : isErrorNiveau} = useQuery<EcoleData>({
      queryKey : ["niveaux",token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
      queryFn : () =>  getAllNiveaux(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
    })
    
    const { watch , register, formState: { errors }, handleSubmit } = useForm<FormDataClasseType>({
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

    const watchEcole = watch("idEcole")
    const watchNiveaux = watch("idNiveau");
    const Niveaux = dataNiveau?.data.find(  (i : any) => i.id == watchNiveaux )

    const [newArray , setNewArray]  = useState([]) ;

    useEffect( ()  => {
        HandleNiveaux(Niveaux , setNewArray)
    } ,[Niveaux] )
    

    const onSubmit = async (formData: FormDataClasseType) => {

        setLoad(true)
        setErrorServer("");
        const newUser = {...formData }
        mutation.mutate(newUser);
    }


    if (isLoading || isLoadingNiveau) return <Loading  />
    if (isError || isErrorNiveau) return <div>Error</div>

  return (
    <div className="">
        <div className="w-full flex justify-center px-8  items-center">
            <div className=" w-full h-[600px] mt-8 rounded-l-3xl flex justify-center items-center" >
                <form className="w-[90%] h-full bg-white  flex justify-center items-center relative lg:rounded-l-2xl rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="  rounded-2xl pt-20 px-8 w-full">
                    <TitleForm title="Ajouter Classe" />
                    {errorServer  && <Validation errorServer={errorServer} /> }
                            <SelectCustomDataFields 
                            data={data?.data}
                            register={register("idEcole",{
                                valueAsNumber : true
                            })}
                            label="ecole"
                            error={errors.idEcole?.message}/> 
                            {
                                watchEcole && <div>
                                    <SelectCustomDataFields 
                                    data={dataNiveau?.data.filter( (i : any) => i?.ecoles?.some((ecole: any) => ecole.id === watchEcole)  )}
                                    register={register("idNiveau")}
                                    label="Niveau"
                                    error={errors.idNiveau?.message}/> 
                                </div>
                            }
                            {
                                watchEcole && watchNiveaux && 
                            <SelectFields
                            data={newArray?.map( (i :any) => i.nom)}
                            label="nom" 
                            register={register("nom")}
                            error={errors.nom?.message}/>
                            }
                        <div className="lg:flex mt-8 gap-8 justify-between items-start mb-8">
                            <Button text="Ajouter" type="submit" load={load}  />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className="lg:block hidden  h-full w-1/2 h object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>
  )
}