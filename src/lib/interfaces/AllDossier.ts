import { Dossier } from "@prisma/client";

export type AllDossier = Pick<
  Dossier,
  "numDossier" | "nomDossier" | "client" | "dessinePar"
>;
