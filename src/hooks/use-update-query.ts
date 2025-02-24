import { useRouter } from "next/router";

export const useUpdateQuery = <
  SortParams extends string = string,
  OrderParams extends string = string,
>() => {
  const router = useRouter();

  const queryParams = {
    search: router.query.search as string,
    page: Number(router.query.page) || 1,
    sort: (router.query.sort as SortParams) || undefined,
    order: (router.query.order as OrderParams) || undefined,
    limit: Number(router.query.limit) || 15,
  };

  const handleUpdateQuery = (newParams: Partial<typeof queryParams>) => {
    void router.push(
      {
        href: router.asPath,
        pathname: router.pathname,
        query: {
          ...router.query,
          ...newParams,
        },
      },
      undefined,
      { scroll: false },
    );
  };
  return { queryParams, handleUpdateQuery };
};
