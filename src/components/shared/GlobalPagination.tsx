"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  page: number;
  totalPages: number;
  limit: number;
};

export default function GlobalPagination({
  page,
  totalPages,
  limit,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 👉 PAGE CHANGE
  const handlePageChange = (type: "next" | "prev") => {
    const params = new URLSearchParams(searchParams.toString());

    let newPage = page;

    if (type === "next" && page < totalPages) {
      newPage = page + 1;
    }

    if (type === "prev" && page > 1) {
      newPage = page - 1;
    }

    params.set("page", String(newPage));

    router.push(`?${params.toString()}`);
  };

  // 👉 LIMIT CHANGE
  const handleLimitChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", value);
    params.set("page", "1"); // reset page

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {/* LIMIT */}
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">
          Rows per page
        </FieldLabel>

        <Select
          value={String(limit)}
          onValueChange={handleLimitChange}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>

          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      {/* PAGINATION */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange("prev")}
              className={
                page === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          <span className="px-3 text-sm text-muted-foreground">
            Page {page} / {totalPages}
          </span>

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange("next")}
              className={
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}