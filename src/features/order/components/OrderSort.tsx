import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type OrderSortParams = "label" | "created_at";
export type OrderOrderParams = "asc" | "desc";

type OrderSortProps = {
  currentSort?: string;
  currentOrder?: string;
  onSortChange: (sort: OrderSortParams) => void;
  onOrderChange: (order: OrderOrderParams) => void;
};

export const OrderSort = ({
  currentSort = "created_at",
  currentOrder = "desc",
  onSortChange,
  onOrderChange,
}: OrderSortProps) => {
  return (
    <div className="flex gap-2">
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="label">Label</SelectItem>
          <SelectItem value="created_at">Dibuat</SelectItem>
        </SelectContent>
      </Select>

      <Select value={currentOrder} onValueChange={onOrderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort Order" />
        </SelectTrigger>
        {currentSort === "label" && <SelectSortText />}
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
