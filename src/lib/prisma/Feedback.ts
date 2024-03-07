"use server";
import { Feedback } from "@prisma/client";
import prisma from "./prisma";

export const createFeedback = async (
  data: Omit<Feedback, "id" | "createdAt" | "updatedAt" | "numDossier">,
  numDossier: string
) => {
  if (!data.generalComment || !data.generalNote) {
    return {
      message: "⚠ Feedback - Toutes les données sont requises",
    };
  }

  try {
    const generalNote = String(data.generalNote);
    const feedback = await prisma.feedback.create({
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
    console.log(`🎉 Nouveau feedback créé : ${feedback.id}`);
    return {
      message: "🎉 Nouveau feedback créé",
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      message: `💥 Erreur - Création feedback : ${error.message as string}`,
    };
  }
};
