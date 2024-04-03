"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DataTable from "./DataTable";
import DataTableControls from "./DataTableControls";

interface IDataTableContainer {
  itemType: string;
  tableIcon?: JSX.Element;
  tableTitle: string;
  tableHead: {
    icon?: JSX.Element;
    title: string;
  }[];
  data: any[];
}

const DataTableContainer = (props: IDataTableContainer) => {
  const [itemPerPage, setItemPerPage] = useState("10");
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(0);

  useEffect(() => {
    setPageIndex(1);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="mr-2">{props.tableIcon}</span>
            {props.tableTitle}
          </div>
          <DataTableControls
            itemType={props.itemType}
            itemPerPage={itemPerPage}
            setItemPerPage={setItemPerPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            maxPageIndex={maxPageIndex}
            style="hidden sm:flex"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <DataTable
          itemPerPage={itemPerPage}
          pageIndex={pageIndex}
          setMaxPageIndex={setMaxPageIndex}
          data={props.data}
          tableHead={props.tableHead}
        />
        <DataTableControls
          itemType={props.itemType}
          itemPerPage={itemPerPage}
          setItemPerPage={setItemPerPage}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          maxPageIndex={maxPageIndex}
        />
      </CardContent>
    </Card>
  );
};

export default DataTableContainer;
