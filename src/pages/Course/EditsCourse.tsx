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
import { UpdateCourses, getOneCourses } from "../../api/Course"
import { CoursesEditSchema, type FormDataCoursesEditType } from "../../Zod-Validation/Course"
import SelectFields from "../../Components/ui/Fields/SelectFields"
import { setAlert } from "../../store/Users/Users"
import Loading from "../../Components/ui/Loader/Loading"
import { BsHourglass } from "react-icons/bs"
import Fields from "../../Components/ui/Fields/Fields"
import { getAllSallesExamens } from "../../api/Salles"
import SelectCustomDataFieldsSimple from "../../Components/ui/Fields/SelectCustomDataFieldsSimple"

type Props = {}

export default function EditCourse({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);


    const {data,isLoading,isError} = useQuery<any>({
      queryKey : ["salle-include-examen" , token] ,
      queryFn : () =>  getAllSallesExamens(token!)
    })   

    const {data : userOne,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<any>({
        queryKey: ["course",token,id],
        queryFn: () => getOneCourses(token!,id!),
    });
    
    const { watch ,  register,setValue, formState: { errors }, handleSubmit } = useForm<any>({
        resolver : zodResolver(CoursesEditSchema)
      });

    useEffect(() => {
    if (userOne) {
        const Classe = data?.classe.find( (o : any) => o.id === userOne.idClasse )
        setValue("idEcole", Classe?.idEcole);
        setValue("idNiveau", Classe?.idNiveau);
        setValue("idClasse", userOne.idClasse);
        setValue("idSalle", userOne.idSalle);
        setValue("idTeacher", userOne.idTeacher);
        setValue("idMatiere", userOne.idMatiere);
        setValue("jour", userOne.jour);
        setValue("heureDebut", userOne.heureDebut);
        setValue("heureFin", userOne.heureFin);
    }
    }, [userOne, setValue,data]);
    console.log(userOne);
    


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataCoursesEditType) => UpdateCourses(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Course a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            navigate("/admin/courses");
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


    const watchEcole = watch("idEcole");
    const watchNiveau = watch("idNiveau");
    const watchClasse = watch("idClasse");
    const watchSalle = watch("idSalle");
    const watchMatiere = watch("idMatiere");
    const watchTeach = watch("idTeacher");


    const onSubmit = async (formData: FormDataCoursesEditType) => {   
        setLoad(true)   
        setErrorServer("");
        mutation.mutate(formData);
    }
    

    if (isLoading || userOneIsLoading) return <Loading />
    if (isError || userOneIsError) return <div>Error</div>
  return (
    <div className="">
        <div className=" flex justify-between items-center">
        <div className="w-full  flex justify-center items-center" >
            <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                <TitleForm title="Modifier cours" />
                {errorServer  && <p className="bg-red-400 max-w-64 text-sm text-white text-center p-2 my-2"> {errorServer} </p> }
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
                                    item={data?.classe.filter( (i : any) => i.idNiveau == watchNiveau && i.idEcole == watchEcole ).map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                    register={register("idClasse")}
                                    label="Classe"
                                    error={errors.idClasse?.message}
                                    /> 
                                } 
                        </div>
                        <div className="flex">
                            {
                                (watchEcole && watchClasse&& watchNiveau ) &&
                                <SelectCustomDataFieldsSimple 
                                item={data?.salle.filter((i : any) => i.idClasse == watchClasse).map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                register={register("idSalle")}
                                label="Salle"
                                error={errors.idSalle?.message}
                                />  
                            }
                        </div>

                       {
                         (watchEcole && watchClasse && watchSalle) && <SelectCustomDataFields 
                        data={data?.matiere?.filter( (i : any) =>  (i.idClasse).toString()  == watchClasse)}
                        register={register("idMatiere")}
                        label="matiere"
                        error={errors.idMatiere?.message}/> 
                       }

{
                                (watchEcole && watchClasse && watchNiveau && watchMatiere && watchSalle ) &&
                                <SelectCustomDataFieldsSimple 
                                item={data?.teacher.filter((i : any) => i.idClasse == watchClasse && i.idMatiere == watchMatiere ).map(  (u : any) => <option value={u.id} > {u?.User?.nom}    </option>)}
                                register={register("idTeacher")}
                                label="Enseignant"
                                error={errors.idTeacher?.message}
                                />  
                            }
                        

                       {
                         (watchMatiere && watchTeach && watchClasse && watchSalle && watchNiveau && watchEcole ) && (
                          <div>
                            <SelectFields 
                            label="jour" 
                            data={["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"]}
                            register={register("jour")}
                            error={errors.jour?.message}/>
                            <div className="lg:flex justify-between items-end">
                                <Fields 
                                icons={<BsHourglass size={24} />} 
                                label="heureDebut" 
                                type="time"
                                register={register("heureDebut")}
                                error={errors.heureDebut?.message}/>
                                <Fields 
                                type="time"
                                icons={<BsHourglass size={24} />} 
                                label="heureFin" 
                                register={register("heureFin")}
                                error={errors.heureFin?.message}/> 
                                
                            </div>

                          </div>
                         )
                       }
                    <div className="lg:flex gap-8 mt-8 justify-between items-start mb-8">
                        <Button text="Modifier" type="submit" load={load} />
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}