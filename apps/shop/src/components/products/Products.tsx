import { useEffect, useState } from "preact/hooks";
import type { Product as ProductType } from "shared/types/product";
import { getAll } from "../../api/products";
import SearchBar from "../SearchBar";
import Product from "./Product";

type Props = {
  categoryPath?: string;
  query?: string;
};

const Products = ({ categoryPath, query }: Props) => {
  const [products, setProducts] = useState([] as ProductType[]);
  const [isLastPage, setIsLastPage] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [params, setParams] = useState({
    size: "5",
    page: 0,
    q: query,
    ...(categoryPath && { categoryPath }),
  });

  useEffect(() => {
    setIsLoading(true);
    getAll(new URLSearchParams(params)).then((res) => {
      if (params.page === res.data?.page?.totalPages) {
        setIsLastPage(true);
      }
      setProducts(res.data?._embedded?.products ?? []);
      setIsLoading(false);
    });
  }, [params]);

  useEffect(() => {
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

    if (scrollTop + clientHeight >= offsetHeight && !isLastPage) {
      setParams({
        ...params,
        page: params.page + 1,
      });
    }
  };

  const onSearch = (query: string) => {
    window.location.href = `/products?q=${query}`;
  };

  return (
    <div>
      <div className="container mx-auto">
        <SearchBar onSearch={onSearch} initialValue={query} />
      </div>
      <section className="py-16">
        <div className="container mx-auto">
          {isLoading ? (
            <p>Завантаження...</p>
          ) : products.length === 0 ? (
            <p>Нічого не знайдено</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {products?.map((product) => {
                return <Product key={product.id} product={product} />;
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
