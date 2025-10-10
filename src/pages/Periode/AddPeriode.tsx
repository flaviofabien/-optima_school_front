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
import { type FormDataSalleType } from "../../Zod-Validation/Salles"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import ImgFontLogo from "../../assets/pexels-camcasey-1722183.jpg"
import { CreateCategorie } from "../../api/Categorie"
import { getAllSallesExamens } from "../../api/Salles"
import Loading from "../../Components/ui/Loader/Loading"
import SelectCustomDataFieldsSimple from "../../Components/ui/Fields/SelectCustomDataFieldsSimple"
import { PeriodeSchema } from "../../Zod-Validation/Periode"

type Props = {}

export default function AddPeriode({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);
    
    const { register, formState: { errors }, handleSubmit } = useForm<any>({
        resolver : zodResolver(PeriodeSchema)
      });

      const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
      })

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : any) => CreateCategorie(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Periodes a ete ajouter avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['periodes'] });
            navigate("/admin/periodes");
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
        console.log(formData);
                
        setLoad(true)
        setErrorServer("");
        mutation.mutate(formData);
    }

    if (isLoading) return <Loading  />
    if (isError ) return <div>Error</div>

  return (
    <div className="bg-[var(--font)] h-full">
        <Header />
        <div className="mt-4 w-full flex justify-center px-8 lg:pl-[280px] items-center">
            <div className="w-full max-w-[1200px] rounded-3xl bg-white mt-8 flex justify-center items-center" >
                <form className=" h-full w-[500px] relative rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full   rounded-2xl pt-20 px-8">
                    <TitleForm title="Ajoute Type Examen" />
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
                        <Fields 
                        label="dateFin" 
                        type="date"
                        register={register("dateFin")}
                        error={errors.dateFin?.message}/>
                        <SelectCustomDataFieldsSimple 
                        item={['Vacance','Examen','Paque'].map(  (u : any) => <option value={u} > {u}</option>)}
                        register={register("type")}
                        label="Type"
                        error={errors.type?.message}
                        />  
                        <SelectCustomDataFieldsSimple 
                        item={data?.anneeScolaire.map(  (u : any) => <option value={u.id} > {u.nom}</option>)}
                        register={register("idAnneeScolaire")}
                        label="Annee Scolaire"
                        error={errors.type?.message}
                        />  
                        <SelectCustomDataFieldsSimple 
                        item={data?.niveau.map(  (u : any) => <option value={u.id} > {u.nom}</option>)}
                        register={register("idNiveau")}
                        label="Niveau"
                        error={errors.type?.message}
                        />  
                        <div className="lg:flex gap-8 mt-8 justify-between items-start mb-8">
                            <Button text="Ajouter" type="submit" load={load}  />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className="w-[1000px] h-[662px]  object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>
  )
}