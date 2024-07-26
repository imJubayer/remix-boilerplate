import React, { useEffect } from "react";

export default function BackToTop() {
  useEffect(() => {
    const progressPath = document.querySelector(
      ".progress_wrap path",
    ) as SVGPathElement;
    if (progressPath) {
      const pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.webkitTransition =
        "none";
      progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
      progressPath.style.strokeDashoffset = `${pathLength}`;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.webkitTransition =
        "stroke-dashoffset 10ms linear";

      const updateProgress = () => {
        const scroll = window.scrollY;
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = `${progress}`;
      };

      updateProgress();
      window.addEventListener("scroll", updateProgress);

      const handleScroll = () => {
        const progressWrap = document.querySelector(".progress_wrap");
        if (progressWrap) {
          if (window.scrollY > 50) {
            progressWrap.classList.add("active-progress");
          } else {
            progressWrap.classList.remove("active-progress");
          }
        }
      };

      window.addEventListener("scroll", handleScroll);

      const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };

      const progressWrap = document.querySelector(".progress_wrap");
      if (progressWrap) {
        progressWrap.addEventListener("click", handleClick as EventListener);
      }

      // Cleanup event listeners on component unmount
      return () => {
        window.removeEventListener("scroll", updateProgress);
        window.removeEventListener("scroll", handleScroll);
        if (progressWrap) {
          progressWrap.removeEventListener(
            "click",
            handleClick as EventListener,
          );
        }
      };
    }
  }, []);
  return (
    <div className="progress_wrap">
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
      <svg
        className="chev"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
      </svg>
    </div>
  );
}
