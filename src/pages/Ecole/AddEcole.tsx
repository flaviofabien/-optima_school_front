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
import { EcoleSchema, type FormDataEcoleType } from "../../Zod-Validation/Ecole"
import { CreateEcoles } from "../../api/Ecole"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import { BsHouse, BsPerson } from "react-icons/bs"
import FieldImage from "../../Components/ui/Fields/FieldImage"
import ImgFontLogo from "../../assets/school-953123_1280.jpg"
import FieldCheckBoxCustom from "../../Components/ui/Fields/FieldsCheckBoxCustom"
import { getAllNiveaux } from "../../api/Niveau"
import Loading from "../../Components/ui/Loader/Loading"
import ButtonLink from "../../Components/ui/Button/ButtonLink"

type Props = {}

export default function AddEcole({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const user = useSelector((state: RootState) => state.dataStorage.user);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);
    const [fileURLs, setFileURLs] = useState();
    const [file, setFile] = useState(); 
    const { register, formState: { errors }, handleSubmit } = useForm<FormDataEcoleType>({
        resolver : zodResolver(EcoleSchema)
      });
      const  [paramsPatient ] = useState( {
        limit : 50,
        page : 1,
        sortBy : "nom",
        order : "desc",
        search : ""
      } )  

      const {data,isLoading,isError} = useQuery<any>({
        queryKey : ["niveaux",token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
        queryFn : () =>  getAllNiveaux(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
    })
    

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormData) => CreateEcoles(token,newUser),
        onSuccess: () => {
            setErrorServer("");            
            dispatch(setAlert({status : true,message : `Ecole a ete ajouter avec succes`}))
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

    const onSubmit = async (formData: FormDataEcoleType) => {
        setLoad(true)
        const newFormData = new FormData();
        
        
        newFormData.append("nom",formData.nom)
        newFormData.append("adresse",formData.adresse)
        newFormData.append("idNiveaux", JSON.stringify(formData.idNiveaux) )
        newFormData.append("idUser",JSON.stringify(user.id) )
        if (file) {
            newFormData.append("img", file);
        }          
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
                <form className=" h-full w-[500px] bg-white relative rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full rounded-2xl pt-20 px-8">
                    <TitleForm title="Ajouter Ecole" />
                    {errorServer  && <Validation errorServer={errorServer} /> }
                        
         <div className="flex w-full justify-center">
                            <FieldImage 
                            fileURLs={fileURLs!} 
                            setFileURLs={setFileURLs} 
                            setFile={setFile}
                            /> 
                        </div>               <div className="flex flex-row justify-between">
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
                            <Button text="Ajouter" type="submit" load={load}  />
                            <ButtonLink text="Retour" link="/admin/ecoles" style={1}  />
                        </div>


                    </div>
                </form>
                <img src={ImgFontLogo} className="w-[1000px] h-full  object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>
  )
}