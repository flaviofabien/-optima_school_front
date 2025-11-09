import ImgFontLogo from "../../assets/pexels-camcasey-1722183.jpg"
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
import {  type FormDataMatiereEditType } from "../../Zod-Validation/Matiere"
import { UpdateMatieres } from "../../api/Matieres"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import Loading from "../../Components/ui/Loader/Loading"
import SelectCustomDataFieldsSimple from "../../Components/ui/Fields/SelectCustomDataFieldsSimple"
import { NotesSchemaEdit } from "../../Zod-Validation/Notes"
import { getAllSallesExamens } from "../../api/Salles"
import { getOneNotes } from "../../api/Notes"

type Props = {}

export default function EditNotes({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data,isLoading,isError} = useQuery<any>({
      queryKey : ["salle-include-examen" , token] ,
      queryFn : () =>  getAllSallesExamens(token!)
    })

    const {data : notes,isLoading :EcoleIsLoading ,isError : EcoleIsError} = useQuery<any>({
        queryKey : ["notes",token,id] ,
        queryFn : () =>  getOneNotes(token!,id)
      });
    
    const { setError, register,setValue, formState: { errors }, handleSubmit , watch} = useForm<any>({
        resolver : zodResolver(NotesSchemaEdit)
    })

    console.log(notes);
    

    useEffect(() => {
    if (notes) {
        
        // 
        setValue("idSalle", notes.idSalle);
        setValue("idStudent", notes.idStudent);
        setValue("idMatiere", notes.idMatiere);
        setValue("idCategorie", notes.idCategorie);
        setValue("note", notes.note);
        // 
        const Salle = data?.salle.find((i : any) => i.id == notes.idSalle  )
        setValue("idClasse", Salle?.idClasse);
        const Classe = data?.classe.find((i : any) => i.id == Salle.idClasse )
        setValue("idEcole", Classe?.idEcole);
        setValue("idNiveau", Classe?.idNiveau);


    }
    }, [notes, setValue,data]);

    const watchEcole = watch("idEcole")
    const watchNiveau = watch("idNiveau")
    const watchClasse = watch("idClasse")
    const watchStudent = watch("idStudent")
    const watchSalle = watch("idSalle")
    const watchMatiere = watch("idMatiere")
    const watchCategorie = watch("idCategorie")


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataMatiereEditType) => UpdateMatieres(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `note a ete modifier avec succes`}))
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

         const matiere = data?.matiere.find( (i : any ) => i.id == formData.idMatiere );
        console.log(matiere);
        

        if (matiere && matiere.coefficiant) { 
            const maxNote = parseInt(matiere.coefficiant) * 20;

            if (formData.note > maxNote) {
                setError("note" , { 
                    type: "manual",
                    message : `La note ne peut pas être supérieure à ${maxNote} (Coefficient ${matiere.coefficiant * 20})`
                }, { shouldFocus: true });
                
                return; 
            } 
        }

        setLoad(true)                
        setErrorServer("");
        mutation.mutate(formData);
    }

    if ( isLoading || EcoleIsLoading ) return <Loading />
    if ( isError || EcoleIsError) return <div>Error</div>
  return (
 <div className="">
         <div className=" w-full  flex justify-center items-center">
             <div className="w-full h-[600px] rounded-3xl bg-white flex justify-center items-center" >
                 <form className="h-full w-[1000px]  flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                     <div className="w-full  rounded-2xl pt-20 px-8">
                         <TitleForm title="Modification Notes" />
                         {errorServer  && <Validation errorServer={errorServer} /> }
                         <div className=" w-full border-b pb-8">
                             <div className="">
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
                             
                                 <div className="">
                                     {
                                         ( watchEcole && watchNiveau && watchClasse) && <SelectCustomDataFieldsSimple 
                                         item={data?.salle.filter( (i : any) => i.idClasse == watchClasse).map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                         register={register("idSalle")}
                                         label="Salle"
                                         error={errors.idSalle?.message}
                                         /> 
                                     } 
                                 </div>
 
                             </div>
                         </div>
                         <div className="w-full flex gap-8 items-end mt-8">
                                 <div className="">
                                 {
                                     (watchEcole && watchClasse && watchSalle && watchNiveau) &&  <SelectCustomDataFieldsSimple 
                                         item={data?.student.map(  (u : any) => <option value={u?.id} > {u?.User?.nom}    </option>)}
                                         register={register("idStudent")}
                                         label="Etudiant"
                                         error={errors.idStudent?.message}
                                         />  
                                 }
                                 </div>
                                 <div className="">
                                 {
                                     (watchEcole && watchClasse && watchSalle && watchNiveau && watchStudent ) &&  <SelectCustomDataFieldsSimple 
                                         item={data?.categorie.map(  (u : any) => <option value={u?.id} > {u.nom}    </option>)}
                                         register={register("idCategorie")}
                                         label="Periode"
                                         error={errors.idCategorie?.message}
                                         />  
                                 }
                                 </div>
 
                                 <div className="">
                                 {
                                     (watchEcole && watchNiveau && watchClasse && watchSalle && watchStudent && watchCategorie) &&
                                     <SelectCustomDataFields 
                                         data={data?.matiere.filter( (i : any) =>  i.idClasse == watchClasse)}
                                         register={register("idMatiere")}
                                         label="Matiere"
                                         error={errors.idMatiere?.message}/> 
                                 } 
                                 </div>
                                 <div className="">
                                 {
                                     (watchEcole && watchNiveau && watchClasse && watchSalle && watchStudent && watchMatiere) &&
                                     <Fields 
                                         register={register("note",{valueAsNumber : true})}
                                         label="Note"
                                         error={errors.note?.message}/> 
                                 } 
                                 </div>
                         </div>
 
                         
                         <div className="mt-4 lg:flex gap-8 justify-between items-start mb-8">
                             <Button text="Modifier" type="submit" load={load} />
                         </div>
                     </div>
                 </form>
                 <img src={ImgFontLogo} className="w-[600px] h-full object-cover  rounded-e-3xl" alt="" />
 
             </div>
         </div>
     </div>
  )
}