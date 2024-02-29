import { listItems } from "@/constant/list";
import { NextResponse } from "next/server";

function getDataForPage(pageNumber, pageSize, items) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return items.slice(startIndex, endIndex);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = +searchParams.get("page") || 1;
  const price = searchParams.get("price") || "asc";
  const rating = +searchParams.get("rating") || null;
  const pageSize = 5;
  let datas = listItems;

  if (rating)
    datas = datas.filter((data) => Math.round(data.rating * 10) / 10 >= rating);

  if (price === "asc") {
    datas.sort((a, b) => a.price - b.price);
  } else {
    datas.sort((a, b) => b.price - a.price);
  }

  const dataCurrentPage = getDataForPage(page, pageSize, datas);
  const totalData = datas.length;
  const totalPages = Math.ceil(totalData / pageSize);

  return NextResponse.json({
    data: {
      products: dataCurrentPage,
      pagination: {
        currentPage: page,
        totalData,
        totalPages,
      },
    },
  });
}
