import z from "zod";

export const loginSchema = z.object({
    password: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
    email: z.string().email("Email est invalid 🔺"),
  });
  
export  type FormDataLoginType = z.infer<typeof loginSchema>;