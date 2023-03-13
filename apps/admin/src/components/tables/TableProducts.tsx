import { mdiEye, mdiTrashCan } from '@mdi/js';
import { useState } from 'react';
import Product from 'interfaces/Product';
import BaseButton from 'components/BaseButton';
import BaseButtons from 'components/BaseButtons';
import CardBoxModal from 'components/CardBoxModal';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../services/products';
import { Pageable, Sort } from '../../interfaces';

const TableProducts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;
  const [sort, setSort] = useState<Sort<Product>>(undefined);

  const { data } = useGetProductsQuery({
    page: currentPage,
    size: perPage,
    sort: sort,
  } as Pageable<Product>);

  setSort('id');

  const [deleteProduct] = useDeleteProductMutation();

  const productsPaginated = data?._embedded?.products ?? [];

  const numPages = data?.page?.totalPages ?? 0;

  const pagesList = [];

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
  };

  const handleDelete = () => {
    if (!selectedProduct) {
      return;
    }

    deleteProduct(selectedProduct);
    setSelectedProduct(null);
    setIsModalTrashActive(false);
  };

  const deleteItem = (href: string) => {
    setSelectedProduct(href);
    setIsModalTrashActive(true);
  };

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>This is sample modal</p>
      </CardBoxModal>
      <CardBoxModal
        title="Ви впевнені?"
        buttonColor="danger"
        buttonLabel="Підтвердити"
        isActive={isModalTrashActive}
        onConfirm={handleDelete}
        onCancel={handleModalAction}
      >
        <p>Ви впевнені що бажаєте видалити продукт?</p>
      </CardBoxModal>
      <table>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Опис</th>
            <th>Категорія</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {productsPaginated?.map((product: Product) => (
            <tr key={product.id}>
              <td data-label="Назва">{product.name}</td>
              <td data-label="Опис">{product.description}</td>
              <td data-label="Категорія">{product.category}</td>
              <td className="whitespace-nowrap before:hidden lg:w-1">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color="info"
                    icon={mdiEye}
                    onClick={() => setIsModalInfoActive(true)}
                    small
                  />
                  <BaseButton
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => deleteItem(product._links.self.href)}
                    small
                  />
                </BaseButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-gray-100 p-3 dark:border-slate-800 lg:px-6">
        <div className="flex flex-col items-center justify-between py-3 md:flex-row md:py-0">
          <BaseButtons>
            {pagesList?.map((page) => (
              <BaseButton
                key={page}
                active={page === currentPage}
                label={(page + 1).toString()}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </BaseButtons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  );
};

export default TableProducts;
