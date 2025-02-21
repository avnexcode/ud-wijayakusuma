import { icons } from "lucide-react";

type IconProps = {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  className?: string;
};

export const Icon = ({ name, color, size = 40, className }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} className={className} />;
};
