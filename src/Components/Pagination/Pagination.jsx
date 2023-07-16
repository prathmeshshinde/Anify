import React from "react";

const Pagination = ({ setPageCount, pageCount }) => {
  const nextButton = () => {
    if (pageCount === 12062) {
      alert("This is last page");
    } else {
      setPageCount(pageCount + 10);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const prevButton = () => {
    if (pageCount === 0) {
      alert("This is first page");
    } else {
      setPageCount(pageCount - 10);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const DisabledPrevNextButton = `bg-disabled-button-bg text-disabled-text-color py-2 px-4 m-2 capitalize font-medium text-base w-32 rounded-lg `;

  const PrevNextButton = `bg-header-bg text-header-red py-2 px-4 m-2 capitalize font-medium text-base w-32 rounded-lg border-2 border-solid border-red-300 hover:bg-red-300 hover:text-white hover:scale-105 duration-500`;

  return (
    <div className="flex justify-center mt-10">
      {pageCount === 0 ? (
        <button className={DisabledPrevNextButton} onClick={prevButton}>
          prev
        </button>
      ) : (
        <button className={PrevNextButton} onClick={prevButton}>
          prev
        </button>
      )}

      {pageCount === 12062 ? (
        <button className={DisabledPrevNextButton} onClick={nextButton}>
          next
        </button>
      ) : (
        <button className={PrevNextButton} onClick={nextButton}>
          next
        </button>
      )}
    </div>
  );
};

export default Pagination;
