"use client";
import React from "react";
import DataTablePagination from "./DataTablePagination";
import DataTableSelect from "./DataTableSelect";

interface IDataTableControlsProps {
  itemType: string;
  itemPerPage: string;
  setItemPerPage: React.Dispatch<React.SetStateAction<string>>;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  maxPageIndex: number;
  style?: string;
}

const DataTableControls = (props: IDataTableControlsProps) => {
  return (
    <div className={`${props.style} flex gap-4`}>
      <DataTableSelect
        itemType={props.itemType}
        itemPerPage={props.itemPerPage}
        setItemPerPage={props.setItemPerPage}
      />
      <DataTablePagination
        pageIndex={props.pageIndex}
        setPageIndex={props.setPageIndex}
        maxPageIndex={props.maxPageIndex}
      />
    </div>
  );
};

export default DataTableControls;
