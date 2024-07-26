import { IUser } from "~/types/authentication";

type ProfileDetailsType = {
  user: IUser;
};

export default function ProfileDetails({ user }: ProfileDetailsType) {
  return (
    <div className="card-body border-top p-9">
      <div className="row mb-7">
        <label className="col-lg-4 fw-semibold text-muted">Full Name</label>
        <div className="col-lg-8">
          <span className="fw-bold fs-6 text-gray-800">
            {`${user.profile?.first_name} ${user.profile?.last_name}`}
          </span>
        </div>
      </div>
      <div className="row mb-7">
        <label className="col-lg-4 fw-semibold text-muted">Role</label>
        <div className="col-lg-8 fv-row">
          <span className="badge badge-success">
            {user.role.name.toUpperCase()}
          </span>
          {/* <span className="fw-semibold text-primary fs-6">
            {user.role.name.toUpperCase()}
          </span> */}
        </div>
      </div>
      <div className="row mb-7">
        <label className="col-lg-4 fw-semibold text-muted">Contact Phone</label>
        <div className="col-lg-8 d-flex align-items-center">
          <span className="fw-bold fs-6 text-gray-800 me-2">
            {user.profile?.phone || "N/A"}
          </span>
          {/* <span className="badge badge-success">Verified</span> */}
        </div>
      </div>
      <div className="row mb-7">
        <label className="col-lg-4 fw-semibold text-muted">Address</label>
        <div className="col-lg-8 d-flex align-items-center">
          <span className="fw-bold fs-6 text-gray-800 me-2">
            {user.profile?.address || "N/A"}
          </span>
        </div>
      </div>
      <div className="row mb-7">
        <label className="col-lg-4 fw-semibold text-muted">Gender</label>
        <div className="col-lg-8">
          <span className="fw-bold fs-6 text-gray-800">
            {user.profile?.gender || "N/A"}
          </span>
        </div>
      </div>
      <div className="row mb-7">
        <label className="col-lg-4 fw-semibold text-muted">Age</label>
        <div className="col-lg-8">
          <span className="fw-bold fs-6 text-gray-800">
            {user.profile?.age || "N/A"}
          </span>
        </div>
      </div>
      {user.business && (
        <>
          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">Business</label>
            <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800">
                {user.business.name}
              </span>
            </div>
          </div>
          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">
              Website URL
            </label>
            <div className="col-lg-8">
              <a
                href="#"
                className="fw-semibold fs-6 text-gray-800 text-hover-primary"
              >
                {user.business.website_url}
              </a>
            </div>
          </div>
        </>
      )}

      {/* <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6">
        <i className="ki-duotone ki-information fs-2tx text-warning me-4">
          <span className="path1"></span>
          <span className="path2"></span>
          <span className="path3"></span>
        </i>
        <div className="d-flex flex-stack flex-grow-1">
          <div className="fw-semibold">
            <h4 className="text-gray-900 fw-bold">We need your attention!</h4>
            <div className="fs-6 text-gray-700">
              Your payment was declined. To start using tools, please
              <a className="fw-bold" href="account/billing.html">
                Add Payment Method
              </a>
              .
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
