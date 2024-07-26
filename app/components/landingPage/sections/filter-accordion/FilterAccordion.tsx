import { useState } from "react";
import "./filteraccordion.css";

interface FilterAccordionProps {
  title: string;
  children: React.ReactNode;
}
export default function FilterAccordion({
  title,
  children,
}: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`filter_accordion ${isOpen && 'active'}`}>
      <div className="title_box" onClick={()=> setIsOpen(!isOpen)}>
        <div className="icon_box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="7"
            viewBox="0 0 13 7"
            fill="none"
          >
            <path
              d="M11.6195 6L6.9355 1.26218C6.58991 0.912608 6.02958 0.912608 5.68398 1.26218L1 6"
              stroke="#7F7F7F"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <h2>{title}</h2>
      </div>

      <div className="content_box">{children}</div>
    </div>
  );
}
