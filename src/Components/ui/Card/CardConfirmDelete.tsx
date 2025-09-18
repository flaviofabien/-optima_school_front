import { useMutation, useQueryClient } from "@tanstack/react-query"
import Button from "../Button/Button"
import Description from "../Text/Description"
import Title from "../Text/Title"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../../../store/store"
import { setAlert } from "../../../store/Users/Users"

type Props = {
    title : string
    show : {
        show: boolean;
        id: number;
    }
    setShow :  React.Dispatch<React.SetStateAction<{
        show: boolean;
        id: number;
    }>>
    functionMutation: (id: number, token: string) => Promise<any>; 
    navigate : string
}

export default function CardConfirmDelete({navigate,show,setShow,title,functionMutation}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const queryClient = useQueryClient();
    const navigation = useNavigate();
    
    const dispatch = useDispatch(); 
    const mutation = useMutation(
        {
        mutationFn: (id : number) => functionMutation(id, token!),
        onSuccess: () => {
            dispatch(setAlert({status : true,message : `${title} a ete supprimer avec succes`}))
            queryClient.invalidateQueries();
            navigation(navigate); 
        },
    });

    const HandleDelete = (id : number) => {
        mutation.mutate(id)
        setShow({id : NaN, show : false}) 
    }

    return (
        <div className='h-screen w-full flex justify-center items-center fixed backdrop-blur-xs  top-0 left-0'>
            <div className="w-[400px] border-2 border-[var(--color-primary)] rounded-b-4xl bg-[var(--white)] ">
                <Title title={title}  />
                <br />
                <Description align="center" text={`Vous voulez vraiment supprimer cette ${title.toLocaleLowerCase()}  `} />
                <div className="px-4 pb-8 flex justify-between w-full items-center">
                    <Button onClick={ () =>  HandleDelete(show.id) } type="button" text="Oui" style={1} />
                    <Button onClick={ () => setShow({
                        id : NaN, show : false
                    }) } type="button" text="Non"  />
                </div>
            </div>
        </div>
    )
}