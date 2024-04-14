import DossierForm from "@/components/DossierForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nouveau dossier",
  description: "Créer un nouveau dossier",
};

const NewDossier = () => {
  return (
      <div className="h-fit w-full rounded-md border p-4">
        <DossierForm mode="create" />
      </div>
  );
};

export default NewDossier;
