import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { socket } from "../../main";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/Users";
import Loading from "../../Components/ui/Loader/Loading";
import { IPLocal } from "../../api/IP";
import { BiSend } from "react-icons/bi";
import { getAllMessage } from "../../api/message";


export default function Message() {
  const [message,setMessage] = useState("");
  const token = useSelector((state: RootState) => state.dataStorage.token);
  const user = useSelector((state: RootState) => state.dataStorage.user);
  const [messages, setMessages] = useState<any>([]);
  const [userSelected,setuserSelected] = useState<any>({status : false , data : {}})

  const {data,isError,isLoading} = useQuery<any>({
    queryKey : ["users",token],
    queryFn : ()  =>  getAllUsers(token!)
  })

  const {data : DataMessage,isError : isErrorMessage,isLoading :isLoadingMessage} = useQuery({
    queryKey : ["message",token,user.id,userSelected.data.id],
    queryFn : ()  =>  getAllMessage(token!,user.id!,userSelected.data.id!),
    enabled: userSelected.status && userSelected.data.id !== 0,
  })

  useEffect(() => {
    if (DataMessage) {
        setMessages(DataMessage);
    }
    socket.emit("register", { userId: user.id });
    const handleMessage = (data : any) => {
      if (
        (data.fromUserId === user.id && data.toUserId === userSelected.data.id) ||
        (data.toUserId === user.id && data.fromUserId === userSelected.data.id)
      ) {
        setMessages((prev : any) => [...prev, data]);
      }
    };
    
    socket.on("private_message", handleMessage);

    return () => {
      socket.off("private_message", handleMessage);
    };
    }, [user, userSelected,DataMessage]);


   const sendMessage = (id: number) => {
      if (!message.trim()) return;

      const newMsg = {
        toUserId: id,
        fromUserId: user.id,
        message
      };
      
      socket.emit("send_message", newMsg);
      setMessages((prev : any) => [...prev, newMsg]);
      setMessage("");
    };
    
    if(isLoading 
      || isLoadingMessage
    ) return <Loading />
    if(isError 
      || isErrorMessage
    ) return <div>error</div>

  return (
    <div className="">
        <div className=" flex justify-between  items-center">
            <div className="w-full ">
                <TextHeaderTable text="Messages" />
             
                <div className="w-full flex h-screen border-2 gap-4 mt-8">
                    <div className="w-80 h-full bg-[var(--white)] ">
                        {
                          data.filter( (o : any) =>  
                            {
                              if (  o.role === "eleve" && o.id !== user.id) {
                                return o.role === "eleve" && o.id !== user.id;
                              }
                              
                            }
                            ).map((i : any) =>                        
                              <div onClick={() => setuserSelected({ status: true, data : i })} className="w-80 bg-white border-r overflow-y-auto">
                                <div className="p-4 flex items-center gap-4 hover:bg-gray-100 cursor-pointer">
                                  <img
                                     src={IPLocal + i.img} alt="" className="w-8 h-8 rounded-2xl"
                                  />
                                  <div className="h-full flex flex-col ">
                                    <h4> {i.nom} {i.prenom}  </h4>
                                  </div>
                                </div>
                              </div>
                          )
                        }
                  </div>
                  {
                      userSelected.status && 
                  <div className="w-full">
                    
                    <div className="h-[600px]">
                       <div className="px-6 py-4 border-b bg-white font-semibold flex gap-4 items-center">
                          <img src={IPLocal + userSelected.data.img} className="w-8 h-8 rounded-2xl" alt="" /> {userSelected.data.nom} {userSelected.data.prenom}
                        </div>
                        {messages.length === 0 && <p>Aucun message pour le moment.</p>}


                      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4  ">
                        {messages.map((msg : any) => (
                        <div className={`flex  ${msg.fromUserId !== user.id ? "justify-start" : "justify-end " }`} >
                          <div className= {`px-4 py-2 rounded-lg shadow max-w-md   ${msg.fromUserId !== user.id ? "bg-white" : "bg-blue-500 text-white" }`}>
                            {msg.message}                          
                          </div>
                        </div>
                          ))}
                      </div>
                    </div>
                     <div className="px-6 py-4 border-t bg-white flex items-center gap-4">
                      <textarea
                        className="flex-1 border rounded-lg px-4 py-2 resize-none"
                        placeholder="Écrire un message..."
                        value={message} 
                        onChange={(e) =>  setMessage(e.target.value)} 
                        rows={1}
                      />
                      <button type="button" className="text-blue-500 hover:text-blue-700" onClick={ () => sendMessage(userSelected.id)}>
                        <BiSend size={28} />
                      </button>
                    </div>

                  </div>
                  }
                </div>
            </div>
        </div> 
    </div>
  )
}