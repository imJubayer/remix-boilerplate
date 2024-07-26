import React from "react";

interface ModalProps{
    isActive: boolean;
    close: ()=>void;
    children: React.ReactNode;
}
export default function Modal({isActive, children, close}: ModalProps) {
  return (
    <div className={`modal ${isActive && 'active'}`}>
      <div className="modal_inner">
        <div className="top_bar">
          <h2 className="title">Learn about All IN ONE</h2>

          <button className="close" onClick={()=>close()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{fill: "#000"}}
            >
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </button>
        </div>

        <div className="modal_content">
          {children}
        </div>
      </div>
    </div>
  );
}
