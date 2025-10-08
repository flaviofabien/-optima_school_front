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
import { getAllSallesExamens } from "../../api/Salles"
import Loading from "../../Components/ui/Loader/Loading"
import SelectCustomDataFieldsSimple from "../../Components/ui/Fields/SelectCustomDataFieldsSimple"
import { CreateAnneeScolaire } from "../../api/AnneeScolaire"
import { AnneeScolaireSchema } from "../../Zod-Validation/AnneeScolaire"

type Props = {}

export default function AddAnneeScolaire({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);
    
    const { register, formState: { errors }, handleSubmit } = useForm<any>({
        resolver : zodResolver(AnneeScolaireSchema)
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
        mutationFn: (newUser : any) => CreateAnneeScolaire(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Annee Scolaire a ete ajouter avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['annee-scolaires'] });
            navigate("/admin/annee-scolaires");
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
        setLoad(true)
        setErrorServer("");
        mutation.mutate(formData);
    }

    if (isLoading ) return <Loading  />
    if (isError) return <div>Error</div>

  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-4 w-full flex justify-center px-8 lg:pl-[280px] items-center">
            <div className="w-full max-w-[1200px] rounded-3xl bg-white mt-8 flex justify-center items-center" >
                <form className=" h-full w-[500px] relative rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full   rounded-2xl pt-20 px-8">
                    <TitleForm title="Annee Scolaire" />
                    {errorServer  && <Validation errorServer={errorServer} /> }
                        <SelectCustomDataFieldsSimple 
                        item={["2024-2025","2025-2026","2026-2027"].map(  (u : any) => <option value={u} > {u}    </option>)}
                        label="nom" 
                        register={register("nom")}
                        error={errors.nom?.message}/>
                        <Fields 
                        label="dateDebut" 
                        register={register("dateDebut")}
                        type={'date'}
                        error={errors.dateDebut?.message}/>
                        <Fields 
                        label="dateFin" 
                        type={'date'}
                        register={register("dateFin")}
                        error={errors.dateFin?.message}/>
                        <SelectCustomDataFieldsSimple 
                        item={data?.ecole.map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                        register={register("idEcole")}
                        label="Ecole"
                        error={errors.idEcole?.message}
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