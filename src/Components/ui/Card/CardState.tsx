
type Props = {
    title: string; 
    value: string; 
    icon: React.ReactNode; 
    bg: string
}

export default function CardState({ title, value, icon, bg }: Props) {
    const bgColor = {
        blue: "bg-blue-100 text-blue-500",
        green: "bg-green-100 text-green-500",
        yellow: "bg-yellow-100 text-yellow-500",
        red: "bg-red-100 text-red-500",
      }[bg];

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold mt-2">{value}</p>
            </div>
            <div className={`p-3 rounded-full ${bgColor?.split(" ")[0]}`}>
                <span className={`${bgColor?.split(" ")[1]} text-xl`}>{icon}</span>
            </div>
            </div>
        </div>
  )
}