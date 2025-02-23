import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryLimitProps {
  currentLimit: number;
  onLimitChange: (limit: number) => void;
}

export const CategoryLimit = ({
  currentLimit,
  onLimitChange,
}: CategoryLimitProps) => {
  return (
    <Select
      value={currentLimit.toString()}
      onValueChange={(value) => onLimitChange(Number(value))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Categorys per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="15">Limit 15</SelectItem>
        <SelectItem value="30">Limit 30</SelectItem>
        <SelectItem value="50">Limit 50</SelectItem>
      </SelectContent>
    </Select>
  );
};
