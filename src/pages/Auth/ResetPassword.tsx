import { useForm } from "react-hook-form";
import Button from "../../Components/ui/Button/Button";
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm";
import ImgFont from "../../assets/merry-christmas-1093758_1920.jpg"
import { HiOutlineMail } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { ResetPasswordUser } from "../../api/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ErrorServerForm } from "../../typescript/ErrorServer";
import { resetPassword, type FormDataResetPasswordType } from "../../Zod-Validation/Auth";
import Validation from "../../Components/ui/Error/Validation";
import ImgLogo from "../../assets/logo.png"


export default function ResetPassword() {
  const { register, formState: { errors }, handleSubmit } = useForm<FormDataResetPasswordType>({
    resolver : zodResolver(resetPassword)
  });
  const navigate = useNavigate();
  const [errorServer, setErrorServer] = useState<string>("");
  const queryClient = useQueryClient();
  const [load,setLoad] = useState(false);

  const mutation = useMutation(
    {
      mutationFn: (newUser : FormDataResetPasswordType) => ResetPasswordUser(newUser),
      onSuccess: () => {
        setErrorServer("");
        queryClient.invalidateQueries({ queryKey: ['users'] });
        navigate("/load-verification");
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

  const onSubmit = async (formData: FormDataResetPasswordType) => {
    setLoad(true)
    setErrorServer("");
    mutation.mutate(formData);
  }


  return (
    <div className="w-full h-screen flex justify-center items-center bg-[var(--font)]" >
      <div className="flex w-[1500px] h-[800px] bg-[var(--white)] items-center rounded-4xl relative">
        <form className="  bg-white  rounded-2xl p-16 " onSubmit={handleSubmit(onSubmit)} >
          <img src={ImgLogo} className="absolute top-8  w-40 mb-8 object-cover rounded-r-4xl" alt="" />
          <TitleForm title="Changer votre mot de passe" />
          <div className="w-full mt-8 min-w-[400px]">
            {errorServer  && <Validation errorServer={errorServer} /> }
            <Fields 
                icons={<HiOutlineMail size={24} />} 
                label="Email" 
                register={register("email")}
                error={errors.email?.message}/>
              <div className="lg:flex gap-8 justify-between items-start mb-8">
                <Button text="Continue" type="submit" load={load}/>
              </div>
          </div>
        </form>
        <img src={ImgFont} className=" w-[1000px] h-full object-cover rounded-r-4xl" alt="" />
      </div>
    </div>

  )
}