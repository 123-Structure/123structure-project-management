interface ContourCoordinates {
  lng: number;
  lat: number;
}

interface Contour {
  type:
    | "Point"
    | "MultiPoint"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon"
    | "GeometryCollection"
    | "Feature"
    | "FeatureCollection";
  coordinates: ContourCoordinates[][][];
}

interface IGeoJSON {
  code: string;
  nom: string;
  contour: Contour;
}

export default IGeoJSON;
