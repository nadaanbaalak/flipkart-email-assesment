import { useEffect, useState } from "react";

export function usePagination(totalItems: number, itemsPerPage: number) {
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalItems,
    itemsPerPage,
    isNextDisabled: false,
    isPrevDisabled: false,
  });

  useEffect(() => {
    const maxPageNumber = Math.ceil(totalItems / itemsPerPage);
    const isNextDisabled = maxPageNumber === paginationData.currentPage;
    const isPrevDisabled = paginationData.currentPage === 1;
    setPaginationData((prev) => ({
      ...prev,
      isNextDisabled,
      isPrevDisabled,
    }));
  }, [paginationData.currentPage]);

  useEffect(() => {
    setPaginationData((prev) => ({
      ...prev,
      totalItems,
    }));
  }, [totalItems]);

  function handleNextClick() {
    const maxPageNumber = Math.ceil(totalItems / itemsPerPage);
    if (paginationData.currentPage < maxPageNumber) {
      setPaginationData((prev) => ({
        ...prev,
        currentPage: paginationData.currentPage + 1,
      }));
    }
  }

  function handlePreviousClick() {
    if (paginationData.currentPage > 1) {
      setPaginationData((prev) => ({
        ...prev,
        currentPage: paginationData.currentPage - 1,
      }));
    }
  }

  return {
    paginationData,
    handleNextClick,
    handlePreviousClick,
  };
}
