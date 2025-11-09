import { useForm } from "react-hook-form";
import Button from "../../Components/ui/Button/Button";
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm";
import ImgFont from "../../assets/book-3964050_1920.jpg"
import ImgLogo from "../../assets/logo.png"
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
        navigate("/admin/dashboard");
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
    <div className="w-full h-screen flex justify-center items-center bg-[var(--font)] p-2 md:p-20 lg:p-0" >
      <div className="flex w-[1500px] h-full lg:h-[800px] bg-[var(--white)] rounded-2xl lg:rounded-s-3xl items-center rounded-4xl relative ">
        <form className=" p-2 md:p-8  lg:p-16 justify-center flex w-full items-center" onSubmit={handleSubmit(onSubmit)} >
          <div className="w-full mt-8">
            <img src={ImgLogo} className="relative lg:absolute lg:left-16 lg:top-16 left-0 top-0  w-40 mb-12 lg:mb-8 object-cover rounded-r-4xl" alt="" />
            <TitleForm title="Bonjour bienvenu dans OPTIMA-SCHOOL " />
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
                <div className="w-full lg:w-auto lg:flex mt-8 gap-8 justify-between items-start mb-8">
                  <Button text="Se Connecté" type="submit" load={load} />
                  <ButtonLink text="Mot de passe Oublié ?" style={3} link="/reset-password"/>
                </div>
          </div>
        </form>
        <img src={ImgFont} className=" w-full h-full object-cover rounded-r-4xl hidden  min-[1000px]:block rounded-e-3xl" alt="" />

      </div>
    </div>
  )
}