import { useForm } from "react-hook-form";
import Button from "../../Components/ui/Button/Button";
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm";
import ImgFont from "../../assets/classroom.jpg"
import { HiOutlineMail } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginUser } from "../../api/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type FormDataLoginType } from "../../Zod-Validation/Auth";
import type { ErrorServerForm } from "../../typescript/ErrorServer";
import { BiLock } from "react-icons/bi";


export default function Login() {
  const { register, formState: { errors }, handleSubmit } = useForm<FormDataLoginType>({
    resolver : zodResolver(loginSchema)
  });
  const navigate = useNavigate();

  const [errorServer, setErrorServer] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
      mutationFn: (newUser : FormDataLoginType) => LoginUser(newUser),
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

  const onSubmit = async (formData: FormDataLoginType) => {
    setErrorServer("");
    mutation.mutate(formData);
  }


  return (
    <div className="w-full h-screen flex justify-center items-center" >
        <img src={ImgFont} className="-z-10 absolute bottom-0  w-full h-screen object-cover" alt="" />
        <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
          <TitleForm title="Login" />
          <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
          {errorServer  && <p className="bg-red-400 max-w-64 text-sm text-white text-center p-2 my-2"> {errorServer} </p> }
            <Fields 
              icons={<HiOutlineMail size={24} />} 
              label="Email" 
              register={register("email")}
              error={errors.email?.message}/>
            <Fields 
              icons={<BiLock size={24} />} 
              label="Password" 
              register={register("password")}
              show={true}
              type="password"
              error={errors.password?.message}/>
              <div className="lg:flex gap-8 justify-between items-start mb-8">
                <Button text="Login" type="submit" />
                <Button text="Mot de passe Oublie ?" type="button" style={3}/>
              </div>

          </div>
        </form>
    </div>
  )
}