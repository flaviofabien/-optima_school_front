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
import { UpdateAnneeScolaire, getOneAnneeScolaire } from "../../api/AnneeScolaire"
import { getAllSallesExamens } from "../../api/Salles"
import { AnneeScolaireEditSchema } from "../../Zod-Validation/AnneeScolaire"
import { AnneeScolaireDataYears } from "../../Utils/AnneeScolaire"

export default function EditAnneeScolaire() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data : user,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<any>({
        queryKey: ["annee-scolaires",token,id],
        queryFn: () => getOneAnneeScolaire(token!,id!),
    });

    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
    })
    
    const { register,setValue, formState: { errors }, handleSubmit,watch} = useForm<any>({
        resolver : zodResolver(AnneeScolaireEditSchema)
    });
    const watchDateDebut = watch('dateDebut')
    useEffect(() => {
    if (user) {
        setValue("nom", user?.data.nom);
        setValue("dateDebut", user?.data.dateDebut);
        setValue("dateFin", user?.data.dateFin);
        setValue("idEcole", user?.data.idEcole);
    }
    }, [user, setValue]);


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataSalleEditType) => UpdateAnneeScolaire(token,newUser,id!),
        onSuccess: () => {
            setLoad(true)
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Annee Scolaire a ete modifier avec succes`}))
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

    const onSubmit = async (formData: any) => {
        setLoad(true)
        setErrorServer("");
        mutation.mutate(formData);
    }

    if ( userOneIsLoading || isLoading ) return <Loading />
    if ( userOneIsError || isError ) return <div>Error</div>
   
  return (
    <div className="">
        <div className=" w-full flex justify-center px-8  items-center">
            <div className="w-full max-w-[1200px] rounded-3xl bg-white mt-8 flex justify-center items-center" >
                <form className=" h-full w-[500px] relative rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full   rounded-2xl pt-20 px-8">
                    <TitleForm title="Modifier annee scolaire" />
                    {errorServer  && <Validation errorServer={errorServer} /> }
                        <SelectCustomDataFieldsSimple 
                            item={AnneeScolaireDataYears.map(  (u : any) => <option value={u} > {u}    </option>)}
                            label="nom" 
                            register={register("nom")}
                            error={errors.nom?.message}/>
                        <Fields 
                        label="dateDebut" 
                        register={register("dateDebut")}
                        type={'date'}
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
                            item={data?.ecole.map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                            register={register("idEcole")}
                            label="Ecole"
                            error={errors.idEcole?.message}
                            />
                        <div className="lg:flex gap-8 mt-8 justify-between items-start mb-8">
                            <Button text="Modification" type="submit" load={load}  />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className="2xl:block hidden  w-[1000px] h-[662px]  object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>
  )
}