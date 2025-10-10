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
import { studentSchema, type FormDataStudentType } from "../../Zod-Validation/Students"
import { CreateStudents,  } from "../../api/Student"
import SelectFields from "../../Components/ui/Fields/SelectFields"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import { setAlert } from "../../store/Users/Users"
import Loading from "../../Components/ui/Loader/Loading"
import {  BiMap } from "react-icons/bi"
import { SiDatefns } from "react-icons/si"
import { BsLock, BsPerson } from "react-icons/bs"
import { CgMail } from "react-icons/cg"
import Validation from "../../Components/ui/Error/Validation"
import FieldImage from "../../Components/ui/Fields/FieldImage"
import ImgFontLogo from "../../assets/school-953123_1280.jpg"
import { getAllSallesExamens } from "../../api/Salles"


export default function AddStudent() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);
    const [fileURLs, setFileURLs] = useState();
    const [file, setFile] = useState(); 
    
    const {setValue , watch, register, formState: { errors }, handleSubmit } = useForm<FormDataStudentType>({
        resolver : zodResolver(studentSchema)
    });

    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
    })

    const watchEcole = watch("idEcole");
    const watchNiveau = watch("idNiveau");

    const navigate = useNavigate();
    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormData) => CreateStudents(token,newUser),
        onSuccess: async () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Etudiant a ete Cree avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['students'] });
            navigate("/admin/students");      
            
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

    const onSubmit = async (formData: FormDataStudentType) => {
        setLoad(true) 
               
        const newFormData = new FormData();
        if (file) {
            newFormData.append("img", file);
        }   
  
        newFormData.append("role","eleve");
        newFormData.append("idClasse",formData.idClasse);
        newFormData.append("idNiveau",formData.idNiveau);
        newFormData.append("sex",formData.sex);
        newFormData.append("address",formData.address);
        newFormData.append("dateNaissance",formData.dateNaissance);
        newFormData.append("phone",  (formData.phone).toString() );
        newFormData.append("status",formData.status);
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
        <div className="mt-8 w-full flex justify-center px-8 lg:pl-60 items-center">
            <div className="w-full h-[700px] flex justify-center items-center" >
                <form className="h-full w-[800px] flex justify-center items-center bg-white relative rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full rounded-2xl mt-8 px-8">
                    <TitleForm title="Ajouter Eleve" />
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
                                <div className="gap-4 lg:flex justify-between items-end">
                                    <Fields 
                                    icons={<SiDatefns size={24} />} 
                                    label="dateNaissance" 
                                    register={register("dateNaissance",)}
                                    type="date"
                                    maxDate={new Date().toISOString().split('T')[0]}
                                    error={errors.dateNaissance?.message}/>
                                    <Fields 
                                    icons={<BiMap size={24} />} 
                                    label="address" 
                                    register={register("address")}
                                    error={errors.address?.message}/>
                                </div>
                            </div>
                    </div>
                        <div className="gap-4 lg:flex justify-between items-end">  
                            <Fields 
                            label="phone" 
                            type="text"
                            text="+261"
                            register={register("phone")}
                            error={errors.phone?.message}/> 
                            <SelectFields 
                            label="status" 
                            data={["Passant","Redoublant","Renvoyer","Nouveau"]} 
                            register={register("status")}
                            error={errors.status?.message}/> 
                            <SelectFields
                            data={["Fille","Garçon"]} 
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
                        <div className="mt-4 lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Ajouter" type="submit" load={load} />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className="w-1/3 h-full  object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>
  )
}