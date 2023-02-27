export const getProducts = async () => {
  const products = await fetch("https://fakestoreapi.com/products");
  return products.json();
};

// const ProductContext = () => {
//     const [product, setProduct] = useState(null);
//
//     return ();
// }
//
// export default ProductContext;
