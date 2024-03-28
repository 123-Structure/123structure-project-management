import { Dossier } from "@prisma/client";

export type PersonalDossier = Pick<
  Dossier,
  "numDossier" | "nomDossier" | "client"
>;
