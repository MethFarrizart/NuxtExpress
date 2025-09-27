export interface Props {
  pagination: {
    current_page: number;
    per_page: number;
    total_rows: number;
    from: number;
    to: number;
  };
  iconName: string;
  filter:
    | object
    | {
        search: string;
      };
  title: string;
  isSetprintPDF: boolean;
  setButtonAddItem: boolean;
  refreshButton: boolean;
  setFilterCollapse: boolean;
  tableHeader: {
    key: string;
    label: string;
    sortable: true | boolean;
    class: string;
  }[];
  tableData: any[];
  enableSort: boolean;
  class: string;
  sortBy: string;
  sortType: string;
  setButtonAction: boolean;
  setSearchBox: boolean;
  setFilterButton: boolean;
}

export interface Emits {
  (event: "addItem"): void;
  (event: "refreshPage"): void;
  (event: "filterSearch"): void;
  (event: "clickPagination"): void;
  (event: "showRowsByPage", page: number): void;
  (event: "getDataByFilter"): void;
  (event: "update:sortBy", key: string): void;
  (event: "update:sortType", sort: string): void;
  (event: "sortChange"): void;
  (event: "printPDF"): void;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total_rows: number;
  from: number;
  to: number;
}
