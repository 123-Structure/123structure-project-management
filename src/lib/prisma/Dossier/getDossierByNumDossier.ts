"use server";
import { Dossier } from "@prisma/client";
import prisma from "../prisma";

const getDossierByNumDossier = async (
  numDossier: string
): Promise<Dossier | null> => {
  if (!numDossier) {
    throw new Error("Information du dossier - Numéro de dossier est requis");
  }
  try {
    const dossier = await prisma.dossier.findUnique({
      where: {
        numDossier,
      },
    });
    return dossier;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des dossiers :",
      error
    );
    throw new Error("Erreur lors de la récupération des dossiers");
  }
};

export default getDossierByNumDossier;
