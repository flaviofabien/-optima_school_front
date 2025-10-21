import { BsX } from "react-icons/bs";

type Props = {
  title: string;
  student: any;
  categories: any;
  setView: any;
  rangParCategorie : any
};

export default function BulletinOneUser({ rangParCategorie, setView, student, categories , rang }: Props) {
  // ✅ Calcul de la moyenne générale (de trimestre) — une seule fois
const allNotes = Object.values(categories).flatMap((cat: any) => cat.notes);

const totalBarème = allNotes.reduce(
  (acc: number, curr: any) => acc + (curr.coeff * 20),
  0
);

const totalNote = allNotes.reduce(
  (acc: number, curr: any) => acc + curr.note,
  0
);

const moyenneGenerale = totalBarème
  ? ((totalNote / totalBarème) * 20).toFixed(2)
  : "0";

  return (
    <div className="fixed flex justify-center items-center w-full h-full top-0 left-0 bg-black bg-opacity-45">
      <div className="border-2 border-gray-200 bg-white px-10 py-8 relative max-h-[90vh] overflow-auto">
        {/* Bouton de fermeture */}
        <p
          onClick={() => setView(false)}
          className="hover:font-bold hover:scale-110 cursor-pointer top-2 right-2 absolute text-red-500 text-3xl"
        >
          <BsX />
        </p>
       <h3 className="text-center text-2xl"> {student?.User.nom} {student?.User.prenom} </h3>
        <h4 className="text-lg font-semibold text-[var(--color-primary)] mb-2"> Rang {rang} </h4>
        <div className="flex gap-4">
            {/* Affichage des catégories */}
            {Object.entries(categories).map(([catId, catData]: any) => {
             const totalNoteCat = catData.notes.reduce(
                    (acc: number, curr: any) => acc + curr.note,
                    0
                );

                const totalBarèmeCat = catData.notes.reduce(
                    (acc: number, curr: any) => acc + (curr.coeff * 20),
                    0
                );

                const moyenneCategorie = totalBarèmeCat
                    ? ((totalNoteCat / totalBarèmeCat) * 20).toFixed(2)
                    : "0";
            return (
                <div key={catId} className="mb-6">

                <h4 className="text-lg font-semibold text-[var(--color-primary)] mb-2">{catData.nom}  </h4>
                 <p key={catId}>
                    Rang {rangParCategorie?.[catId] || "N/A"}
                </p>
                <table className="w-full text-left table-auto border">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Matière</th>
                        <th className="p-2 border">Note</th>
                        <th className="p-2 border">Coefficient</th>
                    </tr>
                    </thead>
                    <tbody>
                    {catData.notes.map((n: any, idx: number) => (
                        <tr key={idx}>
                        <td className="p-2 border">{n.matiere}</td>
                        <td className="p-2 border">{n.note}</td>
                        <td className="p-2 border">{n.coeff}</td>
                        </tr>
                    ))}
                    <tr className="font-bold bg-gray-50">
                        <td colSpan={2} className="p-2 border text-right">
                        Moyenne de la catégorie
                        </td>
                        <td className="p-2 border">{moyenneCategorie}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            );
            })}
        </div>
        <div className="mt-6 text-right font-bold text-lg">
          Moyenne  :{" "}
          <span className="text-[var(--color-primary)]">{moyenneGenerale}</span>
        </div>

      </div>
        {/* ✅ Moyenne générale (trimestre) en dehors des tableaux */}
    </div>
  );
}
