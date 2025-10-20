import Header from "../../Components/header/Header";
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


export default function Message() {
  const [message,setMessage] = useState("");
  const token = useSelector((state: RootState) => state.dataStorage.token);
  const user = useSelector((state: RootState) => state.dataStorage.user);
  const [messages, setMessages] = useState([]);
  const [userSelected,setuserSelected] = useState({status : false , id : 0})

  const {data,isError,isLoading} = useQuery({
    queryKey : ["users",token],
    queryFn : ()  =>  getAllUsers(token)
  })

   useEffect(() => {
  socket.emit("register", { userId: user.id });

  const handleMessage = (data) => {
    // on ne garde que les messages liés à l’utilisateur sélectionné
    if (
      (data.fromUserId === user.id && data.toUserId === userSelected.id) ||
      (data.toUserId === user.id && data.fromUserId === userSelected.id)
    ) {
      setMessages((prev) => [...prev, data]);
    }
  };

  socket.on("private_message", handleMessage);

  return () => {
    socket.off("private_message", handleMessage);
  };
}, [user, userSelected]);


   const sendMessage = (id: number) => {
  if (!message.trim()) return;

  const newMsg = {
    toUserId: id,
    fromUserId: user.id,
    message
  };

  socket.emit("send_message", newMsg);
  setMessages((prev) => [...prev, newMsg]);
  setMessage("");
};


    if(isLoading) return <Loading />
    if(isError) return <div>error</div>

  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-4 flex justify-between px-8 lg:pl-64 items-center">
            <div className="w-full ">
                <TextHeaderTable text="Messages" />
             
                <div className="w-full flex h-screen border-2 gap-4">
                    <div className="w-80 h-full bg-[var(--white)] ">
                        {
                          data.filter((o : any)  => o.role == "eleve"  ).map((i : any) => 
                              <div onClick={() => setuserSelected({status : true , id : i.id})} className=" p-4 border-2 flex gap-4 hover:bg-gray-200 cursor-pointer">
                                <img src={IPLocal + i.img} alt="" className="w-8 h-8 rounded-2xl" />
                                <h4> {i.nom} {i.prenom}  </h4>
                              </div>
                          )
                        }
                  </div>
                  {
                      userSelected.status && 
                  <div className="w-full">
                    
                    <div className="h-[600px]">
                      <h3 className="font-bold mb-2">Messages reçus :</h3>
                        {messages.length === 0 && <p>Aucun message pour le moment.</p>}

                        <ul>
                          {messages.map((msg, idx) => (
                            <li
                              key={idx}
                              className={`mb-2 p-2 rounded inline-block ${
                                msg.fromUserId === user.id
                                  ? "bg-blue-200 text-right ml-auto"
                                  : "bg-gray-200 text-left mr-auto"
                              }`}
                            >
                              <span>{msg.message}</span>
                            </li>
                          ))}
                        </ul>


                    </div>
                      <div className="w-full flex justify-between gap-20 mt-4 border-2 border-gray-400">
                            <textarea 
                              className="w-full border-2 border-[var(--color-primary)] h-12"
                              placeholder="ecrire quelque chose ..."
                              value={message} 
                              onChange={(e) =>  setMessage(e.target.value)} />
                            <span onClick={ () => sendMessage(userSelected.id)}>
                              <BiSend size={30} />
                            </span>
                        </div>
                  </div>
                  }
                </div>
                
       

            </div>
        </div> 
    </div>
  )
}