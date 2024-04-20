"use server";
import { Dossier } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../prisma";

const createDossier = async (
  data: Omit<Dossier, "id" | "createdAt" | "updatedAt">
): Promise<{
  success?: string;
  error?: string;
}> => {
  if (
    !data.numDossier ||
    !data.nomDossier ||
    !data.client ||
    !data.dessinePar
  ) {
    return {
      error: "Information du dossier - Toutes les données sont requises",
    };
  }

  try {
    const dossier = await prisma.dossier.create({
      data: {
        numDossier: data.numDossier,
        nomDossier: data.nomDossier,
        client: data.client,
        dessinePar: data.dessinePar,
      },
    });
    // console.log(`🎉 Nouveau dossier créé : ${dossier.numDossier}`);
    return {
      success: dossier.numDossier,
    };
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          `Information du dossier - Le numéro de dossier ${data.numDossier} existe déjà`
        );
        return {
          error: `Information du dossier - Le numéro de dossier ${data.numDossier} existe déjà`,
        };
      }
    }
    console.log(error.message);
    return {
      error: `Information du dossier - Une erreur inconnue s'est produite : ${
        error.message as string
      }`,
    };
  }
};

export default createDossier;
