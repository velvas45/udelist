"use client";
import { addItem, removeItem } from "@/redux/features/whistlist.slice";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";

const DetailPage = ({ product }) => {
  const isProductInWhistlist = useSelector(
    (state) => state.whistlistReducer.whistlist
  )?.find((item) => item?.id === product.id);
  const dispatch = useDispatch();

  return (
    <section className="relative flex flex-col space-y-2 xl:block xl:space-y-0">
      {/* Top Section */}
      <div className="bg-[#2d2f31] w-full min-h-[400px] py-12 grid xl:grid-cols-3 grid-cols-1">
        <div className="xl:px-48 px-12 mx-auto flex flex-col space-y-3 text-white col-span-2">
          <h3 className="text-3xl font-bold mt-6">{product.title}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.headline),
            }}></p>
          {product.visible_instructors.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-md">Dibuat oleh: </span>
              {product.visible_instructors.map((instructor, id) => (
                <span
                  className="text-sm text-pastel-four underline cursor-pointer"
                  key={id}>
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
              className="pt-[1px]"
              fractions={2}
              initialRating={product.rating}
              readonly
              emptySymbol={<FaRegStar />}
              fullSymbol={<FaStar className=" fill-yellow-300" />}
            />
            <span className="text-sm pt-[0.8px]">
              {product.num_reviews > 0
                ? `(${product.num_reviews.toLocaleString("en-US")})`
                : "No Review Yet."}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <span>
              {Math.round(product.hrs_of_content_f * 10) / 10} total jam{" "}
            </span>
            <span>- {product.num_published_lectures} pelajaran</span>

            <span>- {product.instructional_level_simple}</span>
          </div>
        </div>
      </div>
      <div className="py-8 xl:px-48 px-12 grid grid-cols-1 xl:grid-cols-2">
        <div className="border border-slate-500 p-8 flex flex-col space-y-4 rounded-lg">
          <h4 className="text-2xl font-bold">Pelajaran Yang Didapatkan:</h4>
          <ul className="list-none flex flex-col space-y-4">
            {product.objectives_summary.map((item, idx) => (
              <li key={idx} className="text-md font-medium">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center xl:absolute right-32 top-16 min-w-1/4 h-full text-white z-10 order-first">
        <div className="border border-white flex justify-center">
          <Image
            src={product.image_480x270}
            alt="img"
            width={400}
            height={300}
            className="object-cover object-center"
          />
        </div>
        <div className="bg-white w-full border border-none text-slate-800 py-6 px-10 relative">
          <span className="text-2xl font-bold">
            Rp{product.price.toLocaleString("in-ID")}
          </span>

          {isProductInWhistlist ? (
            <IoMdHeart
              className="absolute top-2 right-3 w-5 h-5 cursor-pointer fill-red-700"
              onClick={() => dispatch(removeItem({ id: product.id }))}
            />
          ) : (
            <IoMdHeartEmpty
              className="absolute top-2 right-3 w-5 h-5 cursor-pointer"
              onClick={() => dispatch(addItem({ data: product }))}
            />
          )}

          <div className="flex flex-col space-y-2 mt-2">
            {/* <button className="bg-pastel-primary text-slate-700 px-4 h-12 border-none text-md font-semibold">
              Tambahkan ke whislist
            </button> */}
            <button className="bg-[#A435F0] text-white px-4 h-12 border-none text-md font-semibold cursor-not-allowed">
              Tambahkan ke keranjang
            </button>
            <button className="bg-transparent text-black px-4 h-12  text-md font-semibold border border-black cursor-not-allowed">
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
