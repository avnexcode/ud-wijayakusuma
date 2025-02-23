import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CustomerSortParams = "name" | "created_at";
export type CustomerOrderParams = "asc" | "desc";

type CustomerSortProps = {
  currentSort?: string;
  currentOrder?: string;
  onSortChange: (sort: CustomerSortParams) => void;
  onOrderChange: (order: CustomerOrderParams) => void;
};

export const CustomerSort = ({
  currentSort = "created_at",
  currentOrder = "desc",
  onSortChange,
  onOrderChange,
}: CustomerSortProps) => {
  return (
    <div className="flex gap-2">
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Nama</SelectItem>
          <SelectItem value="created_at">Dibuat</SelectItem>
        </SelectContent>
      </Select>

      <Select value={currentOrder} onValueChange={onOrderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort Order" />
        </SelectTrigger>
        {currentSort === "name" && <SelectSortText />}
        {currentSort === "created_at" && <SelectSortDate />}
      </Select>
    </div>
  );
};

export const SelectSortText = () => {
  return (
    <SelectContent>
      <SelectItem value="asc">(A - Z)</SelectItem>
      <SelectItem value="desc">(Z - A)</SelectItem>
    </SelectContent>
  );
};

export const SelectSortNumber = () => {
  return (
    <SelectContent>
      <SelectItem value="asc">(0 - 9)</SelectItem>
      <SelectItem value="desc">(9 - 0)</SelectItem>
    </SelectContent>
  );
};

export const SelectSortDate = () => {
  return (
    <SelectContent>
      <SelectItem value="asc">(old - new)</SelectItem>
      <SelectItem value="desc">(new - old)</SelectItem>
    </SelectContent>
  );
};
