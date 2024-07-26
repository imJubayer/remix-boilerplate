import {
  IconDefinition,
  faArrowDown,
  faArrowUp,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "@remix-run/react";
import _ from "lodash";
import React, { useCallback, useState } from "react";

import { ColumnType } from "~/types/common";
import { checkNullInfo, checkDecimal } from "~/utils/helper";

interface TableProps {
  name?: string;
  searchable?: boolean;
  filter?: React.ReactNode;
  secondary?: React.ReactNode;
  loading?: boolean;
  columns: ColumnType[];
  rows: any[];
  count?: number;
  page?: number;
  rowsPerPage?: number;
  link?: string;
  linkID?: string;
  idField?: string;
  statusField?: string;
  showSerial?: boolean;
  sortables?: string[];
  serverSide?: boolean;
  setPage?: (value: number) => void;
  setRowsPerPage?: (value: number) => void;
  updateStatus?: (id: string) => void;
  updateRows?: (data: any[]) => void;
}

const BasicDataTable = ({
  name,
  searchable,
  filter,
  secondary,
  loading,
  columns,
  rows,
  count = 0,
  page = 0,
  rowsPerPage = 10,
  link = "",
  linkID,
  showSerial,
  sortables,
  idField,
  statusField,
  serverSide = true,
  updateStatus,
  updateRows,
}: TableProps) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [search, setSearch] = useState("");

  const handleNavigate = (page: number, limit: number, search?: string) => {
    const searchParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    });
    if (searchable && search) {
      searchParams.set("search", search);
    }
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const rowsPerPageToSet = parseInt(event.target.value, 10);
    handleNavigate(1, rowsPerPageToSet, search);
  };

  const debouncedSearch = useCallback(
    _.debounce((value) => {
      handleNavigate(1, rowsPerPage, value);
    }, 300),
    [rowsPerPage],
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    debouncedSearch(event.target.value);
  };

  const getPaginationFrom = (): number => {
    if (count) {
      return ((page - 1) * rowsPerPage + 1) as number;
    } else {
      return 0;
    }
  };

  const getPaginationTo = (): number => {
    return page * rowsPerPage > count
      ? (count as number)
      : ((page * rowsPerPage) as number);
  };

  const getLabelDisplayedRowsTo = () => {
    if (rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? count
      : Math.min(count, (page + 1) * rowsPerPage);
  };

  const getPaginationFromToString = (): string => {
    if (serverSide) {
      return `${getPaginationFrom()}-${getPaginationTo()} of ${count}`;
    } else {
      return `${page * rowsPerPage + 1}-${getLabelDisplayedRowsTo()} of ${count}`;
    }
  };

  const slicedRows = (rows: any) => {
    if (!serverSide) {
      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
    return rows;
  };

  const renderCell = (item: any, column: any) => {
    if (column.content) {
      return column.content(item);
    }
    return checkNullInfo(checkDecimal(item[column.accessor]));
  };

  const sortByColumn = (columnKey: string) => {
    const allRows = [...rows];
    let sorted;

    if (sortConfig.key === columnKey) {
      sorted =
        sortConfig.direction === "asc"
          ? _.sortBy(allRows, [(o) => o[columnKey]]).reverse()
          : _.sortBy(allRows, [(o) => o[columnKey]]);
      setSortConfig({
        key: columnKey,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      sorted = _.sortBy(allRows, [(o) => o[columnKey]]);
      setSortConfig({ key: columnKey, direction: "asc" });
    }
    if (updateRows) {
      updateRows(sorted);
    }
  };

  const getSortIcon = (columnKey: string): IconDefinition | null => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? faArrowUp : faArrowDown;
    }
    return null;
  };

  return (
    <div className="card card-flush">
      <div className="card-header mt-6">
        <div className="card-title">
          {name ? <h3>{name}</h3> : null}
          {searchable && (
            <div className="d-flex align-items-center position-relative my-1 me-5">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="position-absolute ms-5 text-gray-600"
              />
              <input
                type="text"
                data-kt-permissions-table-filter="search"
                className="form-control form-control-solid w-250px ps-13"
                placeholder="Search"
                onChange={handleSearch}
              />
            </div>
          )}
          {filter ? filter : null}
        </div>
        <div className="card-toolbar">{secondary}</div>
      </div>
      <div className="card-body">
        <table className="table align-middle table-row-dashed">
          <thead>
            <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0 text-gray-800 text-gray-800">
              {showSerial ? <th style={{ width: "5%" }}>SL.</th> : null}
              {columns.map((column: ColumnType, index: number) =>
                sortables?.length &&
                column.accessor &&
                sortables.includes(column.accessor) ? (
                  <th
                    key={index}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      column.accessor && sortByColumn(column.accessor);
                    }}
                  >
                    {column.header}{" "}
                    {getSortIcon(column.accessor) ? (
                      <FontAwesomeIcon
                        icon={getSortIcon(column.accessor) as IconDefinition}
                      />
                    ) : null}
                  </th>
                ) : (
                  <th key={index}>{column.header}</th>
                ),
              )}
              {statusField && idField && updateStatus ? (
                <th>Update Status</th>
              ) : null}
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-semibold">
            {rows.length ? (
              slicedRows(rows).map((row: any, i: number) => (
                <tr
                  key={i}
                  style={{
                    cursor: linkID ? "pointer" : "auto",
                  }}
                >
                  {showSerial ? (
                    <td>
                      {rowsPerPage && page
                        ? (page - 1) * rowsPerPage + i + 1
                        : i + 1}
                    </td>
                  ) : null}
                  {columns.map((column: ColumnType, k: number) => (
                    <td key={k} style={{ width: column.width || "15%" }}>
                      {linkID ? (
                        <Link to={`${link + row[linkID]}/`}>
                          {renderCell(row, column)}
                        </Link>
                      ) : (
                        renderCell(row, column)
                      )}
                    </td>
                  ))}
                  {statusField && idField && updateStatus ? (
                    <td>
                      <button
                        onClick={() => updateStatus(row[idField])}
                        className={`btn ${row[statusField] ? "btn-success" : "btn-primary"} btn-sm`}
                      >
                        {row[statusField] ? "Cancel Approval" : "Approve"}
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={showSerial ? columns.length + 1 : columns.length}
                  style={{ textAlign: "center" }}
                >
                  {loading ? <h3>Loading...</h3> : <h3>No Data Found</h3>}
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="form-inline">
                    <select
                      className="form-select form-select form-select-solid"
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                  <span className="mx-5">{getPaginationFromToString()}</span>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-light btn-icon"
                      disabled={page === 1}
                      onClick={() =>
                        handleNavigate(page - 1, rowsPerPage, search)
                      }
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-icon"
                      disabled={getPaginationTo() === count}
                      onClick={() =>
                        handleNavigate(page + 1, rowsPerPage, search)
                      }
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BasicDataTable;
