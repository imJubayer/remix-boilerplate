import {
  faMagnifyingGlass,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "@remix-run/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import BasicDataTable from "~/components/table/BasicDatatable";

import userService from "~/services/userService";
import { handleSuccessToast, hasPermission, useUser } from "~/utils";
import { userColumns } from "~/utils/columns/userColumn";
import { showConfirmationAlert } from "~/utils/helper";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { users, total } = await userService.fetchUsers(request);
  return json({ users, total });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = await userService.removeUser(request);
  return json(result);
};

export default function Users() {
  const user = useUser();
  const submit = useSubmit();
  const navigate = useNavigate();
  const { users, total } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const nagigateToRoute = () => {
    navigate(`?page=${page + 1}&limit=${rowsPerPage}&search=${search}`);
  };

  useEffect(() => {
    if (shouldNavigate) {
      nagigateToRoute();
    }
  }, [page, rowsPerPage, shouldNavigate]);

  // Debounced version of getUsers
  const debouncedGetUsers = debounce(nagigateToRoute, 300);

  useEffect(() => {
    if (shouldNavigate) {
      debouncedGetUsers();
      return () => debouncedGetUsers.cancel();
    }
  }, [search]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setShouldNavigate(true);
  };

  const handleRowPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setPage(0);
    setShouldNavigate(true);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(0);
    setShouldNavigate(true);
  };

  const handleUserDelete = async (userId: string) => {
    const isDeletionConfirmed = await showConfirmationAlert(
      "Are you sure?",
      "Delete this user?",
      "Yes, delete!",
      "Cancel",
    );

    if (isDeletionConfirmed) {
      const formData = new FormData();
      formData.append("userId", userId);
      submit(formData, { method: "post" });
    }
  };

  useEffect(() => {
    if (actionData?.success) {
      handleSuccessToast(actionData.msg);
    }
  }, [actionData]);

  const addUserButton = (
    <Link to="add" type="button" className="btn btn-light-primary">
      <FontAwesomeIcon icon={faPlusSquare} className="px-2" />
      Add User
    </Link>
  );

  const filter = (
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
        value={search}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );

  return (
    <div>
      <BasicDataTable
        filter={filter}
        secondary={hasPermission(user, ["add-user"]) && addUserButton}
        columns={userColumns(handleUserDelete)}
        rows={users}
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={handlePageChange}
        setRowsPerPage={handleRowPerPageChange}
        showSL={true}
        serverSide
        // sortables={["role"]}
        // updateRows={(data) => setRows(data)}
      />
    </div>
  );
}
