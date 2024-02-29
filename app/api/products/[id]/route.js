import { listItems } from "@/constant/list";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const id = context?.params?.id || undefined;
  console.log(id);
  if (!id) {
    return NextResponse.json({
      data: {
        product: null,
      },
    });
  }

  const data = listItems.find((item) => {
    return item.id.toString() === id.toString();
  });

  if (!data) {
    return NextResponse.json({
      data: {
        product: null,
      },
    });
  }

  return NextResponse.json({
    data: {
      product: data,
    },
  });
}
