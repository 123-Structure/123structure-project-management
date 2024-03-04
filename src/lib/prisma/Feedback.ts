"use server";
import { Dossier, Feedback } from "@prisma/client";
import prisma from "./prisma";

export const createFeedback = async (
  data: Omit<Feedback, "id" | "createdAt" | "updatedAt" | "numDossier">,
  dossier: Dossier
) => {
  if (!data.comment || !data.note) {
    return {
      message: "Toutes les données sont requises",
    };
  }

  try {
    const feedback = await prisma.feedback.create({
      data: {
        ...data,
        dossier: {
          connect: {
            numDossier: dossier.numDossier,
          },
        },
      },
    });
    console.log(feedback);
    return {
      message: "Nouveau feedback créé",
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      message: error.message as string,
    };
  }
};
