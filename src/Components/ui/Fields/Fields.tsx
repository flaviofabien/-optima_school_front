 import { useState, type ReactNode, useEffect } from "react"
import type { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { BsCopy, BsEyeFill } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { PiSquareLight } from "react-icons/pi";
import { generateSecurePassword } from "../../../Utils/GeneratePassword";

type Props = {
  icons: ReactNode;
  label: string;
  register: UseFormRegisterReturn;
  setValue?: UseFormSetValue<any>; 
  error?: string;
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
    const pwd = generateSecurePassword(8);
    setGenerate(pwd);
    if (setValue && name) {
      setValue(name, pwd);
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
      <div className="group flex mt-4">
          <span className="py-2 absolute text-[var(--color-primary-transparent)] group-focus-within:text-[var(--color-primary)] flex ">{icons} 
            <span className="absolute pl-7 text-sm">{text}</span>  
             {
              generatePassword &&  <span onClick={GenerateFn} className="absolute pl-7 text-sm"> <PiSquareLight size={25} /> </span>   
             }
          </span>
          
          <input
            disabled={generatePassword}
            max={maxDate} 
            type={`${TypeRealy}`} 
            placeholder={label} 
            {...register}  
          className= {`text-sm text-gray-500 outline-0 w-full border-b-4 py-2 ${text ? ' pl-16' : 'pl-8'}  ${generatePassword ? ' pl-16' : 'pl-8'}  not-user-valid:  border-[var(--color-primary-transparent)] focus:border-[var(--color-primary)]`} />
      </div>
      <div className='absolute flex -top-5 gap-2 right-0 p-4 mt-4 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]'>
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
      { error && <p className=' max-w-64 text-xs text-red-500'>{error} </p>  }
    </div>
  )
}