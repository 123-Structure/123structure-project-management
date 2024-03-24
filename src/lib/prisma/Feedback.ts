"use server";
import { Feedback } from "@prisma/client";
import prisma from "./prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createFeedback = async (
  numDossier: string,
  data: Omit<Feedback, "id" | "createdAt" | "updatedAt" | "numDossier">
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

export const updateFeedback = async (
  numDossier: string,
  data: Partial<Omit<Feedback, "id" | "createdAt" | "updatedAt" | "numDossier">>
): Promise<{
  success?: string;
  error?: string;
}> => {
  if (!numDossier) {
    return {
      error: "Feedback - Numéro de dossier est requis",
    };
  }

  try {
    const generalNote = String(data.generalNote);
    const updatedFeedback = await prisma.feedback.update({
      where: {
        numDossier,
      },
      data: {
        generalComment: data.generalComment,
        generalNote: Number(generalNote[0]),
        updatedAt: new Date(),
      },
    });
    console.log(`🎉 Feedback mis à jour : ${updatedFeedback.numDossier}`);
    return {
      success: updatedFeedback.numDossier,
    };
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log(
          `Feedback - Le feedback avec l'identifiant ${numDossier} n'existe pas`
        );
        return {
          error: `Feedback - Le feedback avec l'identifiant ${numDossier} n'existe pas`,
        };
      }
    }
    console.log(error.message);
    return {
      error: `Feedback - Une erreur inconnue s'est produite : ${
        error.message as string
      }`,
    };
  }
};

export const getFeedbackByNumDossier = async (
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
