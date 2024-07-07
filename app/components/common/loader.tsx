// components/Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="spinner spinner-primary" role="status"></div>
    </div>
  );
};

export default Loader;
