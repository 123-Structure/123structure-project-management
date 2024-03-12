import DossierForm from "@/components/DossierForm";
import PageTransition from "@/components/PageTransition";
import { ScrollArea } from "@/components/ui/scroll-area";

const NewDossier = () => {
  return (
    <PageTransition>
      <ScrollArea className="h-96 w-full rounded-md border p-4">
        <DossierForm />
      </ScrollArea>
    </PageTransition>
  );
};

export default NewDossier;
