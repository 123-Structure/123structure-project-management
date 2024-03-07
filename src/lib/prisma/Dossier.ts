"use server";
import { Dossier } from "@prisma/client";
import fetchAddress from "../utils/fetchAddress";
import prisma from "./prisma";

export const createDossier = async (
  data: Omit<Dossier, "id" | "createdAt" | "updatedAt">
) => {
  if (
    !data.numDossier ||
    !data.nomDossier ||
    !data.cp ||
    !data.ville ||
    !data.client ||
    !data.dessinePar
  ) {
    return {
      message: "Toutes les données sont requises",
    };
  }

  try {
    const addresses = await fetchAddress(`${data.cp} ${data.ville}`);
    console.log("Adresses trouvées :", addresses);
    const dossier = await prisma.dossier.create({
      data,
    });
    console.log(`🎉 Nouveau dossier créé : ${dossier.numDossier}`);
    return {
      message: `🎉 Nouveau dossier créé : ${dossier.numDossier}`,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      message: `💥 Erreur - Création dossier : ${error.message as string}`,
    };
  }
};
