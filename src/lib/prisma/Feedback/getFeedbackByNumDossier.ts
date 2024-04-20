"use server";
import { Feedback } from "@prisma/client";
import prisma from "../prisma";

const getFeedbackByNumDossier = async (
  numDossier: string
): Promise<Feedback | null> => {
  if (!numDossier) {
    throw new Error("Feedback - Numéro de dossier est requis");
  }
  try {
    const feedback = await prisma.feedback.findUnique({
      where: {
        numDossier,
      },
    });
    return feedback;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des feedbacks :",
      error
    );
    throw new Error("Erreur lors de la récupération des feedbacks");
  }
};

export default getFeedbackByNumDossier;
