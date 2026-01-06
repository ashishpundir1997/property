"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const pageNumbers = React.useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [page, totalPages]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
        size="sm"
      >
        ← Previous
      </Button>

      {pageNumbers.map((pageNum) => (
        <Button
          key={pageNum}
          variant={pageNum === page ? "default" : "outline"}
          onClick={() => onPageChange(pageNum)}
          size="sm"
          className="min-w-10"
        >
          {pageNum}
        </Button>
      ))}

      <Button
        variant="outline"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        size="sm"
      >
        Next →
      </Button>

      <div className="text-sm text-slate-600 ml-4">
        Page {page} of {totalPages} ({total} total)
      </div>
    </div>
  );
}
