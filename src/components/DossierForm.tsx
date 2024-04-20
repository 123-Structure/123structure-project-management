"use client";
import createCategory from "@/lib/prisma/Category/createCategory";
import createDossier from "@/lib/prisma/Dossier/createDossier";
import getDossierByNumDossier from "@/lib/prisma/Dossier/getDossierByNumDossier";
import updateDossier from "@/lib/prisma/Dossier/updateDossier";
import createLocation from "@/lib/prisma/Location/createLocation";
import getLocationByCodeInsee from "@/lib/prisma/Location/getLocationByCodeInsee";
import updateLocation from "@/lib/prisma/Location/updateLocation";
import createDossierFormSchema from "@/lib/schema/createDossierFormSchema";
import updateDossierFormSchema from "@/lib/schema/updateDossierFormSchema";
import useDossierStore from "@/lib/store/dossier.store";
import { Dossier } from "@prisma/client";
import { Pencil, Save } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import Multiselect from "./Multiselect";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";

interface IDossierFormProps {
  mode: "create" | "update";
  setEditMode?: Dispatch<SetStateAction<boolean>>;
}

const DossierForm = (props: IDossierFormProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const dossier = useDossierStore((s) => s.dossier);
  const setDossier = useDossierStore((s) => s.setDossier);

  const category = [
    "Construction neuve",
    "Extension par agrandissement",
    "Extension par surélévation",
    "Rénovation",
    "Dimensionnement d'élément",
    "Bâtiment industriel",
    "Autre",
  ];

  const handleSubmitCreate = async (data: any) => {
    try {
      const numDossier = data.numDossier;
      const newDossier = await createDossier(data as Dossier);
      const newLocation = await createLocation(numDossier, {
        codePostal: data.codePostal,
        ville: data.ville,
      });
      selectedCategories.map(async (category) => {
        await createCategory(numDossier, category);
      });

      if (newDossier.error || newLocation.error) {
        toast.error("Erreur lors de la création du dossier", {
          description: `${newDossier.error ?? ""} / ${newLocation.error ?? ""}`,
        });
      } else {
        toast.success("Dossier créé avec succès", {
          description: `${newDossier.success} / ${newLocation.success}`,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la création du dossier");
    }
  };

  const handleSubmitUpdate = async (data: any) => {
    try {
      const numDossier = dossier.dossier?.numDossier;
      if (numDossier) {
        const newDossier = await updateDossier(numDossier, data as Dossier);
        const newLocation = await updateLocation(numDossier, {
          codePostal: data.codePostal,
          ville: data.ville,
        });

        if (newDossier.error || newLocation.error) {
          toast.error("Erreur lors de la mise à jour du dossier", {
            description: `${newDossier.error ?? ""} / ${
              newLocation.error ?? ""
            }`,
          });
        } else {
          toast.success("Mise à jour du dossier avec succès", {
            description: `${newDossier.success} / ${newLocation.success}`,
          });
          if (props.setEditMode) {
            props.setEditMode(false);
          }
          const dossier = await getDossierByNumDossier(numDossier);
          if (dossier) {
            const location = await getLocationByCodeInsee(
              dossier.codeInsee ?? ""
            );
            setDossier({
              openDialog: true,
              dossier: dossier,
              location: location ?? undefined,
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la mise à jour du dossier");
    }
  };

  return (
    <AutoForm
      className="flex flex-col"
      formSchema={
        props.mode === "update"
          ? updateDossierFormSchema(dossier)
          : createDossierFormSchema
      }
      onSubmit={(data: any) =>
        props.mode === "update"
          ? handleSubmitUpdate(data)
          : handleSubmitCreate(data)
      }
      fieldConfig={{
        numDossier: {
          inputProps: { placeholder: "00.00.000A" },
        },
        nomDossier: {
          inputProps: { placeholder: "PROPRIETE ABC" },
        },
        codePostal: {
          inputProps: { placeholder: "00000" },
        },
        ville: {
          inputProps: { placeholder: "VILLE" },
        },
        client: {
          inputProps: { placeholder: "ABC Construction" },
        },
        dessinePar: {
          inputProps: { placeholder: "b.lechat" },
        },
      }}
    >
      <Multiselect
        title="Catégories"
        values={category}
        selectedValues={selectedCategories}
        setSelectedValues={setSelectedCategories}
      />
      {props.mode === "update" ? (
        <AutoFormSubmit className="w-fit">
          <Pencil className="mr-2 size-4" />
          Mettre à jour le dossier
        </AutoFormSubmit>
      ) : (
        <AutoFormSubmit className="w-fit">
          <Save className="mr-2 size-4" />
          Enregistrer un nouveau dossier
        </AutoFormSubmit>
      )}
    </AutoForm>
  );
};

export default DossierForm;
