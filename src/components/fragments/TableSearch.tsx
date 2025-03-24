import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { CircleXIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useId, useRef, useState } from "react";

type TableSearchProps = {
  initialSearch?: string;
  onSearch: (search: string) => void;
  placeholder: string;
};

export const TableSearch = ({
  initialSearch = "",
  onSearch,
  placeholder = "",
}: TableSearchProps) => {
  const id = useId();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    const searchParam = router.query.search as string;
    if (searchParam !== undefined && searchParam !== search) {
      setSearch(searchParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.search]);

  useEffect(() => {
    if (debouncedSearch !== initialSearch) {
      onSearch(debouncedSearch);

      const newQuery: Partial<typeof router.query> = {
        ...router.query,
        search: debouncedSearch || undefined,
      };

      if (!debouncedSearch) {
        newQuery.search = undefined;
      }

      void router.push(
        {
          pathname: router.pathname,
          query: newQuery,
        },
        undefined,
        { shallow: true },
      );
    }
  }, [debouncedSearch, initialSearch, onSearch, router]);

  const handleClearInput = () => {
    setSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full">
      <Input
        id={id}
        ref={inputRef}
        className="min-w-[300px] pe-9"
        placeholder={`Cari ${placeholder} . . .`}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear input"
          onClick={handleClearInput}
        >
          <CircleXIcon size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
