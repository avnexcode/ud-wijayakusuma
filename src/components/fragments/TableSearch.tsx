import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const router = useRouter();
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

  return (
    <Input
      placeholder={`Cari ${placeholder} . . .`}
      className="min-w-[300px]"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
