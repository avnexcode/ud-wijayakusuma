import { type BadgeVariants } from "@/components/ui/badge";
import { type OrderCategory, type OrderStatus } from "@prisma/client";

export const getStatusColor = (status: OrderStatus) => {
  const colors: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-500",
    SUCCESS: "bg-green-500",
  };
  return colors[status];
};

export const getStatusLabel = (status: OrderStatus) => {
  const labels: Record<OrderStatus, string> = {
    PENDING: "Menunggu",
    SUCCESS: "Selesai",
  };
  return labels[status];
};

export const getCategoryBadge = (category: OrderCategory): BadgeVariants => {
  const badges: Record<OrderCategory, string> = {
    RETAIL: "default",
    WHOLESALE: "secondary",
  };
  return badges[category] as BadgeVariants;
};

export const getCategoryLabel = (category: OrderCategory) => {
  const labels: Record<OrderCategory, string> = {
    RETAIL: "Eceran",
    WHOLESALE: "Grosir",
  };
  return labels[category];
};
