"use server";
import prisma from "../prisma";

const deleteCategory = async (
  numDossier: string,
  category: string
): Promise<{
  success?: string;
  error?: string;
}> => {
  try {
    const categoryToDelete = await prisma.category.findUnique({
      where: { name: category },
    });

    if (categoryToDelete) {
      await prisma.category.update({
        where: { name: categoryToDelete.name },
        data: {
          dossiers: {
            disconnect: {
              numDossier,
            },
          },
          updatedAt: new Date(),
        },
      });

      return {
        success: categoryToDelete.name,
      };
    } else {
      return {
        error: `La catégorie ${category} n'existe pas`,
      };
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      error: `Erreur lors de la suppression de la catégorie ${category}`,
    };
  }
};

export default deleteCategory;
