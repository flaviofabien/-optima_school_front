export function getBulletinsBySalleAndCategorie(notes: any[], salleId: number) {
  const bulletins: Record<number, any> = {}; // key = studentId

  // Construction des bulletins par élève
  notes.forEach((note) => {
    if ( note.idSalle === salleId) {
      const studentId = note.idStudent;
      const categorieId = note.idCategorie;
      const categorieNom = note.Categorie?.nom || "Non défini";

      if (!bulletins[studentId]) {
        bulletins[studentId] = {
          student: note.Student,
          categories: {},
          moyenneGenerale: 0,
          rangGeneral: 0,
          rangParCategorie: {}  
        };
      }

      if (!bulletins[studentId].categories[categorieId]) {
        bulletins[studentId].categories[categorieId] = {
          nom: categorieNom,
          notes: [],
          moyenne: 0,
        };
      }

      bulletins[studentId].categories[categorieId].notes.push({
        matiere: note.Matiere.nom,
        coeff: note.Matiere.coefficiant,
        note: note.note,
        total: note.note * note.Matiere.coefficiant,
      });
    } else if (salleId === 0 ) {
      const studentId = note.idStudent;
      const categorieId = note.idCategorie;
      const categorieNom = note.Categorie?.nom || "Non défini";

      if (!bulletins[studentId]) {
        bulletins[studentId] = {
          student: note.Student,
          categories: {},
          moyenneGenerale: 0,
          rangGeneral: 0,
          rangParCategorie: {}  
        };
      }

      if (!bulletins[studentId].categories[categorieId]) {
        bulletins[studentId].categories[categorieId] = {
          nom: categorieNom,
          notes: [],
          moyenne: 0,
        };
      }

      bulletins[studentId].categories[categorieId].notes.push({
        matiere: note.Matiere.nom,
        coeff: note.Matiere.coefficiant,
        note: note.note,
        total: note.note * note.Matiere.coefficiant,
      });
    }
  });

  // Calcul des moyennes par catégorie pour chaque élève
  Object.values(bulletins).forEach((bulletin) => {
    let totalNotes = 0;
    let totalCoef = 0;

    for (const catId in bulletin.categories) {
      const cat = bulletin.categories[catId];
      const sommeNotes = cat.notes.reduce((acc, n) => acc + n.total, 0);
      const sommeCoef = cat.notes.reduce((acc, n) => acc + n.coeff, 0);
      cat.moyenne = sommeCoef ? sommeNotes / sommeCoef : 0;

      // cumul pour la moyenne générale
      totalNotes += sommeNotes;
      totalCoef += sommeCoef;
    }

    bulletin.moyenneGenerale = totalCoef ? totalNotes / totalCoef : 0;
  });

  // Calcul du rang général
  const bulletinsArray = Object.values(bulletins);
  bulletinsArray.sort((a, b) => b.moyenneGenerale - a.moyenneGenerale);
  bulletinsArray.forEach((b, i) => {
    b.rangGeneral = i + 1;
  });

  // Calcul des rangs par catégorie (trimestre)
  // On va parcourir chaque catégorie existante
  const categoriesIds = new Set<string>();
  bulletinsArray.forEach(b => {
    Object.keys(b.categories).forEach(catId => categoriesIds.add(catId));
  });

  categoriesIds.forEach(catId => {
    // Trier les élèves selon leur moyenne dans cette catégorie
    const sortedByCat = bulletinsArray
      .filter(b => b.categories[catId])  // ceux qui ont cette catégorie
      .sort((a, b) => b.categories[catId].moyenne - a.categories[catId].moyenne);

    sortedByCat.forEach((b, index) => {
      if (!b.rangParCategorie) b.rangParCategorie = {};
      b.rangParCategorie[catId] = index + 1;
    });
  });

  return bulletinsArray;
}
