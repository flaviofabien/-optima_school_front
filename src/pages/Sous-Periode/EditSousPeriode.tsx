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
import { type FormDataSalleEditType } from "../../Zod-Validation/Salles"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import Loading from "../../Components/ui/Loader/Loading"
import ImgFontLogo from "../../assets/pexels-camcasey-1722183.jpg"
import SelectCustomDataFieldsSimple from "../../Components/ui/Fields/SelectCustomDataFieldsSimple"
import { getAllSallesExamens } from "../../api/Salles"
import { getOneSousPeriode, UpdateSousPeriode } from "../../api/Sous-periode"
import { SousPeriodeEditSchema } from "../../Zod-Validation/SousPeriode"

export default function EditSousPeriode() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
    })

    const {data :periodes,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<any>({
        queryKey: ["sous-periodes",token,id],
        queryFn: () => getOneSousPeriode(token!,id!),
    });
    
    const { register,setValue, formState: { errors }, handleSubmit,watch } = useForm<any>({
        resolver : zodResolver(SousPeriodeEditSchema)
    });
    const watchDateDebut = watch('dateDebut')

    useEffect(() => {
    if (periodes) {
        setValue("nom", periodes?.data.nom);
        setValue("dateDebut", periodes?.data.dateDebut);
        setValue("dateFin", periodes?.data.dateFin);
        setValue("type", periodes?.data.type);
        setValue("idCategorie",`${periodes?.data.idCategorie}` );
    }
    }, [periodes, setValue]);

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataSalleEditType) => UpdateSousPeriode(token,newUser,id!),
        onSuccess: () => {
            setLoad(true)
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Sous Periodes a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['sous-periodes'] });
            navigate("/admin/sous-periodes");
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
           <div className="w-full flex justify-center px-8 lg:pl-[280px] items-center">
               <div className="w-full max-w-[1200px] rounded-3xl bg-white mt-8 flex justify-center items-center" >
                   <form className=" h-full w-[500px] relative rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                       <div className="w-full   rounded-2xl pt-20 px-8">
                       <TitleForm title="Edit Sous periode" />
                       {errorServer  && <Validation errorServer={errorServer} /> }
                           <Fields 
                           label="nom" 
                           register={register("nom")}
                           error={errors.nom?.message}/>
   
                           <Fields 
                           label="dateDebut" 
                           type="date"
                           register={register("dateDebut")}
                           error={errors.dateDebut?.message}/>
   
                            {
                                watchDateDebut && (
                                    <Fields 
                                        label="dateFin" 
                                        type={'date'}
                                        register={register("dateFin")}
                                        minDate={watchDateDebut}
                                        error={errors.dateFin?.message}/>

                                ) 
                            }
   
                           <SelectCustomDataFieldsSimple 
                           item={['Vacance','Examen','Paque'].map(  (u : any) => <option value={u} > {u}</option>)}
                           register={register("type")}
                           label="Type"
                           error={errors.type?.message}
                           />  
                          
                           <SelectCustomDataFieldsSimple 
                           item={data?.categorie.map(  (u : any) => <option value={u.id} > {u.nom}</option>)}
                           register={register("idCategorie")}
                           label="Periode"
                           error={errors.idCategorie?.message}
                           /> 
   
                           <div className="lg:flex gap-8 mt-8 justify-between items-start mb-8">
                               <Button text="Modification" type="submit" load={load}  />
                           </div>
                       </div>
                   </form>
                   <img src={ImgFontLogo} className="2xl:block hidden w-[1000px] h-[662px]  object-cover  rounded-e-3xl" alt="" />
               </div>
           </div>
       </div>
  )
}