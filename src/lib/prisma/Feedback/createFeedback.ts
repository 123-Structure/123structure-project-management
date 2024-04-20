"use server";
import { Feedback } from "@prisma/client";
import prisma from "../prisma";

const createFeedback = async (
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

export default createFeedback;
