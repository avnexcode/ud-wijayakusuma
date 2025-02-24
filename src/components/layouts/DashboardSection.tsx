import { cn } from "@/lib/utils";
import { Heading } from "../ui/heading";
import { forwardRef } from "react";

type DashboardSectionProps = {
  title: string;
  description?: string;
  sectionClassName?: string;
};

export const DashboardSection = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & DashboardSectionProps
>(({ children, className, sectionClassName, ...props }, ref) => {
  const formattedDescription = props.description
    ?.split(".")
    .map((text, index) => (
      <span key={index} className="block">
        {text.trim()}
      </span>
    ));

  return (
    <section className={cn(sectionClassName)}>
      <header className="mb-20 space-y-3">
        <Heading size={"h3"}>{props.title}</Heading>
        {props.description && (
          <p className="text-base text-muted-foreground">
            {formattedDescription}
          </p>
        )}
      </header>
      <main ref={ref} className={cn("flex flex-col", className)}>
        {children}
      </main>
    </section>
  );
});

DashboardSection.displayName = "DashboardSection";
