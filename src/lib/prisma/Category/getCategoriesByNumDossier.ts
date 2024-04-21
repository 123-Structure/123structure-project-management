"use server";
import { Category } from "@prisma/client";
import prisma from "../prisma";

const getCategoriesByNumDossier = async (
  numDossier: string
): Promise<Category[] | null> => {
  if (!numDossier) {
    throw new Error("Category - Numéro de dossier est requis");
  }
  try {
    const categories = await prisma.category.findMany({
      where: {
        dossiers: {
          some: {
            numDossier,
          },
        },
      },
    });
    return categories;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des feedbacks :",
      error
    );
    throw new Error("Erreur lors de la récupération des feedbacks");
  }
};

export default getCategoriesByNumDossier;
