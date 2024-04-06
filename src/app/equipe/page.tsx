import DossierDialog from "@/components/dossierDialog/DossierDialog";
import TeamDataTable from "@/components/pages/team/TeamDataTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipe",
  description: "Consulter l'ensemble des dossiers enregistrés par l'équipe",
};

export default function Equipe() {
  return (
    <div className="flex gap-4">
      <div className="w-full">
        <TeamDataTable />
      </div>
      <DossierDialog />
    </div>
  );
}
