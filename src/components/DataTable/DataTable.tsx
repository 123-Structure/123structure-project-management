"use client";
import getDossierByNumDossier from "@/lib/prisma/Dossier/getDossierByNumDossier";
import getLocationByCodeInsee from "@/lib/prisma/Location/getLocationByCodeInsee";
import useDossierStore from "@/lib/store/dossier.store";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface IDataTableProps {
  itemPerPage: string;
  pageIndex: number;
  setMaxPageIndex: React.Dispatch<React.SetStateAction<number>>;
  data: any[];
  tableHead: {
    icon?: JSX.Element;
    title: string;
  }[];
}

const DataTable = (props: IDataTableProps) => {
  const setDossier = useDossierStore((s) => s.setDossier);

  const pageData = () => {
    if (props.data.length > 0) {
      const maxFullPage = Math.floor(
        props.data.length / Number(props.itemPerPage)
      );
      props.setMaxPageIndex(maxFullPage + 1);

      if (maxFullPage >= props.pageIndex) {
        return props.data
          .slice(
            props.data.length - Number(props.itemPerPage) * props.pageIndex,
            props.data.length -
              Number(props.itemPerPage) * props.pageIndex +
              Number(props.itemPerPage)
          )
          .reverse();
      } else {
        return props.data
          .slice(0, props.data.length - maxFullPage * Number(props.itemPerPage))
          .reverse();
      }
    }
    return [];
  };

  const handleRowClick = async (numDossier: string) => {
    const dossier = await getDossierByNumDossier(numDossier);
    if (dossier) {
      const location = await getLocationByCodeInsee(dossier.codeInsee ?? "");
      setDossier({
        openDialog: true,
        dossier: dossier,
        location: location ?? undefined,
      });
    }
  };

  if (props.data.length === 0) {
    return (
      <div className="flex w-full flex-row justify-between">
        <Skeleton className="h-4 w-1/6 rounded-full" />
        <Skeleton className="h-4 w-1/6 rounded-full" />
        <Skeleton className="h-4 w-1/6 rounded-full" />
        <Skeleton className="h-4 w-1/6 rounded-full" />
        <Skeleton className="h-4 w-1/6 rounded-full" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {props.tableHead.map((tableHead, index) => (
            <TableHead key={index}>
              <div className="flex items-center gap-2">
                {tableHead.icon}
                {tableHead.title}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {pageData().map((data, index) => {
          return (
            <TableRow
              key={index}
              className="hover:cursor-pointer"
              onClick={() => handleRowClick(data.numDossier)}
            >
              {Object.keys(data).map((key) =>
                key !== "createdAt" ? (
                  <TableCell key={key}>{data[key]}</TableCell>
                ) : (
                  <></>
                )
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DataTable;
