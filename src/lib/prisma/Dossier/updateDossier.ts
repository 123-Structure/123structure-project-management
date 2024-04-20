"use server";
import { Dossier } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../prisma";

const updateDossier = async (
  numDossier: string,
  data: Partial<Omit<Dossier, "id" | "createdAt" | "updatedAt">>
): Promise<{
  success?: string;
  error?: string;
}> => {
  if (!numDossier) {
    return {
      error: "Information du dossier - Numéro de dossier est requis",
    };
  }

  try {
    const updatedDossier = await prisma.dossier.update({
      where: {
        numDossier,
      },
      data: {
        numDossier: data.numDossier,
        nomDossier: data.nomDossier,
        client: data.client,
        dessinePar: data.dessinePar,
        updatedAt: new Date(),
      },
    });
    // console.log(`🎉 Dossier mis à jour : ${updatedDossier.numDossier}`);
    return {
      success: updatedDossier.numDossier,
    };
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log(
          `Information du dossier - Le dossier avec l'identifiant ${numDossier} n'existe pas`
        );
        return {
          error: `Information du dossier - Le dossier avec l'identifiant ${numDossier} n'existe pas`,
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

export default updateDossier;
