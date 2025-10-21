import Header from "../../Components/header/Header"
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm"
import Button from "../../Components/ui/Button/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useMutation,  useQuery,  useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { TeachSchema, type FormDataTeachType } from "../../Zod-Validation/Teach"
import SelectFields from "../../Components/ui/Fields/SelectFields"
import { CreateTeachs } from "../../api/Teach"
import { setAlert } from "../../store/Users/Users"
import { BsLock, BsPerson } from "react-icons/bs"
import { CgMail } from "react-icons/cg"
import Validation from "../../Components/ui/Error/Validation"
import { getAllSallesExamens } from "../../api/Salles"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import Loading from "../../Components/ui/Loader/Loading"
import FieldImage from "../../Components/ui/Fields/FieldImage"
import ImgFontLogo from "../../assets/school-953123_1280.jpg"

export default function AddTeach() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { register , watch , setValue , formState: { errors }, handleSubmit } = useForm<FormDataTeachType>({
        resolver : zodResolver(TeachSchema)
    });
    const [load,setLoad] = useState(false);
    const [fileURLs, setFileURLs] = useState();
    const [file, setFile] = useState(); 


    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
    })

    const watchEcole = watch("idEcole");
    const watchNiveau = watch("idNiveau");
    const watchClasse = watch("idClasse");

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormData) => CreateTeachs(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Enseignat a ete ajouter avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['teacher'] });
            navigate("/admin/teachs");
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

    const onSubmit = async (formData: FormDataTeachType) => {
        setLoad(true)        
        const newFormData = new FormData();

        if (file) {
            newFormData.append("img", file);
        }      

        newFormData.append("role","Enseignant");
        newFormData.append("idClasse",formData.idClasse);
        newFormData.append("idMatiere",formData.idMatiere);
        newFormData.append("sex",formData.sex);
        newFormData.append("address",formData.address);
        newFormData.append("phone", (formData.phone).toString() );
        newFormData.append("specialite",formData.specialite);
        newFormData.append("email",formData.email);
        newFormData.append("nom",formData.nom);
        newFormData.append("prenom",formData.prenom);
        newFormData.append("password",formData.password);

        setErrorServer("");
        mutation.mutate(newFormData);
    }

    if (isLoading) return <Loading />
    if (isError) return <div>Error</div>

  return (
    <div className="bg-[var(--font)] h-screen">
    <Header />
    <div className=" flex justify-between px-8 lg:pl-60 items-center">
        <div className="w-full h-[800px] mt-8 flex justify-center items-center" >
            <form className="w-full lg:w-[600px] h-full bg-white flex justify-center items-center relative rounded-s-2xl" onSubmit={handleSubmit(onSubmit)} >
                <div className="w-full mt-4 px-8">
                <TitleForm title="Ajouter Enseignant" />
                {errorServer  && <Validation errorServer={errorServer} /> }
                <div className="gap-8  lg:flex justify-between 
                    items-center">
                            <div className=" rounded-full">
                                <FieldImage 
                                fileURLs={fileURLs!} 
                                setFileURLs={setFileURLs} 
                                setFile={setFile}
                                /> 
                            </div>
                            <div className="w-full">
                                
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
                                <div className="gap-4 lg:flex justify-between items-end">
                                   
                                    <Fields 
                                    icons={<BsPerson size={24} />} 
                                    label="nom" 
                                    register={register("nom")}
                                    error={errors.nom?.message}/>
                                    <Fields 
                                    icons={<BsPerson size={24} />} 
                                    label="prenom" 
                                    register={register("prenom")}
                                    error={errors.prenom?.message}/> 
                                </div>
                                
                            </div>
                    </div>
                    <div className="gap-4 lg:flex justify-between items-end">
                                    <Fields 
                                    label="address" 
                                    register={register("address")}
                                    error={errors.address?.message}/>
                                    <Fields 
                                    label="phone" 
                                    type="text"
                                    text="+261"
                                    register={register("phone")}
                                    error={errors.phone?.message}/> 
                                </div>
                    <div className="lg:flex justify-between items-end w-full">
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
                   
                        <Fields 
                        icons={<CgMail size={24} />} 
                        label="email" 
                        register={register("email")}
                        error={errors.email?.message}/>
                    </div>
                        <Fields 
                        icons={<BsLock size={24} />} 
                        show={true}
                        type="password"
                        label="password" 
                        register={register("password")}
                        generatePassword={true}
                        setValue={setValue}
                        name="password"
                        error={errors.password?.message}/> 
                        
                    <div className="lg:flex gap-8 mt-8 justify-between items-start mb-8">
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