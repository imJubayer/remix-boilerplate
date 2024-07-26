import { Link } from "@remix-run/react";

export default function Forbidden() {
  return (
    <div
      className="d-flex flex-column flex-root"
      id="kt_app_root"
      style={{ backgroundImage: `url(assets/media/auth/bg3.jpg)` }}
    >
      {/* <style>body { background-image: url('assets/media/auth/bg3.jpg'); } [data-bs-theme="dark"] body { background-image: url('assets/media/auth/bg3-dark.jpg'); }</style> */}

      <div className="d-flex flex-column flex-center flex-column-fluid">
        <div className="d-flex flex-column flex-center text-center p-10">
          <div className="card card-flush w-lg-650px py-5">
            <div className="card-body py-15 py-lg-20">
              <div className="mb-14">
                <a href="index.html" className="">
                  <img
                    alt="Logo"
                    src="assets/media/logos/custom-2.svg"
                    className="h-40px"
                  />
                </a>
              </div>

              <h1 className="fw-bolder text-gray-900 mb-5">Forbidden!</h1>

              <div className="fw-semibold fs-6 text-gray-500 mb-8">
                This route or page is forbidden. Contact with the admin.
              </div>

              <div className="mb-11">
                <Link to="/dashboard" className="btn btn-sm btn-primary">
                  Go to homepage
                </Link>
              </div>

              <div className="mb-0">
                <img
                  src="assets/media/auth/membership.png"
                  className="mw-100 mh-300px theme-light-show"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
