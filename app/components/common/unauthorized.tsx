import { cssBundleHref } from "@remix-run/css-bundle";
import { LinksFunction } from "@remix-run/node";
import appStylesHref from "../../assets/style.bundle.css";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { getMediaPath } from "~/utils/helper";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];
export default function Unauthorized() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var defaultThemeMode = "light";
              var themeMode;
              if (document.documentElement) {
                if (document.documentElement.hasAttribute("data-bs-theme-mode")) {
                  themeMode = document.documentElement.getAttribute("data-bs-theme-mode");
                } else {
                  if (localStorage.getItem("data-bs-theme") !== null) {
                    themeMode = localStorage.getItem("data-bs-theme");
                  } else {
                    themeMode = defaultThemeMode;
                  }
                }
                if (themeMode === "system") {
                  themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                }
                document.documentElement.setAttribute("data-bs-theme", themeMode);
              }
            `,
          }}
        />
      </head>
      <body
        id="kt_app_body"
        data-kt-app-header-fixed-mobile="true"
        data-kt-app-toolbar-enabled="true"
        data-kt-app-sidebar-enabled="true"
        data-kt-app-sidebar-fixed="true"
        data-kt-app-sidebar-push-header="true"
        data-kt-app-sidebar-push-toolbar="true"
        className="app-default"
      >
        <>
          <body
            id="kt_body"
            className="app-blank bgi-size-cover bgi-position-center bgi-no-repeat"
          >
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
                        <Link to="/" className="">
                          <img
                            alt="AllInOne"
                            src={getMediaPath("/logos/logo.svg")}
                            className="h-40px"
                          />
                        </Link>
                      </div>

                      <h1 className="fw-bolder text-gray-900 mb-5">
                        Unauthorized!
                      </h1>

                      <div className="fw-semibold fs-6 text-gray-500 mb-8">
                        This route or page is forbidden.
                      </div>

                      <div className="mb-11">
                        <Link to="/login" className="btn btn-sm btn-primary">
                          Go to login
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
          </body>
        </>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
