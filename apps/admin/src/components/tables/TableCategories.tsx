import { mdiEye, mdiTrashCan } from '@mdi/js';
import { useState } from 'react';
import Category from 'interfaces/Category';
import BaseButton from 'components/BaseButton';
import BaseButtons from 'components/BaseButtons';
import CardBoxModal from 'components/CardBoxModal';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '../../services/categories';

const TableCategories = () => {
  const { data } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const perPage = 5;

  const [currentPage, setCurrentPage] = useState(0);

  const categoriesPaginated = data?.slice(
    perPage * currentPage,
    perPage * (currentPage + 1),
  );

  const numPages = data ? Math.ceil(data.length / perPage) : 0;

  const pagesList = [];

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
  };

  const handleDelete = () => {
    if (!selectedCategory) {
      return;
    }

    deleteCategory(selectedCategory);
    setSelectedCategory(null);
    setIsModalTrashActive(false);
  };

  const deleteItem = (href: string) => {
    setSelectedCategory(href);
    setIsModalTrashActive(true);
    handleDelete();
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
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
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
        <p>Ви впевнені що бажаєте видалити категорію?</p>
      </CardBoxModal>
      <table>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Батьківська категорія</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {categoriesPaginated?.map((category: Category) => (
            <tr key={category.id}>
              <td data-label="Назва">{category.name}</td>
              <td data-label="Батьтківська категорія">
                {category.parentCategory}
              </td>
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
                    onClick={() => deleteItem(category._links.self.href)}
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

export default TableCategories;
