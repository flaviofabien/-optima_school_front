import { useCallback } from "react"
import { useDropzone } from "react-dropzone";
import { BiImage } from "react-icons/bi";

type Props = {
    fileURLs : string,
    setFileURLs :any
    setFile :any
    errorFile ?:any
}

export default function FieldImage({fileURLs,setFileURLs,setFile,errorFile}: Props) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file : any = acceptedFiles[0];
        if (file) {
            setFile(file); 
            const newFileURL : any = URL.createObjectURL(file);
            setFileURLs(newFileURL);
        }
    }, [setFile, setFileURLs]);

    const {getRootProps,getInputProps } = useDropzone({ onDrop })

  return (
    <div className="mt-4 rounded-full ">
        <div {...getRootProps()} className={`${fileURLs ? " border-[var(--color-primary)]  " : " border-4 border-[var(--color-primary-transparent)] "} rounded-full text-sm  h-60 w-60 text-center cursor-pointer flex items-center justify-center`}>
            <input {...getInputProps()}  />
            {
            fileURLs ? (
                <div className="">
                    <img src={fileURLs} alt={`Preview ${fileURLs}`} className="h-60 w-60 object-cover rounded-full" />
                </div>
            ):(
                <div className="flex flex-col justify-center items-center">
                <BiImage  className="text-gray-500 inline-block m-1 text-5xl"/>
                <span>Glisser/deposer le photo ici</span>
                <div>
                    <button type="button" className="text-[var(--white)] bg-[var(--color-primary)] hover:btn  rounded-lg px-4 py-2 mt-2">
                        parcourir pc
                    </button>
                </div>
                </div>
                )
            }

        </div>
        { errorFile && <p className='text-center max-w-64 text-xs text-red-500'>{errorFile} </p>  }
    </div>
  )
}