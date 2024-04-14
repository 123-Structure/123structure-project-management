import IGeoJSON from "../interfaces/IGeoJSON";

const fetchContour = async (insee:string):Promise<IGeoJSON>=> {
  try {
    const url = `https://geo.api.gouv.fr/communes?code=${insee}&fields=code,nom,contour`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching contour: ${response.statusText}`);
    }

    const data = await response.json();
    return data[0] as IGeoJSON;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchContour;
