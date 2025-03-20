import { useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";

export const useSelectParams = ({
  totalData,
  itemsPerPage,
}: {
  totalData: number;
  itemsPerPage: number;
}) => {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const totalPages = Math.ceil((totalData ?? 0) / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return {
    page,
    totalPages,
    searchTerm,
    debouncedSearchTerm,
    handlePageChange,
    handleSearchChange,
    handleSearchInputClick,
  };
};
