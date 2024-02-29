import DetailPage from "@/components/pages/Detail.page";
import React from "react";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id;

  // fetch data
  const product = await fetch(`http://localhost:3000/api/products/${id}`).then(
    (res) => res.json()
  );

  return {
    title: `Udelist - Class ${product.data.product.title}`,
    description:
      "Udelist adalah platform pembelajaran dan pengajaran online dengan 100.000+ kursus dan 1 juta peserta. Belajar pemrograman, pemasaran, ilmu data, dan banyak lagi.",
  };
}

const Page = async ({ params }) => {
  const id = params.id;
  const res = await fetch(`https://udelist.vercel.app/api/products/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return (
    <div className="grid">
      <DetailPage product={data.data.product} />
    </div>
  );
};

export default Page;
