import z from "zod";

export const EcoleSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    adresse: z.string().min(1,"Ce champs est requise 🔺"),
    type: z.string().array(),
    img: z
    .custom<FileList>((value) => {
      return value instanceof FileList && value.length > 0;
    }, {
      message: "Ce champ est requis 🔺",
    }),
});

export  type FormDataEcoleType = z.infer<typeof EcoleSchema>;

export const EcoleEditSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    adresse: z.string().min(1,"Ce champs est requise 🔺"),
    type: z.string().array(),
    img: z
    .custom<FileList>((value) => {
      return value instanceof FileList && value.length > 0;
    }, {
      message: "Ce champ est requis 🔺",
    }),
});

export  type FormDataEcoleEditType = z.infer<typeof EcoleEditSchema>;
