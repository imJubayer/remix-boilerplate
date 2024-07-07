import React, { useState, useEffect } from "react";
import { Link, Form } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faArrowDown,
  faArrowUp,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { ColumnType } from "~/types/common";
import { checkNullInfo, checkDecimal } from "~/utils/helper";

type TableProps = {
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
  showSL?: boolean;
  sortables?: string[];
  setPage?: (value: number) => void;
  setRowsPerPage?: (value: number) => void;
  updateStatus?: (id: string) => void;
  updateRows?: (data: any[]) => void;
  serverSide?: boolean;
};

const BasicDataTable = ({
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
  showSL,
  sortables,
  idField,
  statusField,
  setPage,
  setRowsPerPage,
  updateStatus,
  updateRows,
  serverSide = false,
}: TableProps) => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const handleChangePage = (newPage: number) => {
    if (setPage) {
      setPage(newPage);
    }
  };

  const slicedRows = (rows: any) => {
    if (!serverSide) {
      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
    return rows;
  };

  function labelDisplayedRows({
    from,
    to,
    count,
  }: {
    from: number;
    to: number;
    count: number;
  }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  const getLabelDisplayedRowsTo = () => {
    if (rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? count
      : Math.min(count, (page + 1) * rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage && setRowsPerPage(parseInt(event.target.value, 10));
    setPage && setPage(0);
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
          {/* {searchable && (
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
              />
            </div>
          )} */}
          {filter && filter}
        </div>
        <div className="card-toolbar">{secondary}</div>
      </div>
      <div className="card-body py-4">
        <table className="table align-middle table-row-dashed fs-6 gy-5 table-hover">
          <thead>
            <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
              {showSL && (
                <th style={{ textAlign: "center", width: "50px" }}>Sl</th>
              )}
              {columns.map((column: ColumnType, index: number) =>
                sortables?.length &&
                column.accessor &&
                sortables.includes(column.accessor) ? (
                  <th
                    className="w-10px pe-2"
                    key={index}
                    style={{
                      textAlign: "center",
                      width: column.width || "auto",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      column.accessor && sortByColumn(column.accessor);
                    }}
                  >
                    {column.header}{" "}
                    {getSortIcon(column.accessor) && (
                      <FontAwesomeIcon
                        icon={getSortIcon(column.accessor) as IconDefinition}
                      />
                    )}
                  </th>
                ) : (
                  <th
                    key={index}
                    className="w-10px pe-2"
                    style={{
                      textAlign: "center",
                      width: column.width || "auto",
                    }}
                  >
                    {column.header}
                  </th>
                ),
              )}
              {statusField && idField && updateStatus && <th>Update Status</th>}
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-semibold">
            {rows.length ? (
              slicedRows(rows).map((row: any, i: number) => (
                <tr
                  key={i}
                  style={{
                    textAlign: "center",
                    cursor: linkID ? "pointer" : "default",
                  }}
                >
                  {showSL && (
                    <td>
                      {rowsPerPage && page ? page * rowsPerPage + i + 1 : i + 1}
                    </td>
                  )}
                  {columns.map((column: ColumnType, k: number) => (
                    <td key={k}>
                      {linkID ? (
                        <Link to={`${link + row[linkID]}/`}>
                          {renderCell(row, column)}
                        </Link>
                      ) : (
                        renderCell(row, column)
                      )}
                    </td>
                  ))}
                  {statusField && idField && updateStatus && (
                    <td>
                      <button
                        onClick={() => updateStatus(row[idField])}
                        className={`btn ${row[statusField] ? "btn-success" : "btn-primary"} btn-sm`}
                      >
                        {row[statusField] ? "Cancel Approval" : "Approve"}
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={showSL ? columns.length + 1 : columns.length}
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
                <div className="d-flex justify-content-end align-items-center">
                  <div className="form-inline">
                    <select
                      className="form-select form-select-sm form-select-solid"
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                  <span className="mx-2">
                    {labelDisplayedRows({
                      from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                      to: getLabelDisplayedRowsTo(),
                      count: rows.length === -1 ? -1 : count,
                    })}
                  </span>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-light btn-icon"
                      disabled={page === 0}
                      onClick={() => handleChangePage(page - 1)}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-icon"
                      disabled={
                        rows.length !== -1
                          ? page >= Math.ceil(count / rowsPerPage) - 1
                          : false
                      }
                      onClick={() => handleChangePage(page + 1)}
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
