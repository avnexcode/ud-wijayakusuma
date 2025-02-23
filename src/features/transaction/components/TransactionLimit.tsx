import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionLimitProps {
  currentLimit: number;
  onLimitChange: (limit: number) => void;
}

export const TransactionLimit = ({
  currentLimit,
  onLimitChange,
}: TransactionLimitProps) => {
  return (
    <Select
      value={currentLimit.toString()}
      onValueChange={(value) => onLimitChange(Number(value))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Transactions per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="15">Limit 15</SelectItem>
        <SelectItem value="30">Limit 30</SelectItem>
        <SelectItem value="50">Limit 50</SelectItem>
      </SelectContent>
    </Select>
  );
};
