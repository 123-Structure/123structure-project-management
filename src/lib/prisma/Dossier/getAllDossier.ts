"use server";
import { AllDossier } from "../../interfaces/AllDossier";
import prisma from "../prisma";

const getAllDossier = async (): Promise<AllDossier[]> => {
  try {
    const dossiers = await prisma.dossier.findMany({
      select: {
        numDossier: true,
        nomDossier: true,
        client: true,
        createdAt: true,
        dessinePar: true,
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

export default getAllDossier;

