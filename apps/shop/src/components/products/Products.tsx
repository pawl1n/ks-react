import Product from "./Product";
import type ProductType from "../../types/Product";
import { useEffect, useState } from "preact/hooks";
import { getAll } from "../../api/Get";

let isLoading = false;

const Products = () => {
  const [products, setProducts] = useState([] as ProductType[]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const params = new URLSearchParams({
    size: "5",
    page: String(page),
  });

  useEffect(() => {
    getAll<ProductType>("products", params).then((data) => {
      if (!data?._embedded?.products) {
        setIsLastPage(true);
        return;
      }
      setProducts([...products, ...data._embedded.products]);
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
