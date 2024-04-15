import * as z from "zod";
import { IDossier } from "../store/dossier.store";

// Define your form schema using zod
const updateDossierFormSchema = (props: IDossier) => {
  const dossier = props.dossier;
  const location = props.location;

  return z.object({
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
          .default(dossier ? dossier.client : "")
  });
};

export default updateDossierFormSchema;
