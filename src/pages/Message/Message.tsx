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
  return (
    <div className="bg-gray-100 h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="bg-white shadow px-6 py-4 text-xl font-bold">
        <TextHeaderTable text="Messages" />
      </div>
      <div className="flex flex-1 min-h-0">
  
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4 flex items-center gap-4 hover:bg-gray-100 cursor-pointer">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="">
              <h4 className="font-semibold">Feno Kely</h4>
              <p className="text-sm text-gray-500">En ligne</p>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-col flex-1 bg-gray-50 min-h-0">
          {/* Chat header */}
          <div className="px-6 py-4 border-b bg-white font-semibold">
            Conversation avec Feno kely
          </div>

          {/* Messages */}
          <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
            <div className="flex justify-start">
              <div className="bg-white px-4 py-2 rounded-lg shadow max-w-md">
                Salut, comment ça va ?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow max-w-md">
                Très bien merci, et toi ?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white px-4 py-2 rounded-lg shadow max-w-md">
                Bien au revoir
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t bg-white flex items-center gap-4">
            <textarea
              className="flex-1 border rounded-lg px-4 py-2 resize-none"
              placeholder="Écrire un message..."
              rows={1}
            />
            <button className="text-blue-500 hover:text-blue-700">
              <BiSend size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
