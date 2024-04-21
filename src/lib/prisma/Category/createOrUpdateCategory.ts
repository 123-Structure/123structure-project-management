"use server";
import prisma from "../prisma";

const createOrUpdateCategory = async (
  numDossier: string,
  category: string
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    const existingCategory = await prisma.category.findUnique({
      where: { name: category },
    });

    if (existingCategory) {
      await prisma.category.update({
        where: { name: existingCategory.name },
        data: {
          dossiers: {
            connect: {
              numDossier,
            },
          },
          updatedAt: new Date(),
        },
      });

      return {
        success: existingCategory.name,
      };
    } else {
      await prisma.category.create({
        data: {
          name: category,
          dossiers: {
            connect: {
              numDossier,
            },
          },
        },
      });

      return {
        success: category,
      };
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      error: `Catégorie - ${error.message as string}`,
    };
  }
};

export default createOrUpdateCategory;
