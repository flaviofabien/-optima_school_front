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
import { EcoleEditSchema, type FormDataEcoleEditType } from "../../Zod-Validation/Ecole"
import { UpdateEcoles, getOneEcoles } from "../../api/Ecole"
import { setAlert } from "../../store/Users/Users"
import Loading from "../../Components/ui/Loader/Loading"
import Validation from "../../Components/ui/Error/Validation"
import { BsHouse, BsPerson } from "react-icons/bs"
import FieldImage from "../../Components/ui/Fields/FieldImage"
import ImgFontLogo from "../../assets/school-953123_1280.jpg"
import { IPLocal } from "../../api/IP"
import ButtonLink from "../../Components/ui/Button/ButtonLink"
import FieldCheckBoxCustom from "../../Components/ui/Fields/FieldsCheckBoxCustom"
import { getAllNiveaux } from "../../api/Niveau"

export default function EditEcole() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);
    const [fileURLs, setFileURLs] = useState("");
    const [file, setFile] = useState(); 

    const {data : userOne,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<any>({
        queryKey: ["users",token,id],
        queryFn: () => getOneEcoles(token!,id!),
    });

    const  [paramsPatient ] = useState( {
        limit : 50,
        page : 1,
        sortBy : "nom",
        order : "desc",
        search : ""
    })  

    const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["niveaux",token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
        queryFn : () =>  getAllNiveaux(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
    })
    
    const { register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataEcoleEditType>({
        resolver : zodResolver(EcoleEditSchema)
    });

    useEffect(() => {
        if (userOne) {
            setValue("nom", userOne.nom);
            setValue("adresse", userOne.adresse);
            setValue("idNiveaux" , userOne?.niveaux)   
            const niveauxIds = userOne.niveaux?.map((n: any) => n.id.toString());
            setValue("idNiveaux", niveauxIds);

            if (userOne?.img) {
                setFileURLs(`${IPLocal}${userOne.img}`);
            }   
        }
    }, [userOne, setValue]);

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormData) => UpdateEcoles(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Utilisateur a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['ecoles'] });
            navigate("/admin/ecoles");
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

    const onSubmit = async (formData: FormDataEcoleEditType) => {
        setLoad(true)
        const newFormData = new FormData();
        

        newFormData.append("nom",formData.nom)
        newFormData.append("adresse",formData.adresse)
        newFormData.append("idNiveaux",JSON.stringify(formData.idNiveaux))
        if (file) {
            newFormData.append("img", file);
        }        
        setErrorServer("");
        mutation.mutate(newFormData);
    }

    if ( userOneIsLoading ||  isLoading)  return <Loading />
    if ( userOneIsError || isError) return <div>Error</div>
   
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-4 w-full flex justify-center px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className=" h-full w-[500px] bg-white relative rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full   rounded-2xl pt-20 px-8">
                    <TitleForm title="Modification d'ecole" />
                    {errorServer  && <Validation errorServer={errorServer} /> }
                        <div className="flex w-full justify-center">
                            <FieldImage 
                            fileURLs={fileURLs!} 
                            setFileURLs={setFileURLs} 
                            setFile={setFile}
                            /> 
                        </div>
                         <div className="flex flex-row justify-between">
                            <Fields 
                                icons={<BsPerson size={24} />} 
                                label="nom" 
                                register={register("nom")}
                                error={errors.nom?.message}/>
                            <Fields 
                                icons={<BsHouse size={24} />} 
                                label="adresse" 
                                register={register("adresse")}
                                error={errors.adresse?.message}/> 

                        </div>
                        <FieldCheckBoxCustom 
                        data={data?.data} 
                        label="Niveaux" 
                        register={register("idNiveaux")}
                        error={errors.idNiveaux?.message}/> 
                            
                        <div className="lg:flex gap-8 mt-8 justify-between items-start mb-8">
                            <Button text="Modification" type="submit" load={load}  />
                            <ButtonLink text="Retour" link="/admin/ecoles" style={1}  />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className="w-[1000px] h-[685px]  object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>
  )
}