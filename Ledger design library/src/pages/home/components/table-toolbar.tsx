import { ChevronLeft } from "@/components/icons/chevron-left";
import { ChevronRight } from "@/components/icons/chevron-right";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";

const TRAILING_S_REGEX = /s$/;

// Composition-based component props
export interface TableToolbarTitleProps {
  children: React.ReactNode;
}

export interface TableToolbarSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export interface TableToolbarPaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize?: number;
  label?: string;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface TableToolbarProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Title component
export function TableToolbarTitle({ children }: TableToolbarTitleProps) {
  return (
    <h2 className="font-medium text-[19px] text-gray-900 leading-[120%] tracking-[-0.5px]">
      {children}
    </h2>
  );
}

// Search component
export function TableToolbarSearch({
  value,
  onChange,
  placeholder = "Search...",
  className: customClassName,
  disabled = false,
}: TableToolbarSearchProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        "h-[35px] w-[217px]",
        "px-[11px] py-1",
        "rounded-full border border-transparent",
        "transition-[width,border-radius,background-color,border-color,box-shadow] duration-500 ease-in-out",
        "focus-within:w-[334px] focus-within:rounded-[400px] focus-within:shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]",
        "hover:rounded-[400px] hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]",
        disabled && "pointer-events-none opacity-50",
        customClassName
      )}
    >
      <SearchIcon className="size-4 shrink-0 text-gray-900" />
      <Input
        className={cn(
          "h-auto p-0",
          "rounded-none border-0",
          "bg-transparent shadow-none outline-none",
          "font-medium text-[12px] text-gray-900 leading-[130%] tracking-normal",
          "placeholder:font-medium placeholder:text-[12px] placeholder:text-gray-500 placeholder:leading-[130%] placeholder:tracking-normal",
          "focus:shadow-none focus:outline-none focus:placeholder:text-gray-900",
          "focus-visible:ring-0 focus-visible:ring-offset-0"
        )}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

// Pagination component
export function TableToolbarPagination({
  currentPage,
  totalCount,
  pageSize = 20,
  label,
  onPreviousPage,
  onNextPage,
  hasNextPage = false,
  hasPreviousPage = false,
}: TableToolbarPaginationProps) {
  if (totalCount === 0) {
    return null;
  }

  const startItem = totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <>
      <div className="hidden items-center overflow-hidden text-ellipsis font-bold font-serif text-[12px] text-gray-700 italic leading-[130%] tracking-[-0.5px] md:flex">
        {startItem} to {endItem} of {totalCount}
        {label
          ? ` ${totalCount === 1 ? label.replace(TRAILING_S_REGEX, "") : label}`
          : ""}
      </div>

      <div className="flex items-center gap-4">
        <button
          className="flex h-3 w-3 items-center justify-center transition-colors duration-200 disabled:opacity-50"
          disabled={!hasPreviousPage}
          onClick={onPreviousPage}
          type="button"
        >
          <ChevronLeft className="size-4 text-gray-900" />
        </button>

        <button
          className="flex h-3 w-3 items-center justify-center transition-colors duration-200 disabled:opacity-50"
          disabled={!hasNextPage}
          onClick={onNextPage}
          type="button"
        >
          <ChevronRight className="size-4 text-gray-900" />
        </button>
      </div>
    </>
  );
}

// Main Toolbar component
export function TableToolbar({
  children,
  className,
  style,
}: TableToolbarProps) {
  // Separate children by type for proper positioning
  let titleChild: React.ReactNode = null;
  let searchChild: React.ReactNode = null;
  let paginationChild: React.ReactNode = null;
  const otherChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      otherChildren.push(child);
      return;
    }

    // Check by display name since function identity may not work after bundling
    const displayName = (child.type as { displayName?: string })?.displayName;

    if (displayName === "TableToolbarTitle") {
      titleChild = child;
    } else if (displayName === "TableToolbarSearch") {
      searchChild = child;
    } else if (displayName === "TableToolbarPagination") {
      paginationChild = child;
    } else {
      otherChildren.push(child);
    }
  });

  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between self-stretch rounded-t-xl border-t border-r border-l bg-white px-[20px] py-[14px] lg:h-20 lg:flex-row lg:items-center",
        className
      )}
      style={style}
    >
      {/* Left section: Title and Search */}
      <div className="order-2 flex w-full flex-col gap-4 lg:order-0 lg:w-auto lg:flex-row lg:items-center">
        {titleChild}
        {searchChild}
      </div>

      {/* Right section: Custom content and Pagination */}
      <div className="order-1 flex w-full items-center justify-end gap-5 lg:order-0 lg:w-auto lg:justify-start">
        {otherChildren}
        {paginationChild}
      </div>
    </div>
  );
}

TableToolbarTitle.displayName = "TableToolbarTitle";
TableToolbarSearch.displayName = "TableToolbarSearch";
TableToolbarPagination.displayName = "TableToolbarPagination";
