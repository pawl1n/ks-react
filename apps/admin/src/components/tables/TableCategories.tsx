import { mdiEye, mdiTrashCan } from '@mdi/js';
import { useState } from 'react';
import { useCategories } from 'hooks/sampleData';
import { Category } from 'interfaces';
import BaseButton from 'components/BaseButton';
import BaseButtons from 'components/BaseButtons';
import CardBoxModal from 'components/CardBoxModal';
import UserAvatar from 'components/UserAvatar';

const TableCategories = () => {
  const { data } = useCategories();

  const perPage = 5;

  const [currentPage, setCurrentPage] = useState(0);

  const categoriesPaginated = data.slice(
    perPage * currentPage,
    perPage * (currentPage + 1),
  );

  const numPages = data.length / perPage;

  const pagesList = [];

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);

  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
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
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>
      <table>
        <thead>
          <tr>
            <th />
            <th>Назва</th>
            <th>Опис</th>
            <th>Категорія</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {categoriesPaginated?.map((category: Category) => (
            <tr key={category.id}>
              <td className="border-b-0 before:hidden lg:w-6">
                <UserAvatar
                  username={category.name}
                  className="mx-auto h-24 w-24 lg:h-6 lg:w-6"
                />
              </td>
              <td data-label="Назва">{category.name}</td>
              <td data-label="Категорія">{category.parentCategory?.name}</td>
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
                    onClick={() => setIsModalTrashActive(true)}
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
