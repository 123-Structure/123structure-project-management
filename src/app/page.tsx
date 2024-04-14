import DossierDialog from "@/components/dossierDialog/DossierDialog";
import HomeDataTable from "@/components/pages/home/HomeDataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil",
  description: "Consulter l'ensemble des dossiers attribués à son espace personnel",
};

export default function Home() {
  return (
    <div className="flex gap-4">
      <div className="w-1/2">
        <HomeDataTable />
      </div>
      <div className="flex w-1/4 flex-col gap-4">
        <div className="flex size-full flex-col gap-2 rounded-lg border border-border p-4">
          <Skeleton className="h-4 w-1/2 rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-1/4 rounded-full" />
        </div>
        <div className="flex size-full flex-col gap-2 rounded-lg border border-border p-4">
          <Skeleton className="h-4 w-1/2 rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-1/4 rounded-full" />
        </div>
      </div>
      <div className="flex w-1/4 grow flex-col gap-2 rounded-lg border border-border p-4">
        <Skeleton className="h-4 w-1/2 rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-1/4 rounded-full" />
      </div>
      <DossierDialog />
    </div>
  );
}
