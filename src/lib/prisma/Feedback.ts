"use server";
import { Feedback } from "@prisma/client";
import prisma from "./prisma";

export const createFeedback = async (
  data: Omit<Feedback, "id" | "createdAt" | "updatedAt" | "numDossier">,
  numDossier: string
): Promise<{
  success?: string;
  error?: string;
}> => {
  if (!data.generalComment || !data.generalNote) {
    return {
      error: "Feedback - Toutes les données sont requises",
    };
  }

  try {
    const generalNote = String(data.generalNote);
    await prisma.feedback.create({
      data: {
        generalComment: data.generalComment,
        generalNote: Number(generalNote[0]),
        dossier: {
          connect: {
            numDossier: numDossier,
          },
        },
      },
    });
    // console.log(`🎉 Nouveau feedback créé : ${feedback.id}`);
    return {
      success: "Feedback créé",
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      error: `Feedback - ${error.message as string}`,
    };
  }
};

export const getFeedbackByNumDossier = async (
  numDossier: string
): Promise<Feedback | null> => {
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
