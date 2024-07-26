import { IUser } from "~/types/authentication";

type BusinessInformation = {
  user: IUser;
  editProfileMode: boolean;
  handleEditMode: () => void;
};

export default function BusinessInformation({
  user,
  editProfileMode,
  handleEditMode,
}: BusinessInformation) {
  return (
    <div className="card">
      <div className="card-header border-0 cursor-pointer" role="button">
        <div className="card-title m-0">
          <h3 className="fw-bold m-0">Business Information</h3>
        </div>
        {!editProfileMode && (
          <button
            onClick={handleEditMode}
            className="btn btn-sm btn-primary align-self-center"
          >
            Edit Information
          </button>
        )}
      </div>
      <div className="card-body border-top p-9">
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">
            Business Name
          </label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user.business?.name}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">
            Business Category
          </label>
          <div className="col-lg-8 fv-row">
            <span className="badge badge-success">
              {user.business?.category?.name}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">
            Subscription
          </label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user.business?.subscription || "N/A"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">
            Business Phone
          </label>
          <div className="col-lg-8 d-flex align-items-center">
            <span className="fw-bold fs-6 text-gray-800 me-2">
              {user.business?.phone || "N/A"}
            </span>
            {/* <span className="badge badge-success">Verified</span> */}
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">Email</label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user.business?.email || "N/A"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">Website URL</label>
          <div className="col-lg-8">
            <a
              href="#"
              className="fw-semibold fs-6 text-gray-800 text-hover-primary"
            >
              {user.business?.website_url || "N/A"}
            </a>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">
            Owner's Name
          </label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user.business?.owner_name || "N/A"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">
            Contact Number
          </label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user.business?.contact_number || "N/A"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">
            Tax Identification Number
          </label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user.business?.tax_identification_number || "N/A"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">
            Operating Hours
          </label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user.business?.operating_hours || "N/A"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">
            Payment Information
          </label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user.business?.payment_information || "N/A"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">Post Code</label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user.business?.post_code || "N/A"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">Address</label>
          <div className="col-lg-8 d-flex align-items-center">
            <span className="fw-bold fs-6 text-gray-800 me-2">
              {user.business?.address || "N/A"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">Country</label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user.business?.country || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
