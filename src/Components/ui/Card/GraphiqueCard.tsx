import { Chart as ChartJs,CategoryScale,LinearScale,PointElement,LineElement, Title,Tooltip,Legend,ArcElement} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
ChartJs.register( ArcElement , CategoryScale, LinearScale, PointElement, LineElement , Title, Tooltip, Legend);

type Props = {}

export default function GraphiqueCard({}: Props) {
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
    
      const chartOptions : any = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      };
    
      const doughnutOptions : any = {
        responsive: true,
        cutout: "70%",
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      };
    

  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mt-10 mb-6">
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
    </div>
  )
}