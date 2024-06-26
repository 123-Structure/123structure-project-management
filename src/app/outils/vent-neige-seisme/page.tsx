"use client";
import ZoneCard from "@/components/dossierDialog/ZoneCard";
import AddressItem from "@/components/pages/tools/vent-neige-seisme/AddressItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IAddress from "@/lib/interfaces/IAddress";
import IExtendAddress from "@/lib/interfaces/IExtendAddress";
import fetchAddress from "@/lib/utils/fetchAddress";
import { AudioLines, Search, Snowflake, Wind } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function Tools() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/pages/tools/vent-neige-seisme/Map"), {
        loading: () => <p>Map is loading</p>,
        ssr: false,
      }),
    []
  );

  const [cp, setCp] = useState("");
  const [ville, setVille] = useState("");
  const [addresses, setAddresses] = useState<IAddress[]>();
  const [currentAddress, setCurrentAddress] = useState<IExtendAddress>();

  const resetInput = () => {
    setCp("");
    setVille("");
  };

  const handleSubmit = async () => {
    const promise = async () => {
      const result = await fetchAddress({
        codePostal: cp === "" ? "0" : cp,
        ville: ville,
      });

      return result;
    };

    toast.promise(promise, {
      loading: "Chargement...",
      success: (data) => {
        setAddresses(data);
        resetInput();
        return `${data.length} résultat(s) trouvé(s)`;
      },
      error: "Erreur lors du chargement des données",
    });
  };

const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
    handleSubmit();
  }
};

  return (
    <div className="flex w-full gap-4">
      <div className="flex w-2/5 flex-col gap-2">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Code Postal"
            value={cp}
            onChange={(e) => setCp(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
          <Input
            placeholder="Ville"
            value={ville}
            onChange={(e) => setVille(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="submit" onClick={handleSubmit}>
            <Search className="mr-2 size-4" />
            Rechercher
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {addresses?.map((address, index) => (
            <AddressItem
              key={index}
              address={address}
              insee={currentAddress?.properties.citycode}
              setCurrentAddress={setCurrentAddress}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <ZoneCard
              title="Séisme"
              type="seism"
              value={currentAddress?.zones.seisme}
              icon={<AudioLines className="size-20" />}
            />
            <ZoneCard
              title="Vent"
              type="wind"
              value={currentAddress?.zones.vent}
              icon={<Wind className="size-20" />}
            />
            <ZoneCard
              title="Neige"
              type="snow"
              value={currentAddress?.zones.neige}
              icon={<Snowflake className="size-20" />}
            />
          </div>
        </div>
      </div>
      <div className="z-0 size-full">
        <Map currentAddress={currentAddress} />
      </div>
    </div>
  );
}
