"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import IExtendAddress from "@/lib/interfaces/IExtendAddress";
import { primaryColor } from "@/lib/utils/tailwindConfig";
import "@fortawesome/fontawesome-free/css/all.min.css";
import L, { ExtraMarkers, LatLngExpression, Map as LeafletMap } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "leaflet-extra-markers/dist/js/leaflet.extra-markers.js";
import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { GeoJSON, MapContainer, Marker, TileLayer } from "react-leaflet";
import MapPopup from "./MapPopup";

interface IMapProps {
  currentAddress: IExtendAddress | undefined;
}

const Map = (props: IMapProps) => {
  const [classicMode, setClassicMode] = useState<boolean>(false);
  const [tileLayerUrl, setTileLayerUrl] = useState<string>(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  );

  const isWindowDefined = typeof window !== "undefined";
  const { theme } = useTheme();
  const mapRef = useRef<LeafletMap | null>(null);

  const defaultPosition: LatLngExpression = [46.539006, 2.4298391];
  const geoJsonStyle = {
    color: theme === "light" ? "#64748b" : "#ca8a04",
    fillColor: theme === "light" ? primaryColor : "#64748b",
    weight: 2,
    opacity: 1,
    fillOpacity: theme === "light" ? 0.4 : 0.3,
  };

  const customMarker = ExtraMarkers.icon({
    icon: props.currentAddress?.zones.littoral ? "fa-water" : "fa-house",
    markerColor: "blue-dark",
    shape: "square",
    prefix: "fas",
  });

  const handleCheckedChange = (checked: boolean) => {
    if (isWindowDefined) {
      setClassicMode(checked);
      localStorage.setItem("CLASSIC_MAP_MODE", checked ? "1" : "0");
    }
  };

  useEffect(() => {
    if (isWindowDefined) {
      const classicMapMode = localStorage.getItem("CLASSIC_MAP_MODE") || "0";
      if (classicMapMode === "0") {
        setClassicMode(false);
      }
      if (classicMapMode === "1") {
        setClassicMode(true);
      }
    }
  }, [isWindowDefined]);

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

  useEffect(() => {
    if (theme === "light" && classicMode) {
      setTileLayerUrl("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    }

    if (theme === "light" && !classicMode) {
      setTileLayerUrl(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      );
    }

    if (theme === "dark") {
      setTileLayerUrl(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      );
    }
  }, [classicMode, theme]);

  return (
    <div className="flex flex-col gap-2">
      <MapContainer
        center={defaultPosition}
        zoom={6}
        style={{ height: "78vh" }}
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
        <TileLayer url={tileLayerUrl} key={tileLayerUrl} />
        {props.currentAddress && (
          <Marker
            position={[
              props.currentAddress.geometry.coordinates[1],
              props.currentAddress.geometry.coordinates[0],
            ]}
            icon={customMarker}
          >
            <MapPopup currentAddress={props.currentAddress} />
          </Marker>
        )}
        {props.currentAddress?.geoJSON && (
          <GeoJSON
            key={props.currentAddress?.properties.citycode}
            data={props.currentAddress.geoJSON.contour}
            style={geoJsonStyle}
          >
            <MapPopup currentAddress={props.currentAddress} />
          </GeoJSON>
        )}
      </MapContainer>
      {theme === "light" && (
        <div className="flex items-center space-x-2">
          <Switch
            id="classic-mode"
            checked={classicMode}
            onCheckedChange={(checked: boolean) => handleCheckedChange(checked)}
          />
          <Label htmlFor="classic-mode">Mode Classique</Label>
        </div>
      )}
    </div>
  );
};

export default Map;
