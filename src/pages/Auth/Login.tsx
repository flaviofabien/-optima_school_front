import { useForm } from "react-hook-form";
import Button from "../../Components/ui/Button/Button";
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm";
import ImgFont from "../../assets/classroom.jpg"
import { HiOutlineMail } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginUser } from "../../api/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type FormDataLoginType } from "../../Zod-Validation/Auth";
import type { ErrorServerForm } from "../../typescript/ErrorServer";
import { BiLock } from "react-icons/bi";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { useDispatch } from "react-redux";
import { setAlert, setToken, setUsers } from "../../store/Users/Users";
import Validation from "../../Components/ui/Error/Validation";

export default function Login() {
  const { register, formState: { errors }, handleSubmit } = useForm<FormDataLoginType>({
    resolver : zodResolver(loginSchema)
  });
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [load,setLoad] = useState(false);

  const [errorServer, setErrorServer] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
      mutationFn: (newUser : FormDataLoginType) => LoginUser(newUser),
      onSuccess: (value) => {
        console.log(value.token,value.user);
        setErrorServer("");
        queryClient.invalidateQueries({ queryKey: ['users'] });
        dispatch(setToken(value.token))
        dispatch(setUsers(value.user))
        dispatch(setAlert({status : true,message : "Utilisateur a ete connecter avec succes"}))
        navigate("/admin/users");
        setLoad(false)
      },
      onError: (error : ErrorServerForm ) => {
        console.log(error);
        if (error.response && error.response.data) {
          setErrorServer(error.response.data.message);
        } else {
          setErrorServer("An unexpected error occurred");
        }
        setLoad(false)
      }
  });

  const onSubmit = async (formData: FormDataLoginType) => {
    setLoad(true)
    setErrorServer("");
    mutation.mutate(formData);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center" >
      <img src={ImgFont} className="-z-10 absolute bottom-0  w-full h-screen object-cover" alt="" />
      <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
        <TitleForm title="Login" />
        <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
        {errorServer  && <Validation errorServer={errorServer} /> }
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
              <Button text="Login" type="submit" load={load} />
              <ButtonLink text="Mot de passe Oublie ?" style={3} link="/reset-password"/>
            </div>
        </div>
      </form>
    </div>
  )
}