"use server";
import fetchAddress from "../utils/fetchAddress";
import prisma from "./prisma";

export const createLocation = async (
  data: { codePostal: string; ville: string },
  numDossier: string
) => {
  try {
    const address = await fetchAddress({
      codePostal: data.codePostal,
      ville: data.ville,
    });

    const coordinates = {
      latitude: address.geometry.coordinates[1],
      longitude: address.geometry.coordinates[0],
    };

    const codeInsee = address.properties.citycode;

    const existingLocation = await prisma.location.findUnique({
      where: { codeInsee: codeInsee },
    });

    let location;

    if (existingLocation) {
      const dossier = await prisma.dossier.update({
        where: { numDossier: numDossier },
        data: { codeInsee: existingLocation.codeInsee },
      });
      location = existingLocation;

      console.log(
        `🎉 Localisation mise à jour et liée au dossier : ${dossier.numDossier}`
      );
      return {
        message: `🎉 Localisation mise à jour et liée au dossier : ${dossier.numDossier}`,
      };
    } else {
      const location = await prisma.location.create({
        data: {
          codePostal: data.codePostal,
          codeInsee,
          ville: data.ville,
          ...coordinates,
        },
      });
      const dossier = await prisma.dossier.update({
        where: { numDossier: numDossier },
        data: { codeInsee: location.codeInsee },
      });

      console.log(
        `🎉 Localisation créée et liée au dossier : ${dossier.numDossier}`
      );
      return {
        message: `🎉 Localisation créée à jour et liée au dossier : ${dossier.numDossier}`,
      };
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      message: `💥 Erreur - Création location : ${error.message as string}`,
    };
  }
};
