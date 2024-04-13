"use client";
import ZoneCard from "@/components/dossierDialog/ZoneCard";
import AddressItem from "@/components/pages/tools/vent-neige-seisme/AddressItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IAddress from "@/lib/interfaces/IAddress";
import fetchAddress from "@/lib/utils/fetchAddress";
import { AudioLines, Search, Snowflake, Wind } from "lucide-react";
import { useState } from "react";

export default function Tools() {
  const defaultData = {
    insee: "",
    vent: "",
    neige: "",
    seisme: "",
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
  };

  const [cp, setCp] = useState("");
  const [ville, setVille] = useState("");
  const [addresses, setAddresses] = useState<IAddress[]>();
  const [currentAddress, setCurrentAddress] = useState(defaultData);

  const handleSubmit = async () => {
    const result = await fetchAddress({
      codePostal: cp === "" ? "0" : cp,
      ville: ville,
    });

    setAddresses(result);
  };

  return (
    <div className="flex w-full gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Code Postal"
            value={cp}
            onChange={(e) => setCp(e.currentTarget.value)}
          />
          <Input
            placeholder="Ville"
            value={ville}
            onChange={(e) => setVille(e.currentTarget.value)}
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
              insee={currentAddress.insee}
              setCurrentAddress={setCurrentAddress}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <ZoneCard
              title="Séisme"
              type="seism"
              value={currentAddress.seisme}
              icon={<AudioLines className="size-20" />}
            />
            <ZoneCard
              title="Vent"
              type="wind"
              value={currentAddress.vent}
              icon={<Wind className="size-20" />}
            />
            <ZoneCard
              title="Neige"
              type="snow"
              value={currentAddress.neige}
              icon={<Snowflake className="size-20" />}
            />
          </div>
        </div>
      </div>
      <div>Carte</div>
    </div>
  );
}
