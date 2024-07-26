import React from "react";
import { Toaster } from "react-hot-toast";
import { getMediaPath } from "~/utils/helper";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="d-flex flex-column flex-root"
      id="kt_app_root"
      style={{ backgroundImage: `url(assets/media/auth/bg9-dark.jpg)` }}
    >
      {/* <style>body { background-image: url('assets/media/auth/bg4.jpg'); } [data-bs-theme="dark"] body { background-image: url('assets/media/auth/bg4-dark.jpg'); }</style> */}

      <div className="d-flex flex-column flex-column-fluid flex-lg-row">
        <div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
          <div className="d-flex flex-center flex-lg-start flex-column">
            <a href="index.html" className="mb-7">
              {/* <h1 className="text-white">AllinOne</h1> */}
              {/* <img alt="Logo" src="assets/media/logos/custom-3.svg" /> */}
              <img
                alt="AllinOne"
                src={getMediaPath("/logos/logo-gold.svg")}
                className="h-60px theme-light-show"
              />
            </a>

            <h2 className="text-white fw-normal m-0">
              Branding tools designed for your business
            </h2>
          </div>
        </div>

        <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
          <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20">
            <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
              {children}
            </div>
          </div>
        </div>
        <div id="toaster">
          <Toaster
            toastOptions={{
              position: "top-right",
              success: {
                style: {
                  background: "green",
                  color: "white",
                },
              },
              error: {
                style: {
                  background: "red",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
