"use client";

import React from "react";
import ProductItem from "./ProductItem";
import { Separator } from "@radix-ui/react-separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn, formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

const ProductList = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onNavigate = (value) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value,
    });
    router.push(newUrl);
  };

  return (
    <div className="flex flex-col gap-4">
      {data.products.map((product, id) => (
        <div key={product.id}>
          <ProductItem product={product} />
          {id < data.products.length - 1 && (
            <Separator className=" bg-pastel-primary h-1" />
          )}
        </div>
      ))}
      <Pagination className="text-center mx-auto">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              className={cn(
                data.pagination.currentPage <= 1 &&
                  "pointer-events-none opacity-50"
              )}
              onClick={() => onNavigate(data.pagination.currentPage - 1)}>
              <PaginationPrevious
                href=""
                aria-disabled={data.pagination.currentPage <= 1}
              />
            </Button>
          </PaginationItem>
          {Array.from({ length: data.pagination.totalPages }, (_, index) => (
            <PaginationItem>
              <Button
                variant="ghost"
                className={cn(
                  index + 1 === data.pagination.currentPage &&
                    "bg-pastel-primary hover:bg-pastel-secondary pointer-events-none"
                )}
                onClick={() => onNavigate(index + 1)}>
                <PaginationLink href="">{index + 1}</PaginationLink>
              </Button>
            </PaginationItem>
          ))}
          <PaginationItem>
            <Button
              variant="ghost"
              className={cn(
                data.pagination.currentPage >= data.pagination.totalPages &&
                  "pointer-events-none opacity-50"
              )}
              onClick={() => onNavigate(data.pagination.currentPage + 1)}>
              <PaginationNext
                href=""
                aria-disabled={
                  data.pagination.currentPage >= data.pagination.totalPages
                }
              />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductList;
