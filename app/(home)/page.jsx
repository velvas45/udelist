import Filtering from "@/components/Filtering";
import ProductList from "@/components/ProductList";

export const metadata = {
  title: "Udelist - List Class",
  description:
    "Udelist adalah platform pembelajaran dan pengajaran online dengan 100.000+ kursus dan 1 juta peserta. Belajar pemrograman, pemasaran, ilmu data, dan banyak lagi.",
};

export default async function Home({ _, searchParams }) {
  const page = searchParams?.page || 1;
  const price = searchParams?.price || "asc";
  const rating = searchParams?.rating || 0;

  const res = await fetch(
    `https://udelist.vercel.app/api/products?page=${page}&price=${price}${
      rating ? `&rating=${rating}` : ""
    }`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="px-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products Learning</h1>
        <h3 className="text font-semibold">
          {data.data.pagination.totalData} Data
        </h3>
      </div>

      <section className="mt-10 flex items-start space-x-4">
        <div className="min-w-[250px]">
          <Filtering />
        </div>
        <ProductList data={data.data} />
      </section>
    </main>
  );
}
