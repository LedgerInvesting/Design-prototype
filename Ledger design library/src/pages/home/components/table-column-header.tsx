import { cn } from "@/lib/utils";
import { SortAsc } from "lucide-react";
import type * as React from "react";

interface TableColumnHeaderProps {
  title: string;
  isSorted?: boolean;
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
  className?: string;
  icon?: React.ReactNode;
  leftPadding?: string;
  backgroundColor?: string;
  isActionsColumn?: boolean;
  borderColor?: string;
  disabled?: boolean;
}

export function TableColumnHeader({
  title,
  onSort,
  className,
  icon,
  leftPadding = "pl-[14px]",
  backgroundColor = "bg-white",
  isActionsColumn = false,
  borderColor,
  disabled = false,
}: TableColumnHeaderProps) {
  const isDisabled = disabled || !onSort;

  return (
    <button
      className={cn(
        "group flex h-9 w-full cursor-default items-center justify-between self-stretch py-[9px] transition-colors hover:text-gray-800",
        backgroundColor,
        leftPadding,
        "pr-[14px]",
        className
      )}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onSort}
      style={
        isActionsColumn
          ? {
              boxShadow: `rgba(0, 0, 0, 0.03) -10px 0px 20px -1px, ${borderColor || "var(--table-border-color, var(--border))"} 1px 0px 0px 0px, ${borderColor || "var(--table-border-color, var(--border))"} 1px 0px 0px 0px inset`,
            }
          : undefined
      }
      type="button"
    >
      <div className="flex items-center gap-2">
        {icon ? (
          <div className="flex h-[13.696px] w-3 shrink-0 items-center justify-center text-yellow-450">
            {icon}
          </div>
        ) : (
          <svg
            aria-hidden
            className="h-[13.696px] w-3 text-yellow-450"
            viewBox="0 0 20 20"
          >
            <title>Column icon</title>
            <path
              d="M4 4h12v2H4V4Zm0 5h12v2H4V9Zm0 5h12v2H4v-2Z"
              fill="currentColor"
            />
          </svg>
        )}
        <span className="font-bold font-serif text-[12px] text-gray-500 italic leading-[130%] tracking-[-0.5px] group-hover:text-gray-800">
          {title}
        </span>
      </div>
      {!isActionsColumn && title.toLowerCase() !== "actions" && (
        <div className={cn("flex items-center", isDisabled && "opacity-50")}>
          <SortAsc className="h-2.5 w-1.75 text-gray-500 group-hover:text-gray-800 group-disabled:text-gray-400" />
        </div>
      )}
    </button>
  );
}
