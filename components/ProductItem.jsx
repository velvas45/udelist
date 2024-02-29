"use client";

import Image from "next/image";
import React from "react";
import DOMPurify from "dompurify";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import Link from "next/link";

const ProductItem = ({ product }) => {
  return (
    <Link
      href={`${product.id}`}
      className="flex items-start gap-4 relative cursor-pointer ">
      <div className="min-w-[280px]">
        <Image
          src={product.image_125_H}
          alt={product.title}
          width={280}
          height={280}
          className="object-contain object-center rounded-sm"
        />
      </div>
      <div className="flex flex-col space-y-3 flex-wrap pr-10">
        <h3 className="text-xl font-semibold">{product.title}</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.headline),
          }}></p>
        {product.visible_instructors.length > 0 && (
          <div className="flex items-center space-x-1">
            {product.visible_instructors.map((instructor, id) => (
              <span className="text-sm text-gray-400" key={id}>
                {instructor.display_name}
                {product.visible_instructors.length - 1 > id && ","}
              </span>
            ))}
          </div>
        )}
        <div className="flex space-x-1">
          <span className="font-semibold text-md">
            {Math.round(product.rating * 10) / 10}
          </span>
          <Rating
            className=" pt-[1px]"
            fractions={2}
            initialRating={product.rating}
            readonly
            emptySymbol={<FaRegStar />}
            fullSymbol={<FaStar className="fill-black" />}
          />
          <span className="text-sm pt-[0.8px]">
            ({product.num_reviews.toLocaleString("en-US")})
          </span>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <span>
            {Math.round(product.hrs_of_content_f * 10) / 10} total jam{" "}
          </span>
          <span>- {product.num_published_lectures} pelajaran</span>

          <span>- {product.instructional_level_simple}</span>
        </div>

        {/* Price */}
        <span className="text-xl !m-0 font-bold absolute right-2 top-0">
          Rp{product.price.toLocaleString("in-ID")}
        </span>
      </div>
    </Link>
  );
};

export default ProductItem;
