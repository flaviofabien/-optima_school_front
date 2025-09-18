import { BiCheckCircle } from "react-icons/bi"

type Props = {
    title: string
    description : string
}

export default function AlertSuccess({title,description}: Props) {
  return (
    <div className="max-w-sm p-4 bg-white border-2 border-green-500 rounded-lg shadow-lg fade-in-up w-80">
      <div className="flex items-center justify-center bg-green-500 text-white rounded-t-md p-2">
        <BiCheckCircle className="w-5 h-5 mr-2" />
        <h1 className="text-md font-semibold">{title}</h1>
      </div>

      <div className="text-center py-4 px-2">
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  )
}