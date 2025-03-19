import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { HeadMetaData, Header, Footer } from "../elements";

type PageContainerProps = {
  withHeader?: boolean;
  withFooter?: boolean;
  title?: string;
};

export const PageContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PageContainerProps
>(
  (
    { className, children, withHeader = false, withFooter = false, ...props },
    ref,
  ) => {
    return (
      <div className="h-full w-full">
        <HeadMetaData title={props.title} />
        {withHeader && <Header />}
        <main ref={ref} className={cn("flex flex-col", className)} {...props}>
          {children}
        </main>
        {withFooter && <Footer />}
      </div>
    );
  },
);

PageContainer.displayName = "PageContainer";
