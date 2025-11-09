
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
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import Loading from "../../Components/ui/Loader/Loading"
import { getAllSallesExamens } from "../../api/Salles"
import SelectCustomDataFieldsSimple from "../../Components/ui/Fields/SelectCustomDataFieldsSimple"
import ImgFontLogo from "../../assets/school-953123_1280.jpg"
import { getOneAbsence, UpdateAbsence } from "../../api/Absence"
import { AbsenceEditSchema } from "../../Zod-Validation/Absence"

type Props = {}

export default function EditAbsence({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data : dataabsence,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<any>({
        queryKey: ["absences",token,id],
        queryFn: () => getOneAbsence(token!,id!),
    });
    
    const { watch , register,setValue, formState: { errors }, handleSubmit } = useForm<any>({
        resolver : zodResolver(AbsenceEditSchema)
    });

    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
    })

    useEffect(() => {
    if (dataabsence) {
        setValue("motif", dataabsence.motif);
        setValue("heurDebut", dataabsence.heurDebut);
        setValue("heurFin", dataabsence.heurFin);
        setValue("dateDebut", dataabsence.dateDebut);
        setValue("dateFin", dataabsence.dateFin);
        setValue("idStudent", dataabsence.idStudent);

        const student = data.student.find((i : any) => i.id == dataabsence.idStudent)  
        const classe = data.classe.find((i : any) => i.id == student.idClasse)    

        console.log(classe,dataabsence,student);
            
        setValue("idClasse", classe.id);
        setValue("idNiveau", classe.idNiveau);
        setValue("idEcole", classe.idEcole);
    }
    }, [dataabsence, setValue]);
        console.log(dataabsence);

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();
    
    const watchEcole = watch("idEcole")
    const watchNiveau = watch("idNiveau")
    const watchClasse = watch("idClasse")

    const mutation = useMutation(
        {
        mutationFn: (newUser : any) => UpdateAbsence(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `absence a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['absences'] });
            navigate("/admin/absences");   
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
        mutation.mutate({            
            idStudent : formData.idStudent,
            motif : formData.motif,
            dateDebut : formData.dateDebut,
            dateFin : formData.dateFin,
            heurDebut : formData.heurDebut,
            heurFin : formData.heurFin,
        });
    }

    if ( userOneIsLoading || isLoading ) return <Loading />
    if ( userOneIsError || isError) return <div>Error</div>
  return (
     <div className="">
            <div className=" flex justify-between items-center">
                <div className="w-full h-[900px]  flex justify-center items-center" >
                    <form className="w-[600px] h-full bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                        <div className="w-full  rounded-2xl pt-20 px-8">
                            <TitleForm title="Mofifier absence" />
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
                                        item={data?.niveau.filter( (i : any) =>  (i?.ecoles).filter(   (p : any) => p.id == watchEcole) ).map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
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
                                 <div className="flex">
                                    {
                                        ( watchEcole && watchNiveau && watchClasse) && <SelectCustomDataFieldsSimple 
                                        item={data?.student.filter( (i : any) => i.idClasse == watchClasse).map(  (u : any) => 
                                        <option value={u.id} > {u.User.nom}  {u.User.nom}   </option>)}
                                        register={register("idStudent")}
                                        label="Etudiant"
                                        error={errors.idStudent?.message}
                                        /> 
                                    } 
                                </div>
                                {
                                    ( watchEcole && watchNiveau && watchClasse) && (
                                            <div>
                                                    <Fields 
                                                    label="motif" 
                                                    register={register("motif")}
                                                    error={errors.motif?.message}/>
                                                      <Fields 
                                                        label="dateDebut" 
                                                        type="date"
                                                        register={register("dateDebut")}
                                                        error={errors.dateDebut?.message}/>
                                                        <Fields 
                                                        label="dateFin" 
                                                        type="date"
                                                        register={register("dateFin")}
                                                        error={errors.dateFin?.message}/>
                                                    <div className="lg:flex justify-between items-end">
                                                        <Fields 
                                                        label="heurDebut" 
                                                        type="time"
                                                        register={register("heurDebut")}
                                                        error={errors.heurDebut?.message}/>
                                                        <Fields 
                                                        type="time"
                                                        label="heurFin" 
                                                        register={register("heurFin")}
                                                        error={errors.heurFin?.message}/> 
                                                        
                                                    </div>
                                            </div>
                                    )
                                }
                            <div className="mt-8 lg:flex gap-8 justify-between items-start mb-8">
                                <Button text="Modifier" type="submit" load={load} />
                            </div>
                        </div>
                    </form>
                    <img src={ImgFontLogo} className="lg:block hidden w-1/2 h-full  object-cover  rounded-e-3xl" alt="" />
                </div>
            </div>
        </div>
  )
}