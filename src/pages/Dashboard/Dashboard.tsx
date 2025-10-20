import Header from "../../Components/header/Header";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { getAllStates } from "../../api/State";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Loading from "../../Components/ui/Loader/Loading";
import AdminDashboard from "./AdminDashboard";
import ElevesDashBoard from "./ElevesDashBoard";
import { FaUser, FaDollarSign, FaEye, FaShoppingCart, FaChartLine } from "react-icons/fa";
// import { PieChart, Pie, Cell } from "recharts";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJs.register( ArcElement , CategoryScale, LinearScale, PointElement, LineElement , Title, Tooltip, Legend);

// données retournées 
interface StateStats {
  nbStudent: number;
  nbTeach: number;
}

// Composant StatCard
function StatCard({ icon, value, label, gradient }: { icon: React.ReactNode; value: number; label: string; gradient: string }) {
  return (
    <div className={`w-full bg-gradient-to-r ${gradient} px-1 py-4 rounded-2xl flex flex-row`}>
      <span className="text-3xl font-bold text-white m-2">{icon}</span>
      <div className="flex flex-col p-2">
        <span className="text-xl font-bold text-white">{value}</span>
        <span className="text-white">{label}</span>
      </div>
    </div>
  );
}

// Composant Card générique
function Card({ title, value, icon, bg }: { title: string; value: string; icon: React.ReactNode; bg: string }) {
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
  );
}

export default function Dashboard() {
const token = useSelector((state: RootState) => state.dataStorage.token);
const user = useSelector((state: RootState) => state.dataStorage.user);

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["state", token],
    queryFn: () => getAllStates(token!),
  });

  
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 5000, 2300, 3400, 4200, 3800, 4500, 5200, 4800],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const orderData = {
    labels: ["Delivered", "Pending", "Cancelled"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };


  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-4 flex justify-between px-8 lg:pl-64 items-center">
            <div className="w-full ">
                <TextHeaderTable text="Les Statistique" />
                {user.role === "admin" &&   <AdminDashboard data={data} />}
                {user.role === "eleve" &&  <ElevesDashBoard  data={data} />}
               
            </div>
            
        </div>
         
        <div className="mt-4 flex justify-between px-8 lg:pl-64 items-center">
          <div className="w-full">
            <TextHeaderTable text="Les Statistiques" />
            <div className="w-full flex justify-between gap-20 mt-4">
              <StatCard icon={<FaUser />} value={data.nbStudent} label="Nombre d'Étudiants" gradient="from-cyan-500 to-blue-500" />
              <StatCard icon={<FaUser />} value={data.nbTeach} label= "Nombre d'Enseignants" gradient="from-orange-500 to-red-500" />
            </div>
          </div>
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 lg:pl-64 mt-6">
          <Card title="Total " value="10,145" icon={<FaDollarSign />} bg="blue" />
          <Card title="vue " value="90,380" icon={<FaEye />} bg="green" />
          <Card title="Stat" value="-" icon={<FaShoppingCart />} bg="yellow" />
          <Card title="Profit" value="Ar 23,214" icon={<FaChartLine />} bg="red" />
        </div>
            {/* Graphiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8 lg:pl-64 mt-10 mb-6">
          <div className="bg-white shadow rounded p-6 w-full">
            <h3 className="text-lg font-semibold mb-4">Year All - Chart</h3>
            <Line data={salesData} options={chartOptions} height={250} />
          </div>

          {/* Diagramme circulaire */}
          <div className="bg-white shadow rounded p-6 w-full">
            <h3 className="text-lg font-semibold mb-4">Order Statistics</h3>
            <div className="flex items-center justify-center">
              <div className="w-48 h-48">
                <Doughnut data={orderData} options={doughnutOptions} />
              </div>
            </div>
          </div>
        </div>


        {/** paiement */}
        <div className="px-4 md:px-8 lg:pl-64 mt-10 mb-10">
    <div className="bg-white shadow rounded-lg p-6 w-full">
      <h2 className="text-xl font-semibold mb-6">Recent</h2>
      <div className="space-y-4"></div>
      <div className="flex-grow items-center border-b pb-2">
        <div>
          <p className="font-medium">Paypal **11</p>
          <p className="text-sm text-gray-500">Online </p>
        </div>
        <div className="text-right">
          <p className="text-green-600 font-semibold">Ar 23,897</p>
          <p className="text-sm text-gray-500">Jun 18, 2025</p>
        </div>
      </div>

      <div className="flex border-b pb-2">
        <div>
          <p className="font-medium"> Wallet</p>
          <p className="text-sm text-gray-500">Online</p>
        </div>
        <div className="text-right">
          <p className="text-green-600 font-semibold">Ar 2345457</p>
          <p className="text-sm text-gray-500">Jun 66, 2025</p>
        </div>
      </div>

      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <p className="font-medium">Visa **4445</p>
          <p className="text-sm text-gray-500">Online</p>
        </div>
        <div className="text-right">
          <p className="text-green-600 font-semibold">Ar 4444</p>
          <p className="text-sm text-gray-500">Jun 18, 2025</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Cash </p>
          <p className="text-sm text-gray-500"> Delivery</p>
        </div>
        <div className="text-right">
          <p className="text-green-600 font-semibold">Ar 45545</p>
          <p className="text-sm text-gray-500">Jun 18, 2025</p>
        </div>
      </div>

    </div>
        </div>
    </div>
  )
}