import Button from "../Button/Button"
import Description from "../Text/Description"
import Title from "../Text/Title"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setToken } from "../../../store/Users/Users"

type Props = {
    setShow :  React.Dispatch<React.SetStateAction<{
        show: boolean;
        id: number;
    }>>

}

export default function CardConfirmDeconnexion({setShow}: Props) {
    const navigation = useNavigate();
    
    const dispatch = useDispatch(); 


    const HandleDelete = () => {
        navigation("/")
        dispatch(setToken(""))
        setShow({id : NaN, show : false}) 
    }

    return (
        <div className='h-screen w-full flex justify-center items-center fixed backdrop-blur-sm z-50 top-0 left-0'>
            <div className="w-[400px] border-2 border-[var(--color-primary)] rounded-b-4xl bg-[var(--white)] ">
                <Title title={"Deconnexion"}  />
                <br />
                <Description align="center" text={` voulez-vous vraiment Deconnecter `} />
                <div className="mt-8 px-4 pb-8 flex justify-between w-full items-center">
                    <Button onClick={ () =>  HandleDelete() } type="button" text="Oui" style={1} />
                    <Button onClick={ () => setShow({
                        id : NaN, show : false
                    }) } type="button" text="Non"  />
                </div>
            </div>
        </div>
    )
}