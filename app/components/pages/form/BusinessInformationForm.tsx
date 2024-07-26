import { Form } from "@remix-run/react";
import { useUser } from "~/utils";

type businessInfoFormPropsType = {
  actionData: any;
  categories: any[];
  handleEditMode: () => void;
};

export default function BusinessInfoForm({
  actionData,
  categories,
  handleEditMode,
}: businessInfoFormPropsType) {
  const user = useUser();
  return (
    <Form method="post">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title pb-6">Business Information</h2>
          <div className="row">
            {/* <input type="hidden" name="user_id" value={user.id} /> */}
            <input type="hidden" name="user_id" value={user.id} />
            <input type="hidden" name="id" value={user.business?.id} />
            <div className="col-md-6 my-4 pe-6">
              <label
                htmlFor="business-name"
                className="form-label required fw-bold"
              >
                Business Name
              </label>
              <input
                type="text"
                className={`form-control form-control-solid ${actionData?.errors?.name ? "is-invalid border-danger" : ""}`}
                id="business-name"
                name="name"
                placeholder="Business name"
                autoFocus
                defaultValue={user.business?.name}
                // className={`form-control form-control-solid my-4 p mb-lg-0 ${actionData?.errors?.first_name ? "is-invalid border-danger" : ""}`}
              />
              {actionData?.errors?.name ? (
                <div className="text-danger" id="business-name-error">
                  {actionData.errors.name}
                </div>
              ) : null}
            </div>
            <div className="col-md-6 my-4 ps-6">
              <label
                htmlFor="category-id"
                className="form-label required fw-bold"
              >
                Business Category
              </label>
              <select
                className={`form-select form-select-solid form-select-lg ${actionData?.errors?.category_id ? "is-invalid border-danger" : ""}`}
                id="category-id"
                name="category_id"
                defaultValue={user.business?.category_id}
              >
                <option value="">Select a category</option>
                {categories.length &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              {actionData?.errors?.category_id ? (
                <div className="text-danger" id="business-category-error">
                  {actionData.errors.category_id}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 my-4 pe-6">
              <label
                htmlFor="business-subscription"
                className="form-label fw-bold"
              >
                Business Subscription
              </label>
              <input
                type="text"
                className="form-control form-control-solid"
                id="business-subscription"
                name="subscription"
                placeholder="Business subscription"
                defaultValue={user.business?.subscription}
              />
            </div>
            <div className="col-md-6 my-4 ps-6">
              <label
                htmlFor="business-phone"
                className="form-label required fw-bold"
              >
                Business Phone
              </label>
              <input
                type="text"
                className="form-control form-control-solid"
                id="business-phone"
                name="phone"
                placeholder="Business phone"
                defaultValue={user.business?.phone}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 my-4 pe-6">
              <label
                htmlFor="business-email"
                className="form-label required fw-bold"
              >
                Business Email
              </label>
              <input
                type="email"
                className={`form-control form-control-solid ${actionData?.errors?.email ? "is-invalid border-danger" : ""}`}
                id="business-email"
                name="email"
                placeholder="Business email"
                defaultValue={user.business?.email}
              />
              {actionData?.errors?.email ? (
                <div className="text-danger" id="business-email-error">
                  {actionData.errors.email}
                </div>
              ) : null}
            </div>
            <div className="col-md-6 my-4 ps-6">
              <label
                htmlFor="business-website_url"
                className="form-label fw-bold"
              >
                Website URL
              </label>
              <input
                type="url"
                className="form-control form-control-solid"
                id="business-website_url"
                name="website_url"
                placeholder="Website URL"
                defaultValue={user.business?.website_url}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 my-4 pe-6">
              <label htmlFor="owner_name" className="form-label fw-bold">
                Owner's Name
              </label>
              <input
                type="text"
                className="form-control form-control-solid"
                id="owner_name"
                name="owner_name"
                placeholder="Owner's name"
                defaultValue={user.business?.owner_name}
              />
            </div>
            <div className="col-md-6 my-4 ps-6">
              <label
                htmlFor="business-contact_number"
                className="form-label fw-bold"
              >
                Contact Number
              </label>
              <input
                type="text"
                className="form-control form-control-solid"
                id="business-contact_number"
                name="contact_number"
                placeholder="Contact number"
                defaultValue={user.business?.contact_number}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 my-4 pe-6">
              <label
                htmlFor="business-tax_identification_number"
                className="form-label fw-bold"
              >
                Tax Identification Number
              </label>
              <input
                type="text"
                className="form-control form-control-solid"
                id="business-tax_identification_number"
                name="tax_identification_number"
                placeholder="Tax number"
                defaultValue={user.business?.tax_identification_number}
              />
            </div>
            <div className="col-md-6 my-4 ps-6">
              <label
                htmlFor="business-operating_hours"
                className="form-label fw-bold"
              >
                Operating Hours
              </label>
              <input
                type="text"
                className="form-control form-control-solid"
                id="business-operating_hours"
                name="operating_hours"
                placeholder="Operating hours"
                defaultValue={user.business?.operating_hours}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 my-4 pe-6">
              <label
                htmlFor="business-payment_information"
                className="form-label fw-bold"
              >
                Payment Information
              </label>
              <input
                type="text"
                className="form-control form-control-solid"
                id="business-payment_information"
                name="payment_information"
                placeholder="Payment information"
                defaultValue={user.business?.payment_information}
              />
            </div>
            <div className="col-md-6 my-4 ps-6">
              <label
                htmlFor="business-post_code"
                className="form-label fw-bold"
              >
                Post Code
              </label>
              <input
                type="text"
                className="form-control form-control-solid"
                id="business-post_code"
                name="post_code"
                placeholder="Post code"
                defaultValue={user.business?.post_code}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 my-4 pe-6">
              <label htmlFor="address" className="form-label fw-bold">
                Address
              </label>
              <textarea
                className="form-control form-control-solid"
                id="address"
                name="address"
                placeholder="Business address"
                defaultValue={user.business?.address}
              />
            </div>
            <div className="col-md-6 my-4 ps-6">
              <label htmlFor="country" className="form-label fw-bold">
                Country
              </label>
              <input
                type="text"
                className="form-control form-control-solid"
                id="country"
                name="country"
                placeholder="Country name"
                defaultValue={user.business?.country}
              />
            </div>
          </div>
          {/* <div className="my-4">
            <h4 className="card-title">Social Media Links</h4>
            {formData.socialMediaLinks.map((link, index) => (
              <div key={index} className="row mb-2">
                <div className="col-md-4">
                  <select
                    className="form-select"
                    name="platform"
                    value={link.platform}
                    onChange={(e) => handleSocialMediaLinkChange(index, e)}
                  >
                    <option value="">Select Platform</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    type="url"
                    className="form-control"
                    name="url"
                    value={link.url}
                    onChange={(e) => handleSocialMediaLinkChange(index, e)}
                  />
                </div>
                <div className="col-md-2">
                  <button type="button" className="btn btn-danger" onClick={() => handleRemoveSocialMediaLink(index)}>Remove</button>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-primary" onClick={handleAddSocialMediaLink}>Add Social Media Link</button>
          </div> */}
          {/* <div className="d-flex justify-content-center mt-5">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div> */}
          <div className="card-footer d-flex justify-content-end py-6 px-9">
            <button
              onClick={handleEditMode}
              className="btn btn-light btn-active-light-primary me-2"
            >
              Discard
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="kt_account_profile_details_submit"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}
