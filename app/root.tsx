import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import appStylesHref from "./assets/style.bundle.css";
import custom from "./assets/custom.css";
import Forbidden from "./components/common/forbidden";
import Unauthorized from "./components/common/unauthorized";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
  { rel: "stylesheet", href: custom },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  return json({ user: user });
};

export default function App() {
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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (error instanceof Error) {
    // console.log(error);
    // return <Unauthorized />;
    return <div>An unexpected error occurred here: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 403) {
    return <Forbidden />;
  }

  if (error.status === 404) {
    return <div>404 page</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
