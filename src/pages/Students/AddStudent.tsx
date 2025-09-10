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
import { getAllClasses } from "../../api/Classes"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import { setAlert } from "../../store/Users/Users"
import type { FormDataClasseType } from "../../Zod-Validation/Classe"
import Loading from "../../Components/ui/Loader/Loading"
import { BiImage, BiMap } from "react-icons/bi"
import { SiMatrix } from "react-icons/si"
import { MdNumbers } from "react-icons/md"
import { BsLock, BsPerson, BsPersonX, BsPhone } from "react-icons/bs"
import { PiBirdThin } from "react-icons/pi"
import { GrStatusGood } from "react-icons/gr"
import { CgMail } from "react-icons/cg"
import Validation from "../../Components/ui/Error/Validation"

export default function AddStudent() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const { register, formState: { errors }, handleSubmit } = useForm<FormDataStudentType>({
        resolver : zodResolver(studentSchema)
    });

    const {data,isLoading,isError} = useQuery<FormDataClasseType[]>({
        queryKey: ["classes",token],
        queryFn: () => getAllClasses(token!),
    })
    

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormData) => CreateStudents(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Etudiant a ete Modifier avec succes`}))
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

    const onSubmit = async (formData: FormDataStudentType) => {
        const newFormData = new FormData();
        setLoad(true)        

        const files = formData.img as FileList;
        if (files && files.length > 0) {
            newFormData.append("img", files[0]);
        }
  
        newFormData.append("role","eleve");
        newFormData.append("idClasse",formData.idClasse);
        newFormData.append("matricule",formData.matricule);
        newFormData.append("sex",formData.sex);
        newFormData.append("address",formData.address);
        newFormData.append("dateNaissance",formData.dateNaissance);
        newFormData.append("phone", (formData.phone).toString() );
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
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Ajouter Eleve" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                    {errorServer  && <Validation errorServer={errorServer} /> }
                            <Fields 
                            icons={<BiImage size={24} />} 
                            label="img" 
                            register={register("img")}
                            type="file"
                            error={errors.img?.message}/>
                            <Fields 
                            icons={<SiMatrix size={24} />} 
                            label="matricule" 
                            register={register("matricule")}
                            error={errors.matricule?.message}/>
                            <SelectCustomDataFields  
                            icons={<MdNumbers size={24}/>} 
                            register={register("idClasse")}                            
                            data={data}
                            error={errors.idClasse?.message}
                            label="Classe"
                            />
                        <div className="lg:flex justify-between items-end">
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
                        <div className="lg:flex justify-between items-end">
                            <Fields 
                            icons={<PiBirdThin size={24} />} 
                            label="dateNaissance" 
                            register={register("dateNaissance")}
                            type="date"
                            error={errors.dateNaissance?.message}/>
                        </div>
                        <div className="lg:flex justify-between items-end">
                            <Fields 
                            icons={<BiMap size={24} />} 
                            label="address" 
                            register={register("address")}
                            error={errors.address?.message}/>
                            <Fields 
                            icons={<BsPhone size={24} />} 
                            label="phone" 
                            type="number"

                            register={register("phone",{
                                valueAsNumber : true
                            })}
                            error={errors.phone?.message}/> 
                        </div>
                        <div className="lg:flex justify-between items-end">
                            <SelectFields 
                            icons={<GrStatusGood size={24} />} 
                            label="status" 
                            data={["Passant","Redoublont","Vire"]} 
                            register={register("status")}
                            error={errors.status?.message}/> 

                            <Fields 
                            icons={<CgMail size={24} />} 
                            label="email" 
                            register={register("email")}
                            error={errors.email?.message}/>
                        </div>
                            <SelectFields
                            data={["Fille","Garçon"]} 
                            icons={<BsPersonX size={24} />} 
                            label="sex" 
                            register={register("sex")}
                            error={errors.sex?.message}/> 
                       
                            <Fields 
                            icons={<BsLock size={24} />} 
                            show={true}
                            type="password"
                            label="password" 
                            register={register("password")}
                            error={errors.password?.message}/> 
                        
                        
                        <div className="lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Ajouter" type="submit" load={load} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}