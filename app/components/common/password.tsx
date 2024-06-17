import React, { useState, useRef, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface PasswordInputProps {
  error?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ error }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="fv-row mb-8 position-relative">
      <input
        id="password"
        ref={passwordRef}
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Password"
        name="password"
        autoComplete="new-password"
        aria-invalid={error ? true : undefined}
        aria-describedby="password-error"
        className={`form-control bg-transparent ${error ? "is-invalid" : ""}`}
      />
      <span
        className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
        onClick={togglePasswordVisibility}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
      </span>
      {error && (
        <div className="invalid-feedback" id="password-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
