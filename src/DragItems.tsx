import React from 'react';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Types
type ItemId = number;

interface SortableItemProps {
  id: ItemId;
}


export const SortableItem: React.FC<SortableItemProps> = ({ id }) => {
    const {attributes,listeners,setNodeRef,transform,transition,isDragging} = useSortable({ id });
  
    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: '10px',
      margin: '5px 0',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      border: '1px solid #ccc',
      cursor: 'grab',
      zIndex: isDragging ? 9999 : 'auto', // ✅ Force le clone au-dessus
      position: isDragging ? 'relative' : 'static', // ✅ Nécessaire pour le z-index
  
    };
  
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        Élément {id}
      </div>
    );
  };


//   import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store/store";
// import { socket } from "../main";
// import { useQuery } from "@tanstack/react-query";
// import { getAllUsers } from "../api/Users";
// import { getMessages } from "../api/messages";
// import Loading from "../components/Loading";
// import { BiSend } from "react-icons/bi";

// export default function Message() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<any[]>([]);
//   const [userSelected, setUserSelected] = useState<{ status: boolean; id: number }>({
//     status: false,
//     id: 0,
//   });

//   const token = useSelector((state: RootState) => state.dataStorage.token);
//   const user = useSelector((state: RootState) => state.dataStorage.user);

//   const { data: users, isLoading: loadingUsers } = useQuery({
//     queryKey: ["users", token],
//     queryFn: () => getAllUsers(token),
//   });

//   const { data: oldMessages, isLoading: loadingMessages, refetch } = useQuery({
//     queryKey: ["messages", user.id, userSelected.id],
//     queryFn: () => getMessages(user.id, userSelected.id),
//     enabled: userSelected.status,
//   });

//   // WebSocket - recevoir les nouveaux messages
//   useEffect(() => {
//     socket.emit("register", { userId: user.id });

//     const handleMessage = (data: any) => {
//       if (
//         (data.fromUserId === user.id && data.toUserId === userSelected.id) ||
//         (data.toUserId === user.id && data.fromUserId === userSelected.id)
//       ) {
//         setMessages((prev) => [...prev, data]);
//       }
//     };

//     socket.on("private_message", handleMessage);

//     return () => {
//       socket.off("private_message", handleMessage);
//     };
//   }, [user.id, userSelected.id]);

//   // Charger les anciens messages quand on change d'utilisateur sélectionné
//   useEffect(() => {
//     if (oldMessages) setMessages(oldMessages);
//   }, [oldMessages]);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     const newMsg = {
//       fromUserId: user.id,
//       toUserId: userSelected.id,
//       message,
//     };

//     socket.emit("send_message", newMsg);
//     setMessages((prev) => [...prev, newMsg]);
//     setMessage("");
//   };

//   if (loadingUsers || (userSelected.status && loadingMessages)) return <Loading />;

//   return (
//     <div className="h-screen p-4 bg-gray-100">
//       <div className="flex h-full border rounded overflow-hidden">
//         {/* Liste des utilisateurs */}
//         <div className="w-1/4 border-r bg-white overflow-y-auto">
//           {users
//             .filter((u: any) => u.role === "eleve" && u.id !== user.id)
//             .map((u: any) => (
//               <div
//                 key={u.id}
//                 onClick={() => setUserSelected({ status: true, id: u.id })}
//                 className={`p-4 cursor-pointer hover:bg-gray-200 ${
//                   userSelected.id === u.id ? "bg-gray-200" : ""
//                 }`}
//               >
//                 <h4>
//                   {u.nom} {u.prenom}
//                 </h4>
//               </div>
//             ))}
//         </div>

//         {/* Fenêtre de chat */}
//         <div className="flex-1 flex flex-col justify-between p-4">
//           <div className="overflow-y-auto flex-1 mb-4">
//             <h3 className="font-bold mb-2">Messages :</h3>
//             {messages.length === 0 ? (
//               <p>Aucun message.</p>
//             ) : (
//               <ul className="space-y-2">
//                 {messages.map((msg, idx) => (
//                   <li
//                     key={idx}
//                     className={`p-2 rounded max-w-[70%] ${
//                       msg.fromUserId === user.id
//                         ? "bg-blue-200 ml-auto text-right"
//                         : "bg-gray-300 mr-auto text-left"
//                     }`}
//                   >
//                     {msg.message}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Envoi de message */}
//           {userSelected.status && (
//             <div className="flex gap-2">
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Écris ton message..."
//                 className="flex-1 border rounded p-2"
//               />
//               <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded">
//                 <BiSend size={24} />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
