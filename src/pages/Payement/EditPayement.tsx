import Header from "../../Components/header/Header"
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
import { UpdateCategorie } from "../../api/Categorie"
import { PeriodeEditSchema } from "../../Zod-Validation/Periode"
import SelectCustomDataFieldsSimple from "../../Components/ui/Fields/SelectCustomDataFieldsSimple"
import { getAllSallesExamens } from "../../api/Salles"
import { UpdatePayement, getOnePayement } from "../../api/Payement"
import { PayementEditSchema } from "../../Zod-Validation/Payement"

export default function EditPayement() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);


    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
      })

    const {data :payements,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<any>({
        queryKey: ["payements",token,id],
        queryFn: () => getOnePayement(token!,id!),
    });
    
    const { register,setValue, formState: { errors }, handleSubmit } = useForm<any>({
        resolver : zodResolver(PayementEditSchema)
    });

    useEffect(() => {
    if (payements) {
        setValue("idEcole", `${payements?.data.idEcole}` );
        setValue("idStudent",  `${payements?.data.idStudent}`);
        setValue("motif", payements?.data.motif);
        setValue("type", payements?.data.type);
        setValue("prix",`${ payements?.data.prix}`);
    }
    }, [payements, setValue]);
    


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataSalleEditType) => UpdatePayement(token,newUser,id!),
        onSuccess: () => {
            setLoad(true)
            setErrorServer("");
            dispatch(setAlert({status : true,message : `payements a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['payements'] });
            navigate("/admin/payements");
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
    <div className="bg-[var(--font)] h-full">
        <Header />
        <div className="mt-4 w-full flex justify-center px-8 lg:pl-[280px] items-center">
            <div className="w-full max-w-[1200px] rounded-3xl bg-white mt-8 flex justify-center items-center my-20" >
                <form className=" h-full w-[500px] relative rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full   rounded-2xl pt-20 px-8">
                    <TitleForm title="Modifier payement" />
                    {errorServer  && <Validation errorServer={errorServer} /> }
                        <Fields 
                        label="type" 
                        register={register("type")}
                        error={errors.type?.message}/>
                        <Fields 
                        label="motif" 
                        register={register("motif")}
                        error={errors.motif?.message}/>
                        <Fields 
                        label="prix" 
                        type="number"
                        register={register("prix",{valueAsNumber : true})}
                        error={errors.prix?.message}/>

                        <SelectCustomDataFieldsSimple 
                        item={data?.student.map(  (u : any) => <option value={u.id} > {u.User?.nom}</option>)}
                        register={register("idStudent")}
                        label="etudiant"
                        error={errors.idStudent?.message}
                        />  
                        <SelectCustomDataFieldsSimple 
                        item={data?.ecole.map(  (u : any) => <option value={u.id} > {u.nom}</option>)}
                        register={register("idEcole")}
                        label="ecole"
                        error={errors.idEcole?.message}
                        />

                        <div className="lg:flex gap-8 mt-8 justify-between items-start mb-8">
                            <Button text="Modification" type="submit" load={load}  />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className="w-[1000px] h-[662px]  object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>
  )
}