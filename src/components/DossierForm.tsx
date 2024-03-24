"use client";
import { createDossier, updateDossier } from "@/lib/prisma/Dossier";
import { createFeedback, updateFeedback } from "@/lib/prisma/Feedback";
import { createLocation, updateLocation } from "@/lib/prisma/Location";
import dossierFormSchema from "@/lib/schema/dossierFormSchema";
import useDossierStore from "@/lib/store/dossier.store";
import { Dossier, Feedback } from "@prisma/client";
import { Pencil, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";

interface IDossierFormProps {
  mode: "create" | "update";
}

const DossierForm = (props: IDossierFormProps) => {
  const dossier = useDossierStore((s) => s.dossier);
  const resetDossier = useDossierStore((s) => s.resetDossier);
  const router = useRouter();

  const handleSubmitCreate = async (data: any) => {
    try {
      const numDossier = data.dossier.numDossier;
      const newDossier = await createDossier(data.dossier as Dossier);
      const newLocation = await createLocation(numDossier, {
        codePostal: data.dossier.codePostal,
        ville: data.dossier.ville,
      });

      let newFeedback;
      if (data.feedback !== undefined) {
        newFeedback = await createFeedback(
          numDossier,
          data.feedback as Feedback
        );
      }

      if (
        newDossier.error ||
        newLocation.error ||
        (newFeedback && newFeedback.error)
      ) {
        toast.error("Erreur lors de la création du dossier", {
          description: `${newDossier.error ?? ""} / ${
            newLocation.error ?? ""
          } / ${newFeedback?.error ?? ""}`,
        });
      } else {
        toast.success("Dossier créé avec succès", {
          description: `${newDossier.success} / ${newLocation.success} ${
            newFeedback?.success ? `/ ${newFeedback?.success}` : ""
          }`,
        });
        router.refresh();
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
        const newDossier = await updateDossier(
          numDossier,
          data.dossier as Dossier
        );
        const newLocation = await updateLocation(numDossier, {
          codePostal: data.dossier.codePostal,
          ville: data.dossier.ville,
        });

        let newFeedback;
        if (data.feedback !== undefined) {
          newFeedback = await updateFeedback(
            numDossier,
            data.feedback as Feedback
          );
        }

        if (
          newDossier.error ||
          newLocation.error ||
          (newFeedback && newFeedback.error)
        ) {
          toast.error("Erreur lors de la mise à jour du dossier", {
            description: `${newDossier.error ?? ""} / ${
              newLocation.error ?? ""
            } / ${newFeedback?.error ?? ""}`,
          });
        } else {
          toast.success("Mise à jour du dossier avec succès", {
            description: `${newDossier.success} / ${newLocation.success} ${
              newFeedback?.success ? `/ ${newFeedback?.success}` : ""
            }`,
          });

        resetDossier();
          router.refresh();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la mise à jour du dossier");
    }
  };

  return (
    <AutoForm
      formSchema={dossierFormSchema(dossier)}
      onSubmit={(data: any) =>
        props.mode === "update"
          ? handleSubmitUpdate(data)
          : handleSubmitCreate(data)
      }
      fieldConfig={{
        dossier: {
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
        },
        feedback: {
          generalComment: {
            inputProps: {
              placeholder: "Commentaires",
            },
            fieldType: "textarea",
          },
          generalNote: {
            fieldType: "radio",
          },
        },
      }}
    >
      {props.mode === "update" ? (
        <AutoFormSubmit>
          <Pencil className="mr-2 size-4" />
          Mettre à jour le dossier
        </AutoFormSubmit>
      ) : (
        <AutoFormSubmit>
          <Save className="mr-2 size-4" />
          Enregistrer un nouveau dossier
        </AutoFormSubmit>
      )}
    </AutoForm>
  );
};

export default DossierForm;
