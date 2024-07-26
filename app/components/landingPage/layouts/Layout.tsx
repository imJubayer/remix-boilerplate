import React, { ReactElement } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import BackToTop from "./BackToTop";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="main_content">{children}</div>
      <div id="toaster">
        <Toaster
          toastOptions={{
            duration: 4000,
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
      <Footer />
      <BackToTop />
    </>
  );
}
