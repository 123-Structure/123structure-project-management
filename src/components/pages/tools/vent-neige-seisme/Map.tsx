import IExtendAddress from "@/lib/interfaces/IExtendAddress";
import { primaryColor } from "@/lib/utils/tailwindConfig";
import L, { LatLngExpression, Map as LeafletMap } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface IMapProps {
  currentAddress: IExtendAddress | undefined;
}

const Map = (props: IMapProps) => {
  const defaultPosition: LatLngExpression = [46.539006, 2.4298391];
  const geoJsonStyle = {
    color: "#64748b",
    fillColor: primaryColor,
    weight: 2,
    opacity: 1,
    fillOpacity: 0.4,
  };

  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (
      mapRef.current &&
      props.currentAddress &&
      props.currentAddress.geoJSON.contour
    ) {
      const geoJsonInstance = new L.GeoJSON(
        props.currentAddress.geoJSON.contour
      );
      const bounds = geoJsonInstance.getBounds();
      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [props.currentAddress]);

  return (
    <MapContainer
      center={defaultPosition}
      zoom={6}
      style={{ height: "75vh" }}
      className="rounded"
      whenReady={() => {
        if (props.currentAddress) {
          mapRef.current?.setView(
            [
              props.currentAddress.geometry.coordinates[1],
              props.currentAddress.geometry.coordinates[0],
            ],
            12
          );
        }
      }}
      ref={mapRef}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {props.currentAddress && (
        <Marker
          position={[
            props.currentAddress.geometry.coordinates[1],
            props.currentAddress.geometry.coordinates[0],
          ]}
        >
          <Popup>
            <div>
              <p>
                {props.currentAddress.properties.postcode} -{" "}
                {props.currentAddress.properties.city.toUpperCase()} (
                {props.currentAddress.properties.citycode})
              </p>
              <p className="text-sm text-muted-foreground">
                Vent : {props.currentAddress.zones.vent}
              </p>
              <p className="text-sm text-muted-foreground">
                Neige : {props.currentAddress.zones.neige}
              </p>
              <p className="text-sm text-muted-foreground">
                Séisme : {props.currentAddress.zones.seisme}
              </p>
            </div>
          </Popup>
        </Marker>
      )}
      {props.currentAddress?.geoJSON && (
        <GeoJSON
          key={props.currentAddress?.properties.citycode}
          data={props.currentAddress.geoJSON.contour}
          style={geoJsonStyle}
        >
          <Popup>
            <div>
              <p>
                {props.currentAddress.properties.postcode} -{" "}
                {props.currentAddress.properties.city.toUpperCase()} (
                {props.currentAddress.properties.citycode})
              </p>
              <p className="text-sm text-muted-foreground">
                Vent : {props.currentAddress.zones.vent}
              </p>
              <p className="text-sm text-muted-foreground">
                Neige : {props.currentAddress.zones.neige}
              </p>
              <p className="text-sm text-muted-foreground">
                Séisme : {props.currentAddress.zones.seisme}
              </p>
            </div>
          </Popup>
        </GeoJSON>
      )}
    </MapContainer>
  );
};

export default Map;
