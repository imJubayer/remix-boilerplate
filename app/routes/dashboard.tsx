import { json, type LoaderFunctionArgs } from "@remix-run/node";
import MainLayout from "~/components/layouts/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faClock,
  faHandshake,
  faSuitcase,
  faUser,
  faUserAlt,
  faUserAstronaut,
  faUserGroup,
  faUserPlus,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { dashboardService } from "~/services/dashboard.service";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = await dashboardService.dashboard();
  const data = response.data;
  return json(data);
};

export default function Dashboard() {
  const breadcrumbItems = [{ title: "Dashboard", link: "/dashboard" }];
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <MainLayout
        title="Dashboard"
        breadCrumb={breadcrumbItems}
        headerTitle="Dashboard"
      >
        <div className="d-flex flex-wrap flex-md-nowrap">
          <div className="me-5">
            <div className="card">
              <div className="card-body py-4">
                <div className="me-md-5 w-100">
                  <div className="d-flex border border-gray-300 border-dashed rounded p-6 mb-6">
                    <div className="d-flex align-items-center flex-grow-1 me-2 me-sm-5">
                      <div className="symbol symbol-50px me-4">
                        <span className="symbol-label">
                          <FontAwesomeIcon
                            icon={faUserGroup}
                            className="text-primary fs-2qx"
                          />
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Total Users
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          Count of users system has.
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x me-3 ">
                        {data?.totalUsers}
                      </span>
                      <span className="badge badge-lg badge-light-success align-self-center px-2">
                        95%
                      </span>
                    </div>
                  </div>

                  <div className="d-flex border border-gray-300 border-dashed rounded p-6 mb-6">
                    <div className="d-flex align-items-center flex-grow-1 me-2 me-sm-5">
                      <div className="symbol symbol-50px me-4">
                        <span className="symbol-label">
                          <FontAwesomeIcon
                            icon={faUserTie}
                            className="text-primary fs-2qx"
                          />
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Business Users
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          Total business users
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x me-3 ">
                        {data?.totalBusinessUsers}
                      </span>
                      <span className="badge badge-lg badge-light-success align-self-center px-2">
                        95%
                      </span>
                    </div>
                  </div>

                  <div className="d-flex border border-gray-300 border-dashed rounded p-6 mb-6">
                    <div className="d-flex align-items-center flex-grow-1 me-2 me-sm-5">
                      <div className="symbol symbol-50px me-4">
                        <span className="symbol-label">
                          <FontAwesomeIcon
                            icon={faBox}
                            className="text-primary fs-2qx"
                          />
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Products
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          Total products
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x me-3 ">
                        120
                      </span>
                      <span className="badge badge-lg badge-light-success align-self-center px-2">
                        95%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ms-5">
            <div className="card">
              <div className="card-body py-4">
                <div className="me-md-5 w-100">
                  <div className="d-flex border border-gray-300 border-dashed rounded p-6 mb-6">
                    <div className="d-flex align-items-center flex-grow-1 me-2 me-sm-5">
                      <div className="symbol symbol-50px me-4">
                        <span className="symbol-label">
                          <FontAwesomeIcon
                            icon={faUserPlus}
                            className="text-primary fs-2qx"
                          />
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Total Lead
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          Leaders shows here
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x me-3 ">
                        20
                      </span>
                      <span className="badge badge-lg badge-light-success align-self-center px-2">
                        95%
                      </span>
                    </div>
                  </div>

                  <div className="d-flex border border-gray-300 border-dashed rounded p-6 mb-6">
                    <div className="d-flex align-items-center flex-grow-1 me-2 me-sm-5">
                      <div className="symbol symbol-50px me-4">
                        <span className="symbol-label">
                          <FontAwesomeIcon
                            icon={faHandshake}
                            className="text-primary fs-2qx"
                          />
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Deal
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          Don’t forget to turn in your task
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x me-3 ">
                        321
                      </span>
                      <span className="badge badge-lg badge-light-success align-self-center px-2">
                        95%
                      </span>
                    </div>
                  </div>

                  <div className="d-flex border border-gray-300 border-dashed rounded p-6 mb-6">
                    <div className="d-flex align-items-center flex-grow-1 me-2 me-sm-5">
                      <div className="symbol symbol-50px me-4">
                        <span className="symbol-label">
                          <FontAwesomeIcon
                            icon={faUserAstronaut}
                            className="text-primary fs-2qx"
                          />
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Total Trade Leads
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          You take 12 subjects
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x me-3 ">
                        40
                      </span>
                      <span className="badge badge-lg badge-light-success align-self-center px-2">
                        95%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
