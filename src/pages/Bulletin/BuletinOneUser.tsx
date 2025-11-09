import { BsX } from "react-icons/bs";

type Props = {
  title: any;
  student: any;
  categories: any;
  setView: any;
  rang: any; 
  moyenneGenerale: any ; 
  rangParCategorie: any;
};

export default function BulletinOneUser({
  rangParCategorie,
  setView,
  student,
  categories,
  rang,
  moyenneGenerale, 
}: Props) {

  const renderNotesTable = (notes: any[], moyenne: string | number) => (
    <table className="w-full text-left table-auto border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Matière</th>
          <th className="p-2 border">Note</th>
          <th className="p-2 border">Coefficient</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((n: any, idx: number) => (
          <tr key={idx}>
            <td className="p-2 border">{n.matiere}</td>
            <td className="p-2 border">{n.note}</td>
            <td className="p-2 border">{n.coeff}</td>
          </tr>
        ))}
        <tr className="font-bold bg-gray-50">
          <td colSpan={2} className="p-2 border text-right">
            Moyenne
          </td>
          <td className="p-2 border">{moyenne}</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className="fixed flex justify-center items-center w-full h-full top-0 left-0 bg-black bg-opacity-45 z-50">
      <div className="border-2 border-gray-200 bg-white px-10 py-8 relative max-h-[90vh] overflow-auto w-[95%] max-w-[1500px]">
        {/* Bouton de fermeture */}
        <p
          onClick={() => setView(false)}
          className="hover:font-bold hover:scale-110 cursor-pointer top-2 right-2 absolute text-red-500 text-3xl"
        >
          <BsX />
        </p>

        <h3 className="text-center text-2xl font-bold">
          {student?.User.nom} {student?.User.prenom}
        </h3>
        <h4 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
          Rang Général : {rang}
        </h4>

        <div className="flex flex-row gap-8 mt-4">
          {/* Affichage des catégories */}
          {Object.entries(categories).map(([catId, catData]: any) => (
            <div
              key={catId}
              className="mb-6 border p-4 rounded-lg shadow-sm"
            >
              <h4 className="text-xl font-bold text-[var(--color-primary)] mb-2">
                {catData.nom}
              </h4>
              <p className="mb-2 text-gray-600">
                Rang dans la catégorie :{" "}
                <span className="font-semibold">
                  {rangParCategorie?.[catId] || "N/A"}
                </span>
              </p>

              {/* Cas 1: Catégorie avec Sous-Périodes */}
              {Object.keys(catData.sousPeriode || {}).length > 0 ? (
                <div className="flex flex-col">
                  <div className="flex gap-4">
                  {Object.entries(catData.sousPeriode).map(
                    ([sousPerId, sousPerData]: any) => (
                      <div key={sousPerId} className="p-2 border rounded-md">
                        <h5 className="font-semibold mb-2 text-md">
                          {sousPerData.nom} (Moyenne : {sousPerData.moyenne.toFixed(2)})
                        </h5>
                        {renderNotesTable(
                          sousPerData.notes,
                          sousPerData.moyenne.toFixed(2)
                        )}
                      </div>
                    )
                  )}
                  </div>

                  <div className="mt-4 font-bold text-lg text-right">
                    Moyenne Catégorie{" "}
                    <span className="text-[var(--color-primary)]">
                      {catData.moyenne.toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                    {catData.notes.length > 0 ? (
                        <div className="mt-2">
                            {renderNotesTable(
                                catData.notes,
                                catData.moyenne.toFixed(2)
                            )}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Aucune note directe enregistrée pour cette catégorie.</p>
                    )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t-2 text-right font-bold text-xl">
          Moyenne Générale :{" "}
          <span className="text-[var(--color-primary)]">
            {parseFloat(moyenneGenerale as string).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}