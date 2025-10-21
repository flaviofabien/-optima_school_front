import type { FormDataClasseEditType } from "../Zod-Validation/Classe"
import type { FormDataMatiereType } from "../Zod-Validation/Matiere"
import type { FormDataSalleType } from "../Zod-Validation/Salles"
import type { FormDataStudentType } from "../Zod-Validation/Students"
import type { FormDataTeachType } from "../Zod-Validation/Teach"

export type DataCourseInclude = {
    classe : FormDataClasseEditType[]
    salle : FormDataSalleType[]
    matiere : FormDataMatiereType[]
    teacher : FormDataTeachType[]
    student : FormDataStudentType[]
}

export type DataCourse= {
        idClasse: string;
        idSalle: string;
        idTeacher: string;
        idMatiere: string;
        eleveIds: unknown;
        jour: string;
        heureDebut: string;
        heureFin: string;
        Salle : FormDataSalleType
        Matiere : FormDataMatiereType
        Teacher : FormDataTeachType
}[]