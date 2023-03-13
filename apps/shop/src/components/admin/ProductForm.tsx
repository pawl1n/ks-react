import InputGroup from "./InputGroup";

const ProductForm = () => {
  return (
    <div className="flex flex-col bg-white w-full p-5 sm:p-10 gap-8 rounded-md">
      <InputGroup name="name" label="Назва" />
      <InputGroup name="description" label="Опис" />
    </div>
  );
};

export default ProductForm;
