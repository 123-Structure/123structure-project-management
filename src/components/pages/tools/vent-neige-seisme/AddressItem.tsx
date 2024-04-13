import IAddress from "@/lib/interfaces/IAddress";
import fetchSeismSnowWind from "@/lib/utils/fetchSeismSnowWind";
import { primaryColor } from "@/lib/utils/tailwindConfig";
import { ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface IAddressItemProps {
  address: IAddress;
  insee: string;
  setCurrentAddress: Dispatch<
    SetStateAction<{
      insee: string;
      vent: string;
      neige: string;
      seisme: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
    }>
  >;
}

const AddressItem = (props: IAddressItemProps) => {
  const handleClick = async () => {
    const coordinates = {
      latitude: props.address.geometry.coordinates[1],
      longitude: props.address.geometry.coordinates[0],
    };

    const seismSnowWind = await fetchSeismSnowWind(coordinates);

    props.setCurrentAddress({
      insee: props.address.properties.citycode,
      vent: seismSnowWind.vent_ec1,
      neige: seismSnowWind.neige_ec1,
      seisme: seismSnowWind.seisme_ec8,
      coordinates,
    });
  };

  return (
    <div
      className={`flex items-center gap-2 rounded p-2 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted dark:text-slate-50 ${props.insee === props.address.properties.citycode ? "bg-primary/10" :""}`}
      onClick={handleClick}
    >
      <ChevronRight className="size-4" />
      <div className="flex flex-col gap-1">
        <p>{props.address.properties.city.toUpperCase()}</p>
        <p className="text-sm italic text-muted-foreground">
          Code Postal : {props.address.properties.postcode} - INSEE :{" "}
          {props.address.properties.citycode}
        </p>
      </div>
    </div>
  );
};

export default AddressItem;
