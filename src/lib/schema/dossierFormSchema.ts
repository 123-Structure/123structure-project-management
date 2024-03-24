import * as z from "zod";
import { IDossier } from "../store/dossier.store";

// Define your form schema using zod
const dossierFormSchema = (props: IDossier) => {
  const dossier = props.dossier;
  const location = props.location;
  const feedback = props.feedback;

  const note = (note: number) => {
    if (note === 1) {
      return "1 - Non satisfaisant";
    }
    if (note === 2) {
      return "2 - Médiocre";
    }
    if (note === 3) {
      return "3 - Acceptable";
    }
    if (note === 4) {
      return "4 - Bon";
    }
    if (note === 5) {
      return "5 - Excellent";
    }

    return "3 - Acceptable";
  };

  return z.object({
    dossier: z
      .object({
        numDossier: z
          .string({
            required_error: "Numéro de dossier est requis",
          })
          .length(10, {
            message: "Numéro de dossier doit faire 10 caractères",
          })
          .describe("Numéro de dossier")
          .default(dossier ? dossier.numDossier : ""),
        nomDossier: z
          .string({
            required_error: "Nom de dossier est requis",
          })
          .min(1, { message: "Nom de dossier ne peut pas être vide" })
          .max(100, {
            message: "Nom de dossier ne peut pas dépasser 100 caractères",
          })
          .describe("Nom de dossier")
          .default(dossier ? dossier.nomDossier : ""),
        codePostal: z
          .string({
            required_error: "Code postal est requis",
          })
          .length(5, { message: "Code postal doit faire 5 caractères" })
          .describe("Code postal")
          .default(location ? location.codePostal : ""),
        ville: z
          .string({
            required_error: "Ville est requis",
          })
          .min(1, { message: "Ville ne peut pas être vide" })
          .max(100, { message: "Ville ne peut pas dépasser 100 caractères" })
          .default(location ? location.ville : ""),
        client: z
          .string()
          .min(1, { message: "Client ne peut pas être vide" })
          .max(100, { message: "Client ne peut pas dépasser 100 caractères" })
          .default(dossier ? dossier.client : ""),
        dessinePar: z
          .string({
            required_error: "Dessiné par est requis",
          })
          .min(1, { message: "Dessiné par ne peut pas être vide" })
          .max(50, {
            message: "Dessiné par ne peut pas dépasser 50 caractères",
          })
          .describe("Dessiné par")
          .default(dossier ? dossier.dessinePar : ""),
      })
      .describe("📂 Informations du dossier"),
    feedback: z
      .object({
        generalComment: z
          .string()
          .describe("Commentaires")
          .describe("Remarques général sur le projet")
          .optional()
          .default(feedback ? feedback.generalComment : ""),
        generalNote: feedback
          ? z
              .enum([
                "1 - Non satisfaisant",
                "2 - Médiocre",
                "3 - Acceptable",
                "4 - Bon",
                "5 - Excellent",
              ])
              .describe("Note général sur le projet")
              .optional()
              .default(note(feedback.generalNote))
          : z
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
};

export default dossierFormSchema;
