"use server";
import { Feedback } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../prisma";
import createFeedback from "./createFeedback";

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

  const generalNote = String(data.generalNote);
  try {
    await prisma.feedback.update({
      where: {
        numDossier,
      },
      data: {
        generalComment: data.generalComment,
        generalNote: Number(generalNote[0]),
        updatedAt: new Date(),
      },
    });
    // console.log(`🎉 Feedback mis à jour : ${updatedFeedback.numDossier}`);
    return {
      success: "Feedback mis à jour",
    };
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // console.log(
        //   `Feedback - Le feedback avec l'identifiant ${numDossier} n'existe pas`
        // );
        // return {
        //   error: `Feedback - Le feedback avec l'identifiant ${numDossier} n'existe pas`,
        // };
        const feedback = await createFeedback(numDossier, {
          generalComment: data.generalComment as string,
          generalNote: Number(generalNote[0]),
        });

        return feedback;
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

export default updateFeedback