import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const getFormattedDate = (d: Date | undefined) => {
  if (d) {
    const date = dayjs(d);
    const formattedDate = date.format("DD/MM/YYYY");

    return formattedDate;
  }

  return "00/00/0000";
};

export default getFormattedDate;
