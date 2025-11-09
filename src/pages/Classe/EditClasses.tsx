import Header from "../../Components/header/Header"
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
import { getAllNiveaux } from "../../api/Niveau"
import SelectFields from "../../Components/ui/Fields/SelectFields"
import ImgFontLogo from "../../assets/school-953123_1280.jpg"
import { HandleNiveaux } from "../../Utils/Niveau"


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

    const {data: dataNiveau,isLoading: isLoadingNiveau,isError : isErrorNiveau} = useQuery<EcoleData>({
        queryKey : ["niveaux",token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
        queryFn : () =>  getAllNiveaux(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
      })

    const {data : DataEcole,isLoading : isLoadingEcole,isError : isErrorEcole} = useQuery<EcoleData>({
      queryKey : ["ecoles",token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
      queryFn : () =>  getAllEcoles(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
    })
    
    const {data,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataClasseEditType>({
        queryKey: ["classes",token,id],
        queryFn: () => getOneClasses(token!,id!),
    });
    console.log(data);
    
    
    const {watch , register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataClasseEditType>({
        resolver : zodResolver(ClasseEditSchema)
    });

    console.log(data)
    useEffect(() => {
    if (data) {
        setValue("nom", data.nom);
        setValue("idEcole", data.idEcole);
        setValue("idNiveau", data.idNiveau);
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
    const watchEcole = watch("idEcole")
    const watchNiveaux = watch("idNiveau");
    const Niveaux = dataNiveau?.data.find( i => i.id == watchNiveaux )

    const [newArray , setNewArray]  = useState([]) ;

    useEffect( ()  => {
        HandleNiveaux(Niveaux , setNewArray)
    } ,[Niveaux] )

    if ( userOneIsLoading || isLoadingEcole || isLoadingNiveau ) return <Loading />
    if ( userOneIsError || isErrorEcole || isErrorNiveau) return <div>Error</div>
   
  return (
    <div className="">
        <div className="w-full flex justify-center px-8  items-center">
            <div className=" w-[800px] h-[600px] mt-8 rounded-l-3xl flex justify-center items-center" >
                <form className="w-1/2 h-full bg-white  flex justify-center items-center relative rounded-l-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="  rounded-2xl pt-20 px-8">
                    <TitleForm title="Modifier Classe" />
                    {errorServer  && <Validation errorServer={errorServer} /> }
                            <SelectCustomDataFields 
                            data={DataEcole?.data}
                            register={register("idEcole",{
                                valueAsNumber : true
                            })}
                            label="ecole"
                            error={errors.idEcole?.message}/> 
                            <SelectCustomDataFields 
                            data={dataNiveau?.data.filter( (i : any) => i?.ecoles?.some((ecole: any) => ecole.id === watchEcole)  )}
                            register={register("idNiveau",{
                                valueAsNumber : true
                            })}
                            label="Niveau"
                            error={errors.idNiveau?.message}/> 
                            <SelectFields
                            data={newArray.map((i :any ) => i.nom)}
                            label="nom" 
                            register={register("nom")}
                            error={errors.nom?.message}/>
                        <div className="lg:flex mt-8 gap-8 justify-between items-start mb-8">
                            <Button text="Modification" type="submit" load={load}  />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className="h-full w-1/2 h object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>
  )
}