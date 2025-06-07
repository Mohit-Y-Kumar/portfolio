import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

function Progress({ className, value, ...props }) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "w-full h-2 rounded-full bg-gray-200 overflow-hidden",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-black transition-all duration-500"
        style={{ width: `${value || 0}%` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
