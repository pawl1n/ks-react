import { useQuery } from "react-query";
import { getProducts, ProductType } from "../api/Products";
import Product from "../components/Product";
import Hero from "../components/Hero";

const Home = () => {
  const { data } = useQuery<ProductType[]>("products", getProducts, {
    initialData: [],
  });

  const filteredProducts: ProductType[] = data!.filter((product) =>
    product.category.includes("clothing")
  );

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {filteredProducts.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
