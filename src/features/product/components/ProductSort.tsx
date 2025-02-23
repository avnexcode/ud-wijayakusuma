import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ProductSortParams = "name" | "created_at";
export type ProductOrderParams = "asc" | "desc";

type ProductSortProps = {
  currentSort?: string;
  currentOrder?: string;
  onSortChange: (sort: ProductSortParams) => void;
  onOrderChange: (order: ProductOrderParams) => void;
};

export const ProductSort = ({
  currentSort = "created_at",
  currentOrder = "desc",
  onSortChange,
  onOrderChange,
}: ProductSortProps) => {
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
      <SelectItem value="asc">(Lama - Baru)</SelectItem>
      <SelectItem value="desc">(Baru - Lama)</SelectItem>
    </SelectContent>
  );
};
