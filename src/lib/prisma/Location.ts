"use server";
import { Location } from "@prisma/client";
import fetchAddress from "../utils/fetchAddress";
import fetchSeismSnowWind from "../utils/fetchSeismSnowWind";
import getLittoral from "../utils/getLittoral";
import prisma from "./prisma";

export const createLocation = async (
  data: { codePostal: string; ville: string },
  numDossier: string
): Promise<{
  success?: string;
  error?: string;
}> => {
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

      // console.log(
      //   `🎉 Localisation mise à jour et liée au dossier : ${dossier.numDossier}`
      // );
      return {
        success: `${location.codePostal} ${location.ville}`,
      };
    } else {
      const seismSnowWind = await fetchSeismSnowWind(coordinates);

      if (!seismSnowWind.code) {
        return {
          error: `Localisation (Séisme, Neige et Vent) - Erreur lors de la récupération des données`,
        };
      }

      const littoral = await getLittoral(codeInsee);

      const location = await prisma.location.create({
        data: {
          codePostal: data.codePostal,
          codeInsee,
          ville: data.ville.toUpperCase(),
          seisme: seismSnowWind.seisme_ec8,
          vent: seismSnowWind.vent_ec1,
          neige: seismSnowWind.neige_ec1,
          littoral: littoral ? littoral.CLASSEMENT : "",
          ...coordinates,
        },
      });

      await prisma.dossier.update({
        where: { numDossier: numDossier },
        data: { codeInsee: location.codeInsee },
      });

      // console.log(
      //   `🎉 Localisation créée et liée au dossier : ${dossier.numDossier}`
      // );
      return {
        success: `${location.codePostal} ${location.ville}`,
      };
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      error: `Localisation - ${error.message as string}`,
    };
  }
};


export const getLocationByCodeInsee = async (
  codeInsee: string
): Promise<Location | null> => {
  try {
    const location = await prisma.location.findUnique({
      where: {
        codeInsee,
      },
    });
    return location;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de la localisation :",
      error
    );
    throw new Error("Erreur lors de la récupération de la localisation");
  }
};
