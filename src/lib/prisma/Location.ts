"use server";
import fetchAddress from "../utils/fetchAddress";
import prisma from "./prisma";

export const createLocation = async (
  data: { cp: string; ville: string },
  numDossier: string
) => {
  try {
    const address = await fetchAddress({
      cp: data.cp,
      ville: data.ville,
    });

    const coordinates = {
      latitude: address.geometry.coordinates[1],
      longitude: address.geometry.coordinates[0],
    };

    const location = await prisma.location.create({
      data: {
        ...coordinates,
        cp: data.cp,
        ville: data.ville,
        dossier: {
          connect: {
            numDossier: numDossier,
          },
        },
      },
    });
    console.log(`🎉 Nouveau location créé : ${location.id}`);
    return {
      message: "🎉 Nouveau location créé",
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      message: `💥 Erreur - Création location : ${error.message as string}`,
    };
  }
};
