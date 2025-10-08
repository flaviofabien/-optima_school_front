import { useForm } from "react-hook-form";
import Button from "../../Components/ui/Button/Button";
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm";
import ImgFont from "../../assets/student-849825_1280.jpg"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {UpdatePasswordUser } from "../../api/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FormDataupdatePasswordType, updatePasswordSchema } from "../../Zod-Validation/Auth";
import type { ErrorServerForm } from "../../typescript/ErrorServer";
import { BiLock } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/Users/Users";
import Validation from "../../Components/ui/Error/Validation";
import ImgLogo from "../../assets/logo.png"

export default function UpdatePassword() {
  const { register, formState: { errors }, handleSubmit } = useForm<FormDataupdatePasswordType>({
    resolver : zodResolver(updatePasswordSchema)
  });
  const navigate = useNavigate();
  const { id } = useParams();  
  const dispatch = useDispatch();
  const [load,setLoad] = useState(false);

  const [errorServer, setErrorServer] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
      mutationFn: (newUser : FormDataupdatePasswordType) => UpdatePasswordUser(newUser),
      onSuccess: () => {
        setErrorServer("");
        dispatch(setAlert({status : true,message : "Mot de passe a ete modifier avec succes"}))
        queryClient.invalidateQueries({ queryKey: ['users'] });
        navigate("/login");
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

  const onSubmit = async (formData: FormDataupdatePasswordType) => {
    setLoad(true)
    setErrorServer("");
    const newFormData = {...formData ,token : id}
    mutation.mutate(newFormData);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[var(--font)]" >
      <div className="flex w-[1500px] h-[800px] bg-[var(--white)] items-center rounded-4xl relative">
        <form className=" bg-white  rounded-2xl p-16 min-w-[500px] " onSubmit={handleSubmit(onSubmit)} >
          <img src={ImgLogo} className="absolute top-8  w-40 mb-8 object-cover rounded-r-4xl" alt="" />
          <TitleForm title="Changer votre mot de passe" />
          <div className="w-full mt-8">
          {errorServer  && <Validation errorServer={errorServer} /> }
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
                  <Button text="Envoyer" type="submit" load={load} />
                </div>
          </div>
        </form>
        <img src={ImgFont} className=" w-full h-full object-cover rounded-r-4xl" alt="" />
      </div>
    </div>

  )
}