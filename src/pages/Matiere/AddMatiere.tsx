import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { MatiereSchema } from "../../Zod-Validation/Matiere"
import { CreateMatieres } from "../../api/Matieres"
import { setAlert } from "../../store/Users/Users"
import Loading from "../../Components/ui/Loader/Loading"
import SelectCustomDataFieldsSimple from "../../Components/ui/Fields/SelectCustomDataFieldsSimple"
import Validation from "../../Components/ui/Error/Validation"
import TitleForm from "../../Components/ui/Text/TitleForm"
import Header from "../../Components/header/Header"
import ImgFontLogo from "../../assets/school-953123_1280.jpg"
import Button from "../../Components/ui/Button/Button"
import Fields from "../../Components/ui/Fields/Fields"
import { getAllSallesExamens } from "../../api/Salles"

export default function AddMatiere() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
    })

    const { watch, register, formState: { errors }, handleSubmit } = useForm<any>({
        resolver : zodResolver(MatiereSchema)
    });

    const watchEcole = watch("idEcole")
    const watchNiveau = watch("idNiveau")
    const watchClasse = watch("idClasse")
    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : any) => CreateMatieres(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Matiere a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['matieres'] });
            navigate("/admin/matieres");
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
            idClasse : formData.idClasse,
            coefficiant : formData.idClasse,
            nom : formData.nom
        });
    }

    if (isLoading) return <Loading />
    if (isError) return <div>Error</div>

  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full h-[700px] mt-8 flex justify-center items-center" >
                <form className="w-[600px] h-full bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full  rounded-2xl pt-20 px-8">
                        <TitleForm title="Ajouter matiere" />
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
                            {
                                ( watchEcole && watchNiveau && watchClasse) && (
                                        <div>
                                                <Fields 
                                                label="nom" 
                                                register={register("nom")}
                                                error={errors.nom?.message}/>
                                                <Fields 
                                                label="coefficiant" 
                                                type="number"
                                                register={register("coefficiant",{
                                                    valueAsNumber : true
                                                })}
                                                error={errors.coefficiant?.message}/>
                                        </div>
                                )
                            }
                        <div className="mt-8 lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Ajouter" type="submit" load={load} />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className="w-1/2 h-full  object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>

  )
}