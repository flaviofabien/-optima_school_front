import {  BsMap, BsPhone } from "react-icons/bs"
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
import { TeachEditSchema, type FormDataTeachEditType } from "../../Zod-Validation/Teach"
import { UpdateTeachs, getOneTeachs } from "../../api/Teach"
import SelectFields from "../../Components/ui/Fields/SelectFields"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import Loading from "../../Components/ui/Loader/Loading"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import { getAllSallesExamens } from "../../api/Salles"
import ImgFontLogo from "../../assets/school-953123_1280.jpg"

export default function EditTeach() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 

    const {data : userOne,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataTeachEditType>({
        queryKey: ["users",token,id],
        queryFn: () => getOneTeachs(token!,id!),
    });
    
    const { watch , register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataTeachEditType>({
        resolver : zodResolver(TeachEditSchema)
    });

    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
    })

      const watchEcole = watch("idEcole");
      const watchNiveau = watch("idNiveau");
      const watchClasse = watch("idClasse");
  

    useEffect(() => {
    if (userOne) {
        setValue("sex", userOne.sex);
        setValue("address", userOne.address );
        setValue("phone", userOne.phone);
        setValue("specialite", userOne.specialite);
        setValue("idClasse", `${userOne.idClasse}` );
        setValue("idMatiere", `${userOne.idMatiere}` );
        const DataEcoleUpdate = data?.classe.find((i : any) => i.id == userOne.idClasse )
        
        setValue("idEcole", `${DataEcoleUpdate?.idEcole}` );
        setValue("idNiveau", `${DataEcoleUpdate.idNiveau}` );
    }

    }, [userOne, setValue]);

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormData) => UpdateTeachs(newUser,token!,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Enseignat a ete Modifier avec succes`}))

            queryClient.invalidateQueries({ queryKey: ['teachs'] });
            navigate("/admin/teachs");
        },
        onError: (error : ErrorServerForm ) => {
            if (error.response && error.response.data) {
            setErrorServer(error.response.data.message);
            } else {
            setErrorServer("An unexpected error occurred");
            }
        }
    });

    const onSubmit = async (formData: FormDataTeachEditType) => {  
        const newFormData = new FormData();
  
        newFormData.append("idClasse",formData.idClasse);
        newFormData.append("idMatiere",formData.idMatiere);
        newFormData.append("sex",formData.sex);
        newFormData.append("address",formData.address);
        newFormData.append("phone", (formData.phone).toString() );
        newFormData.append("specialite",formData.specialite);


        setErrorServer("");
        mutation.mutate(newFormData);
    }

    if ( userOneIsLoading || isLoading ) return  <Loading />
    if ( userOneIsError || isError) return <div>Error</div>
   
  return (
    <div className="bg-[var(--font)] h-screen">
    <Header />
    <div className=" flex justify-between px-8 lg:pl-60 items-center">
        <div className=" w-full h-[700ppx] mt-8 flex justify-center items-center" >
            <form className="bg-white  w-[600px] h-full flex justify-center items-center relative rounded-s-2xl" onSubmit={handleSubmit(onSubmit)} >
                <div className="w-full rounded-2xl mt-8 px-8">
                <TitleForm title="Modifier Enseignant" />
                {errorServer  && <Validation errorServer={errorServer} /> }
                        <SelectCustomDataFields  
                        register={register("idEcole")}                            
                        data={data?.ecole}
                        error={errors.idEcole?.message}
                        label="Ecole"
                        />
                        {watchEcole && 
                            <SelectCustomDataFields  
                            register={register("idNiveau")}                            
                            data={data?.niveau.filter( (i : any) =>  (i?.ecoles).filter(   (p : any) => p.id == watchEcole) )}
                            error={errors.idNiveau?.message}
                            label="Niveau"
                            />
                        }
                        {
                            watchEcole && watchNiveau && 
                                <SelectCustomDataFields  
                                register={register("idClasse")}                            
                                data={data?.classe.filter( (i : any) => i.idNiveau == watchNiveau )}
                                error={errors.idClasse?.message}
                                label="Classe"
                                />
                        }
                        {
                            watchEcole && watchNiveau && watchClasse &&
                                <SelectCustomDataFields  
                                register={register("idMatiere")}                            
                                data={data?.matiere.filter( (i : any) => i.idClasse == watchClasse )}
                                error={errors.idMatiere?.message}
                                label="Matiere"
                                />
                        }
                    <div className="lg:flex justify-between items-end">
                        <Fields 
                        icons={<BsMap size={24} />} 
                        label="address" 
                        register={register("address")}
                        error={errors.address?.message}/>
                        <Fields 
                        icons={<BsPhone size={24} />} 
                        label="phone" 
                        type="number"
                        register={register("phone")}
                        error={errors.phone?.message}/> 
                    </div>
                    <div className="lg:flex justify-between items-end">
                        <SelectFields 
                        label="Specialite" 
                        data={["Proffeseur","Retraite"]} 
                        register={register("specialite")}
                        error={errors.specialite?.message}/> 
                        <SelectFields
                        data={["Homme","Femme"]} 
                        label="sex" 
                        register={register("sex")}
                        error={errors.sex?.message}/>  
                    </div>

                    <div className="mt-8 lg:flex gap-8 justify-between items-start mb-8">
                        <Button text="Modifier" type="submit" />
                    </div>
                </div>
            </form>
            <img src={ImgFontLogo} className="w-[500px] h-[600px]  object-cover  rounded-e-3xl" alt="" />
        </div>
    </div>
</div>
  )
}