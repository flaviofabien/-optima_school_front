
type Props = {}

export default function CardPayement({}: Props) {
  return (
    <div>
           {/** paiement */}
           <div className="px-4 md:px-8 mt-10">
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