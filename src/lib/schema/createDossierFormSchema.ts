import * as z from "zod";

// Define your form schema using zod
const createDossierFormSchema = z.object({
  dossier: z
    .object({
      numDossier: z
        .string({
          required_error: "Numéro de dossier est requis",
        })
        .length(10, {
          message: "Numéro de dossier doit faire 10 caractères",
        })
        .describe("Numéro de dossier"),
      nomDossier: z
        .string({
          required_error: "Nom de dossier est requis",
        })
        .min(1, { message: "Nom de dossier ne peut pas être vide" })
        .max(100, {
          message: "Nom de dossier ne peut pas dépasser 100 caractères",
        })
        .describe("Nom de dossier"),
      codePostal: z
        .string({
          required_error: "Code postal est requis",
        })
        .length(5, { message: "Code postal doit faire 5 caractères" })
        .describe("Code postal"),
      ville: z
        .string({
          required_error: "Ville est requis",
        })
        .min(1, { message: "Ville ne peut pas être vide" })
        .max(100, { message: "Ville ne peut pas dépasser 100 caractères" }),
      client: z
        .string()
        .min(1, { message: "Client ne peut pas être vide" })
        .max(100, { message: "Client ne peut pas dépasser 100 caractères" }),
      dessinePar: z
        .string({
          required_error: "Dessiné par est requis",
        })
        .min(1, { message: "Dessiné par ne peut pas être vide" })
        .max(50, {
          message: "Dessiné par ne peut pas dépasser 50 caractères",
        })
        .describe("Dessiné par"),
    })
    .describe("📂 Informations du dossier"),
  feedback: z
    .object({
      generalComment: z
        .string()
        .describe("Commentaires")
        .describe("Remarques général sur le projet")
        .optional(),
      generalNote: z
        .enum([
          "1 - Non satisfaisant",
          "2 - Médiocre",
          "3 - Acceptable",
          "4 - Bon",
          "5 - Excellent",
        ])
        .describe("Note général sur le projet")
        .optional(),
    })
    .describe("📝 Remarques sur le dossier")
    .optional(),
});

export default createDossierFormSchema;
