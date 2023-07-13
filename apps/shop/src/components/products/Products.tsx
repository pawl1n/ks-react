import Product from "./Product";
import type { Product as ProductType } from "shared/types/product";
import { useEffect, useState } from "preact/hooks";
import { getAll } from "../../api/products";

let isLoading = false;

type Props = {
  categoryPath?: string;
};

const Products = ({ categoryPath }: Props) => {
  const [products, setProducts] = useState([] as ProductType[]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const params = new URLSearchParams({
    size: "5",
    page: String(page),
    ...(categoryPath && { categoryPath }),
  });

  useEffect(() => {
    getAll(params).then((res) => {
      if (page == res.data?.page?.totalPages) {
        setIsLastPage(true);
        return;
      }
      if (res.data?._embedded?.products) {
        setProducts([...products, ...res.data._embedded.products]);
      }
    });
  }, [page]);

  useEffect(() => {
    // setup infinite scroll listeners
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (isLastPage) return;
    const scrollTop = document.documentElement.scrollTop;
    const offsetHeight = document.documentElement.offsetHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= offsetHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto">
        {isLoading ? (
          "Loading..."
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {products?.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
