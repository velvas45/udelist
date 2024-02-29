"use client";

import { filters } from "@/constant/filter";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { formUrlQuery } from "@/lib/utils";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

const Filtering = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onFilter = ({ type, value }) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: type,
      value,
    });
    router.push(newUrl);
  };
  return (
    <>
      <h1 className="font-bold text-lg underline underline-offset-8">Filter</h1>
      <Accordion type="single" collapsible className="mt-4">
        {filters.map((filter, idx) => (
          <AccordionItem value={filter.title} key={idx}>
            <AccordionTrigger>
              <span className="font-semibold text-lg capitalize">
                {filter.title}
              </span>
            </AccordionTrigger>
            {filter.value.map((item, idx) => (
              <AccordionContent key={idx}>
                <Button
                  className="font-medium capitalize bg-transparent text-black hover:bg-transparent hover:underline"
                  onClick={() => onFilter({ type: filter.title, value: item })}>
                  {filter.title === "rating" ? (
                    <div className="flex items-center space-x-2">
                      <Rating
                        fractions={2}
                        initialRating={item}
                        readonly
                        emptySymbol={<FaRegStar />}
                        fullSymbol={<FaStar className=" fill-yellow-300" />}
                      />
                      <span className="p-0 font-normal">{item} ke atas</span>
                    </div>
                  ) : (
                    item
                  )}
                </Button>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Filtering;
