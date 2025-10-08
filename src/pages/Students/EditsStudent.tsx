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
import {  type FormDataStudentType, type FormDataStudentEditType, studentEditSchema } from "../../Zod-Validation/Students"
import {  UpdateStudents, getOneStudents } from "../../api/Student"
import SelectFields from "../../Components/ui/Fields/SelectFields"
import { setAlert } from "../../store/Users/Users"
import Loading from "../../Components/ui/Loader/Loading"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import ImgFontLogo from "../../assets/school-953123_1280.jpg"
import { getAllClasses } from "../../api/Classes"
import Validation from "../../Components/ui/Error/Validation"
import { SiDatefns } from "react-icons/si"
import FieldImage from "../../Components/ui/Fields/FieldImage"
import { IPLocal } from "../../api/IP"

export default function EditStudent() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);
    const [fileURLs, setFileURLs] = useState();
    const [file, setFile] = useState(); 

     const  [paramsPatient ] = useState( {
        limit : 50,
        page : 1,
        sortBy : "nom",
        order : "desc",
        search : ""
      } )  

    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["classes",token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
        queryFn : () =>  getAllClasses(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
      })
    

    const {data : userOne,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataStudentType>({
        queryKey: ["users",token,id],
        queryFn: () => getOneStudents(token!,id!),
    });
    
    const { register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataStudentEditType>({
        resolver : zodResolver(studentEditSchema)
      });

    useEffect(() => {
    if (userOne) {
        setValue("dateNaissance", userOne.dateNaissance);
        setValue("sex", userOne.sex);
        setValue("address", userOne.address );
        setValue("phone",  (userOne.phone).toString() );
        setValue("nom", userOne.nom);
        setValue("prenom", userOne.prenom);
        setValue("email", userOne.email);
        setValue("status", userOne.status);
        setValue("idClasse", `${userOne.idClasse}` );
        if (userOne?.img) {
            setFileURLs(`${IPLocal}${userOne.img}`);
        }   
    }
    }, [userOne, setValue]);
    console.log(userOne);
    

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormData) => UpdateStudents(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Etudiant  a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['students'] });
            navigate("/admin/students");
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

    const onSubmit = async (formData: FormDataStudentEditType) => {
        const newFormData = new FormData(); 
          
        setLoad(true)        

        if (file ) {
            newFormData.append("img", file);
        }
        const Niveaux = data?.data.find( (i : any) => i.id == formData.idClasse )
  
        // newFormData.append("role","eleve");
        newFormData.append("idNiveau",Niveaux.idNiveau);



        newFormData.append("idClasse",formData.idClasse);
        newFormData.append("sex",formData.sex);
        newFormData.append("address",formData.address);
        newFormData.append("dateNaissance",formData.dateNaissance);
        newFormData.append("phone", (formData.phone).toString() );
        newFormData.append("status",formData.status);
        newFormData.append("email",formData.email);
        newFormData.append("nom",formData.nom);
        newFormData.append("prenom",formData.prenom);

        setErrorServer("");
        mutation.mutate(newFormData);
    }

    if (userOneIsLoading || isLoading) return <Loading />
    if ( userOneIsError || isError) return <div>Error</div>
   
  return (
    <div className="bg-[var(--font)] h-full">
        <Header />
        <div className="mt-8 w-full flex justify-center px-8 lg:pl-60 items-center">
            <div className="w-full h-[700px] flex justify-center items-center" >
                <form className="h-full w-[700px] flex justify-center items-center bg-white relative rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full rounded-2xl mt-8 px-8">
                    <TitleForm title="Modifier Eleve" />
                    {errorServer  && <Validation errorServer={errorServer} /> }
                    <div className="gap-4 lg:flex justify-between 
                    items-end">
                            <div className="w-full">
                                <FieldImage 
                                fileURLs={fileURLs!} 
                                setFileURLs={setFileURLs} 
                                setFile={setFile}
                                /> 
                            </div>
                            <div>
                                <SelectCustomDataFields  
                                register={register("idClasse")}                            
                                data={data?.data}
                                error={errors.idClasse?.message}
                                label="Classe"
                                />
                                <div className="gap-4 lg:flex justify-between items-end">
                                    <Fields 
                                    label="nom" 
                                    register={register("nom")}
                                    error={errors.nom?.message}/>
                                    <Fields 
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
                            label="email" 
                            register={register("email")}
                            error={errors.email?.message}/>
                        </div>
                                   
                        <div className="mt-4 lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Modification" type="submit" load={load} />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className="w-1/2 h-full  object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>
  )
}