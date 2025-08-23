import { useForm } from "react-hook-form";
import Button from "../../Components/ui/Button/Button";
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm";
import ImgFont from "../../assets/classroom.jpg"
import { HiOutlineMail } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {UpdatePasswordUser } from "../../api/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FormDataupdatePasswordType, updatePasswordSchema } from "../../Zod-Validation/Auth";
import type { ErrorServerForm } from "../../typescript/ErrorServer";
import { BiLock } from "react-icons/bi";


export default function UpdatePassword() {
  const { register, formState: { errors }, handleSubmit } = useForm<FormDataupdatePasswordType>({
    resolver : zodResolver(updatePasswordSchema)
  });
  const navigate = useNavigate();
  const { id } = useParams();  

  const [errorServer, setErrorServer] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
      mutationFn: (newUser : FormDataupdatePasswordType) => UpdatePasswordUser(newUser),
      onSuccess: () => {
        setErrorServer("");
        queryClient.invalidateQueries({ queryKey: ['users'] });
        navigate("/");
      },
      onError: (error : ErrorServerForm ) => {
        if (error.response && error.response.data) {
          setErrorServer(error.response.data.message);
        } else {
          setErrorServer("An unexpected error occurred");
        }
      }
  });

  const onSubmit = async (formData: FormDataupdatePasswordType) => {
    setErrorServer("");
    const newFormData = {
        ...formData ,
        token : id,
    }
    mutation.mutate(newFormData);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center" >
        <img src={ImgFont} className="-z-10 absolute bottom-0  w-full h-screen object-cover" alt="" />
        <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
          <TitleForm title="Modifier mot de passe " />
          <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
          {errorServer  && <p className="bg-red-400 max-w-64 text-sm text-white text-center p-2 my-2"> {errorServer} </p> }
            <Fields 
              icons={<BiLock size={24} />} 
              label="Nouveau mot de passe" 
              register={register("newPassword")}
              show={true}
              type="password"
              error={errors.newPassword?.message}/>
            <Fields 
              icons={<BiLock size={24} />} 
              label="Confirmation mot de passe" 
              register={register("confimationPassword")}
              show={true}
              type="password"
              error={errors.confimationPassword?.message}/>
              <div className="lg:flex gap-8 justify-between items-start mb-8">
                <Button text="Envoyer" type="submit" />
              </div>
          </div>
        </form>
    </div>
  )
}