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
import { UpdateSalles, getAllSallesExamens, getOneSalles } from "../../api/Salles"
import { SalleEditSchema } from "../../Zod-Validation/Salles"
import { setAlert } from "../../store/Users/Users"
import {  MdOutlineExploreOff } from "react-icons/md"
import { BsHouse } from "react-icons/bs"
import Validation from "../../Components/ui/Error/Validation"
import Loading from "../../Components/ui/Loader/Loading"
import SelectCustomDataFieldsSimple from "../../Components/ui/Fields/SelectCustomDataFieldsSimple"
import ImgFontLogo from "../../assets/school-953123_1280.jpg"


export default function EditSalle() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data : salles,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<any>({
        queryKey: ["salles",token,id],
        queryFn: () => getOneSalles(token!,id!),
    });


    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
    })
    
    const { watch , register,setValue, formState: { errors }, handleSubmit } = useForm<any>({
        resolver : zodResolver(SalleEditSchema)
    });

    const watchEcole = watch("idEcole")
    const watchNiveau = watch("idNiveau")
    const watchClasse = watch("idClasse")

    
    useEffect(() => {
        if (salles) {
        console.log(salles.Classe.idNiveau ,data?.niveau );
        setValue("nom", salles.nom);
        setValue("effectif", salles.effectif);
        setValue("idClasse", salles.idClasse);
        setValue("idNiveau", String(salles.Classe?.idNiveau));
        setValue("idEcole", String(salles.Classe.idEcole) );
    }
    }, [salles, setValue]);


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : any) => UpdateSalles(token,newUser,id!),
        onSuccess: () => {
            setLoad(true)
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Salles a ete modifier avec succes`}))
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

    const onSubmit = async (formData: any) => {
        setLoad(true)
        setErrorServer("");
        mutation.mutate(formData);
    }

    if ( userOneIsLoading || isLoading ) return <Loading />
    if ( userOneIsError || isError) return <div>Error</div>
   
  return (
    <div className="">
        <div className=" flex justify-between px-8 items-center">
            <div className="w-full h-[700px] mt-8 flex justify-center items-center" >
                <form className="w-[600px] h-full bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full  rounded-2xl pt-20 px-8">
                        <TitleForm title="Modifier salle" />
                        {errorServer  && <Validation errorServer={errorServer} /> }
                        <div className="flex">
                                <SelectCustomDataFieldsSimple 
                                item={data?.ecole.map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                register={register("idEcole")}
                                label="Ecole"
                                error={errors.idEcole?.message}
                                />
                            </div>
                            <div className="flex">
                                {
                                    watchEcole && <SelectCustomDataFieldsSimple 
                                    item={data?.niveau.filter( (i : any) =>  i.ecoles?.map( (um : any) =>  String(um.id) ).includes(watchEcole)).map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                    register={register("idNiveau")}
                                    label="Niveau"
                                    error={errors.idNiveau?.message}
                                    /> 
                                } 
                            </div>
                            <div className="flex">
                                {
                                    ( watchEcole && watchNiveau) && <SelectCustomDataFieldsSimple 
                                    item={data?.classe.filter( (i : any) => i.idNiveau == watchNiveau).map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                    register={register("idClasse")}
                                    label="Classe"
                                    error={errors.idClasse?.message}
                                    /> 
                                } 
                            </div>
                            {
                                ( watchEcole && watchNiveau && watchClasse) && (
                                        <div>
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
                                        </div>
                                )
                            }
                        <div className="mt-8 lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Ajouter" type="submit" load={load} />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className=" 2xl:block hidden w-1/2 h-full  object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>
  )
}