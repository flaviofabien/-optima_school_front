 import { useState, type ReactNode, useEffect } from "react"
import type { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { BsCopy, BsEyeFill } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { PiSquareLight } from "react-icons/pi";
import { generateSecurePassword } from "../../../Utils/GeneratePassword";

type Props = {
  icons ?: ReactNode;
  label: string;
  register: UseFormRegisterReturn;
  setValue?: UseFormSetValue<any>; 
  error?: any;
  show?: boolean;
  type?: string;
  maxDate?: string;
  text?: string;
  generatePassword?: boolean;
  name?: string;
}

export default function Fields({icons,label,error,register,show,type,maxDate,text,generatePassword,name,setValue}: Props) {
  let [TypeRealy,setChange] = useState(type);
  const [generate,setGenerate] = useState("")
  const [copied, setCopied] = useState(false); 
   useEffect(() => {
    if (generatePassword) {
      const pwd = generateSecurePassword(8); 
      setGenerate(pwd);
      if (setValue && name) {
        setValue(name, pwd);
      }
    }
  }, []);

  const GenerateFn = () => {
    const pwd = generateSecurePassword(20);
    const pwdForte = "$" + pwd + "z" + "0" + "A"
    setGenerate(pwdForte);
    if (setValue && name) {
      setValue(name, pwdForte);
    }
  };

  const handleCopy = async () => {
    if (!generate) return;
    try {
      await navigator.clipboard.writeText(generate);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); 
    } catch (err) {
      console.error("Erreur lors de la copie :", err);
    }
  };
  
  return (
    <div className="relative">
      <div className="group mt-4">
          <label htmlFor={label} className="block font-light "> {label} </label>
          <span className="py-2 absolute text-[var(--color-primary-transparent)] group-focus-within:text-[var(--color-primary)] flex ">
            {/* {icons}  */}
            <span className="absolute text-sm">{text}</span>  
          </span>
          
          <input
          id={label}
            disabled={generatePassword}
            max={maxDate} 
            type={`${TypeRealy}`} 
            // placeholder={label} 
            {...register}  
          className= {`text-sm text-gray-500 outline-0 w-full border-b-4 py-2 ${text ? ' pl-10' : ''}    border-[var(--color-primary-transparent)] focus:border-[var(--color-primary)]`} />
             
      </div>
      {  (show || generatePassword) &&
      <div className='absolute flex -top-0 gap-2 right-0 p-4 mt-4 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]'>
        {
          generatePassword &&  <span className="hover:scale-110 cursor-pointer" onClick={handleCopy}  title="Copie"> <BsCopy /></span>
        }
        {
        copied && (
            <span className="absolute top-full right-0 mt-1 text-xs text-green-500">
              Copié !
            </span>
          )}
      { 
        show && <div>
          { TypeRealy === "password" ? <FaEyeSlash className="cursor-pointer " onClick={() => setChange("text")  } /> : <BsEyeFill className="cursor-pointer " onClick={() => setChange("password")  } /> }
        </div>
      }  
                
      </div>

      }
      {
        generatePassword &&  <button  type="button" onClick={GenerateFn} className=" w-full text-white py-2 text-sm bg-[var(--color-primary)]"> Generer mot de passe  </button>   
      }
      { error && <p className=' max-w-64 text-xs text-red-500'>{error} </p>  }
    </div>
  )
}