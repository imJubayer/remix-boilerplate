import { type ActionFunction, type LoaderFunctionArgs } from "@remix-run/node";

// import { abort, useUser, hasRole } from "~/utils";
import MainLayout from "~/components/layouts/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const requiredRoles = ["admin"];
  // const user = await getUser(request);
  // if (!hasRole(user, requiredRoles)) {
  //   abort(403);
  // }
  return 1;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
};

export default function Dashboard() {
  const breadcrumbItems = [{ title: "Dashboard", link: "/dashboard" }];
  return (
    <>
      <MainLayout
        title="Account"
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
                            icon={faClock}
                            className="text-primary fs-2qx"
                          />
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Attendance
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          Great, you always attending class. keep it up
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x">73</span>
                      <span className="fw-semibold fs-2 text-gray-600 mx-1 pt-1">
                        /
                      </span>
                      <span className="text-gray-600 fw-semibold fs-2 me-3 pt-2">
                        76
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
                            icon={faClock}
                            className="text-primary fs-2qx"
                          />
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Homeworks
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          Don’t forget to turn in your task
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x">207</span>
                      <span className="fw-semibold fs-2 text-gray-600 mx-1 pt-1">
                        /
                      </span>
                      <span className="text-gray-600 fw-semibold fs-2 me-3 pt-2">
                        214
                      </span>
                      <span className="badge badge-lg badge-light-success align-self-center px-2">
                        92%
                      </span>
                    </div>
                  </div>

                  <div className="d-flex border border-gray-300 border-dashed rounded p-6 mb-6">
                    <div className="d-flex align-items-center flex-grow-1 me-2 me-sm-5">
                      <div className="symbol symbol-50px me-4">
                        <span className="symbol-label">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="text-primary fs-2qx"
                          />
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Tests
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          You take 12 subjects at this semester
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x">27</span>
                      <span className="fw-semibold fs-2 text-gray-600 mx-1 pt-1">
                        /
                      </span>
                      <span className="text-gray-600 fw-semibold fs-2 me-3 pt-2">
                        38
                      </span>
                      <span className="badge badge-lg badge-light-warning align-self-center px-2">
                        80%
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
                          <i className="ki-duotone ki-timer fs-2qx text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Attendance
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          Great, you always attending class. keep it up
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x">73</span>
                      <span className="fw-semibold fs-2 text-gray-600 mx-1 pt-1">
                        /
                      </span>
                      <span className="text-gray-600 fw-semibold fs-2 me-3 pt-2">
                        76
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
                          <i className="ki-duotone ki-element-11 fs-2qx text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                          </i>
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Homeworks
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          Don’t forget to turn in your task
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x">207</span>
                      <span className="fw-semibold fs-2 text-gray-600 mx-1 pt-1">
                        /
                      </span>
                      <span className="text-gray-600 fw-semibold fs-2 me-3 pt-2">
                        214
                      </span>
                      <span className="badge badge-lg badge-light-success align-self-center px-2">
                        92%
                      </span>
                    </div>
                  </div>

                  <div className="d-flex border border-gray-300 border-dashed rounded p-6 mb-6">
                    <div className="d-flex align-items-center flex-grow-1 me-2 me-sm-5">
                      <div className="symbol symbol-50px me-4">
                        <span className="symbol-label">
                          <i className="ki-duotone ki-abstract-24 fs-2qx text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </span>
                      </div>

                      <div className="me-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >
                          Tests
                        </a>
                        <span className="text-gray-500 fw-bold d-block fs-7">
                          You take 12 subjects at this semester
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="text-gray-900 fw-bolder fs-2x">27</span>
                      <span className="fw-semibold fs-2 text-gray-600 mx-1 pt-1">
                        /
                      </span>
                      <span className="text-gray-600 fw-semibold fs-2 me-3 pt-2">
                        38
                      </span>
                      <span className="badge badge-lg badge-light-warning align-self-center px-2">
                        80%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12 mt-5 mb-5 mb-xl-10">
          <div className="card card-flush h-xl-100">
            <div className="card-header pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold text-gray-900">
                  Delivery Stats
                </span>
                <span className="text-gray-500 mt-1 fw-semibold fs-6">
                  Users from all channels
                </span>
              </h3>

              <div className="card-toolbar">
                <ul className="nav" id="kt_chart_widget_11_tabs">
                  <li className="nav-item">
                    <a
                      className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light fw-bold px-4 me-1"
                      data-bs-toggle="tab"
                      id="kt_charts_widget_11_tab_1"
                      href="#kt_chart_widget_11_tab_content_1"
                    >
                      2020
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light fw-bold px-4 me-1"
                      data-bs-toggle="tab"
                      id="kt_charts_widget_11_tab_2"
                      href="#kt_chart_widget_11_tab_content_2"
                    >
                      2021
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light fw-bold px-4 me-1 active"
                      data-bs-toggle="tab"
                      id="kt_charts_widget_11_tab_3"
                      href="#kt_chart_widget_11_tab_content_3"
                    >
                      Month
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card-body pb-0 pt-4">
              <div className="tab-content">
                <div
                  className="tab-pane fade"
                  id="kt_chart_widget_11_tab_content_1"
                  role="tabpanel"
                >
                  <div className="mb-2">
                    <span className="fs-2hx fw-bold d-block text-gray-800 me-2 mb-2 lh-1 ls-n2">
                      1,349
                    </span>

                    <span className="fs-6 fw-semibold text-gray-500">
                      Avarage cost per iteraction
                    </span>
                  </div>

                  <div
                    id="kt_charts_widget_11_chart_1"
                    className="ms-n5 me-n3 min-h-auto w-100"
                    style={{ height: "300px" }}
                  ></div>
                </div>

                <div
                  className="tab-pane fade"
                  id="kt_chart_widget_11_tab_content_2"
                  role="tabpanel"
                >
                  <div className="mb-2">
                    <span className="fs-2hx fw-bold d-block text-gray-800 me-2 mb-2 lh-1 ls-n2">
                      3,492
                    </span>

                    <span className="fs-6 fw-semibold text-gray-500">
                      Avarage cost per iteraction
                    </span>
                  </div>

                  <div
                    id="kt_charts_widget_11_chart_2"
                    className="ms-n5 me-n3 min-h-auto"
                    style={{ height: "300px" }}
                  ></div>
                </div>

                <div
                  className="tab-pane fade active show"
                  id="kt_chart_widget_11_tab_content_3"
                  role="tabpanel"
                >
                  <div className="mb-2">
                    <span className="fs-2hx fw-bold d-block text-gray-800 me-2 mb-2 lh-1 ls-n2">
                      4,796
                    </span>

                    <span className="fs-6 fw-semibold text-gray-500">
                      Deliveries in 30 Days
                    </span>
                  </div>

                  <div
                    id="kt_charts_widget_11_chart_3"
                    className="ms-n5 me-n3 min-h-auto"
                    style={{ height: "300px" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
