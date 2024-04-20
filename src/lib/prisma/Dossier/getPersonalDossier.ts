"use server";
import { PersonalDossier } from "../../interfaces/PersonalDossier";
import prisma from "../prisma";

const getPersonalDossier = async (
  dessinePar: string
): Promise<PersonalDossier[]> => {
  if (!dessinePar) {
    throw new Error("Information du dossier - 'Dessiné par' est requis");
  }
  try {
    const dossiers = await prisma.dossier.findMany({
      where: {
        dessinePar,
      },
      select: {
        numDossier: true,
        nomDossier: true,
        client: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return dossiers;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des dossiers :",
      error
    );
    throw new Error("Erreur lors de la récupération des dossiers");
  }
};

export default getPersonalDossier;
