import Header from "../../Components/header/Header"
import TitleForm from "../../Components/ui/Text/TitleForm"
import Button from "../../Components/ui/Button/Button"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import { setAlert } from "../../store/Users/Users"
import Loading from "../../Components/ui/Loader/Loading"
import Validation from "../../Components/ui/Error/Validation"
import { getAllSallesExamens } from "../../api/Salles"
import SelectCustomDataFieldsSimple from "../../Components/ui/Fields/SelectCustomDataFieldsSimple"
import { getAllStudents } from "../../api/Student"
import { NotesSchema } from "../../Zod-Validation/Notes"
import { CreateNotes } from "../../api/Notes"
import ImgFontLogo from "../../assets/pexels-camcasey-1722183.jpg"
import FieldNotesAdd from "../../Components/ui/Fields/FieldNotesAdd"

export default function AddNotes() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data,isLoading,isError} = useQuery<any>({
      queryKey : ["salle-include-examen" , token] ,
      queryFn : () =>  getAllSallesExamens(token!)
    })

    const {data : students,isLoading : isLoadingStudent,isError : isErrorStudents} = useQuery<any>({
        queryKey : ["students" , token] ,
        queryFn : () =>  getAllStudents(token!,1,100000,"","desc","nom")
    })
 
    const { watch , control, register, formState: { errors }, handleSubmit } = useForm<any>({
        resolver : zodResolver(NotesSchema) ,
        defaultValues : [{
            notes : [
                {note : " " , matiere : " "}
            ]
        }]  

    });

    const {fields ,  append  , remove} = useFieldArray({
        name : "notes",
        control , 
    })

    const watchEcole = watch("idEcole")
    const watchNiveau = watch("idNiveau")
    const watchClasse = watch("idClasse")
    const watchStudent = watch("idStudent")

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : any) => CreateNotes(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Note a ete ajouter avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            navigate("/admin/notes");
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
        console.log(formData);
        
        setLoad(true)        
        setErrorServer("");
        mutation.mutate({
            idStudent : formData.idStudent ,
            notes : formData.notes
        });
    }

    if (isLoading || isLoadingStudent ) return <Loading />
    if (isError || isErrorStudents) return <div>Error</div>

  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 w-full  flex justify-center px-8 lg:pl-64 items-center">
            <div className="w-full max-w-[1500px] rounded-3xl bg-white mt-8 flex justify-center items-center" >
                <form className="h-full w-[1000px]  flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full  rounded-2xl pt-20 px-8">
                        <TitleForm title="Ajouter Notes" />
                        {errorServer  && <Validation errorServer={errorServer} /> }
                        <div className="flex w-full">
                            <div className="w-1/2">
                                <SelectCustomDataFieldsSimple 
                                    item={data?.ecole.map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                    register={register("idEcole")}
                                    label="Ecole"
                                    error={errors.idEcole?.message}
                                    />
                                
                                <div className="">
                                    {
                                        watchEcole && <SelectCustomDataFieldsSimple 
                                        item={data?.niveau.filter( (i : any) =>  (i?.ecoles).filter(   (p : any) => p.id == watchEcole) ).map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                        register={register("idNiveau")}
                                        label="Niveau"
                                        error={errors.idNiveau?.message}
                                        /> 
                                    } 
                                </div>
                                <div className="">
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
                                ( watchEcole && watchNiveau && watchClasse) &&
                                    <SelectCustomDataFields 
                                        data={students?.data.filter( (i : any) =>  i.idClasse == watchClasse)}
                                        register={register("idStudent")}
                                        label="etudiant"
                                        error={errors.idStudent?.message}/> 
                            }

                            </div>
                            <div className="w-1/2">
                                <FieldNotesAdd
                                error={errors.notes?.message}
                                label="Notes"
                                append={append}
                                remove={remove}
                                register={register}
                                fields={fields}
                                />
                            </div>
                        </div>

                        
                        <div className="mt-4 lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Ajouter" type="submit" load={load} />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className="w-[1000px] h-[662px]  object-cover  rounded-e-3xl" alt="" />

            </div>
        </div>
    </div>
  )
}