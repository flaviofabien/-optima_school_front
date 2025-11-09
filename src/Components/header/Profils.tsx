import { zodResolver } from "@hookform/resolvers/zod";
import Fields from "../ui/Fields/Fields";
import TextHeaderTable from "../ui/Text/TextinTable";
import { userEditSchema } from "../../Zod-Validation/Users";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ErrorServerForm } from "../../typescript/ErrorServer";
import { setAlert } from "../../store/Users/Users";
import { UpdateUsers, getOneUsers } from "../../api/Users";
import { useForm } from "react-hook-form";
import FieldImage from "../ui/Fields/FieldImage";
import { IPLocal } from "../../api/IP";
import Button from "../ui/Button/Button";
import Loading from "../ui/Loader/Loading";
import Validation from "../ui/Error/Validation";

export default function Profils() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const users = useSelector((state: RootState) => state.dataStorage.user);

    const [fileURLs, setFileURLs] = useState("");
    const [file, setFile] = useState(); 
    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const { setValue,register, formState: { errors }, handleSubmit } = useForm<any>({
        resolver : zodResolver(userEditSchema)
    });

       const {data,isLoading,isError} = useQuery<any>({
            queryKey: ["users",token,users.id],
            queryFn: () => getOneUsers(token!,users.id!),
        });


    const mutation = useMutation(
        {
        mutationFn: (newUser : any) => UpdateUsers(token,newUser,users?.id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Utilisateur a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['users'] });
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

    useEffect(() => {
        if (data) {
            setValue("nom", data?.nom);
            setValue("prenom", data?.prenom);
            setValue("email", data?.email);
            setFile(data?.img);

            if (data?.img) {
                setFileURLs(`${IPLocal}${data.img}`);
            }
        }
    }, [data, setValue]);
    

    const onSubmit = async (form: any) => {
        const formData = new FormData();

        setLoad(true)
        setErrorServer("");
        formData.append("nom",form.nom)
        formData.append("prenom",form.prenom)
        formData.append("email",form.email)
        if (file) formData.append("img", file);
        mutation.mutate( formData );
    }

    if (isLoading) return <Loading />
    if (isError) return <div>Error</div>
   
  return (
    <div className="">
        <div className="mt-4 flex justify-between items-center">
            <div className="w-full ">
                <TextHeaderTable text="Profils" />
                <form onSubmit={handleSubmit(onSubmit)} className="bg-[var(--white)]  p-8 mt-4">
                    {errorServer  && <Validation errorServer={errorServer} /> }                        
                    <div className="">
                        <div>
                            <FieldImage 
                            fileURLs={fileURLs!} 
                            setFileURLs={setFileURLs} 
                            setFile={setFile}/>
                        </div>
                        <div>
                            <Fields label="Nom" register={register("nom")} error={errors.nom?.message}  />
                            <Fields label="Prenom" register={register("prenom")} error={errors.nom?.message}  />
                            <Fields label="Email" register={register("email")} error={errors.nom?.message}  />
                        </div>
                    </div>
                    <div className="mt-8">
                        <Button text="Enregistrer" type="submit" load={load} />
                    </div>
                </form>
            </div>
        </div>
    </div>  
    )
}