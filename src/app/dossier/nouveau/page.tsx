import DossierForm from "@/components/DossierForm";
import PageTransition from "@/components/PageTransition";

const NewDossier = () => {
  return (
    <PageTransition>
      <div className="h-fit w-full rounded-md border p-4">
        <DossierForm mode="create"/>
      </div>
    </PageTransition>
  );
};

export default NewDossier;
