import { ApiArrayResponse, ApiResponseEntity } from 'shared/types/response';
import { Sort, SortDirection, SortKey } from 'shared/types/pageable';
import { useState } from 'react';
import CardBoxModal from '../CardBoxModal';
import BaseButtons from '../BaseButtons';
import BaseButton from '../BaseButton';
import { mdiArrowDownBold, mdiArrowUpBold, mdiEye, mdiTrashCan } from '@mdi/js';
import BaseIcon from '../BaseIcon';
import Router from 'next/router';
import Link from 'next/link';
import { NestedItemsProps } from '../../types/request';

type Props<T extends ApiResponseEntity, P extends ApiResponseEntity> = {
  columns: Array<{
    key: SortKey<T>;
    label: string;
  }>;
  useGetAll: (props: NestedItemsProps<T, P>) => {
    data?: ApiArrayResponse<T>;
  };
  dataKey: string;

  parentEntity: P;

  deleteItem?: (entity: T) => void;
};

type SortInfo<T extends ApiResponseEntity> =
  | {
      key: SortKey<T>;
      direction?: SortDirection;
    }
  | undefined;

function NestedTable<T extends ApiResponseEntity, P extends ApiResponseEntity>({
  columns,
  useGetAll,
  deleteItem,
  dataKey,
  parentEntity,
}: Props<T, P>) {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;
  const [sortInfo, setSortInfo] = useState<SortInfo<T>>(undefined);

  const { data } = useGetAll({
    pageable: {
      page: currentPage,
      size: perPage,
      sort:
        sortInfo &&
        (`${String(sortInfo.key)},${sortInfo.direction}` as Sort<T>),
    },
    parent: parentEntity,
  });

  const items = data?._embedded?.[dataKey] ?? [];

  const numPages = data?.page?.totalPages ?? 0;

  const pagesList = [];

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const [isModalTrashActive, setIsModalTrashActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleModalAction = () => {
    setIsModalTrashActive(false);
  };

  const handleDelete = () => {
    if (!selectedItem || !deleteItem) {
      return;
    }

    deleteItem(selectedItem);

    setIsModalTrashActive(false);
    setSelectedItem(null);
  };

  const handleStartDelete = (item: T) => {
    setSelectedItem(item);
    setIsModalTrashActive(true);
  };

  const handleHeaderClick = (col: SortKey<T>) => {
    if (col === sortInfo?.key) {
      if (sortInfo.direction === SortDirection.DESC) {
        setSortInfo(undefined);
      } else {
        setSortInfo({ key: sortInfo.key, direction: SortDirection.DESC });
      }
    } else {
      setSortInfo({
        key: col,
        direction: SortDirection.ASC,
      });
    }
  };

  return (
    <>
      <CardBoxModal
        title="Ви впевнені?"
        buttonColor="danger"
        buttonLabel="Підтвердити"
        isActive={isModalTrashActive}
        onConfirm={handleDelete}
        onCancel={handleModalAction}
      >
        <p>Ви підтверджуєте видалення?</p>
      </CardBoxModal>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                onClick={() => {
                  handleHeaderClick(col.key);
                }}
                className="cursor-pointer lg:hover:bg-gray-100 lg:dark:hover:bg-slate-700/70"
              >
                {col.label}{' '}
                {sortInfo?.key === col.key && (
                  <BaseIcon
                    path={
                      sortInfo?.direction === SortDirection.ASC
                        ? mdiArrowUpBold
                        : mdiArrowDownBold
                    }
                  />
                )}
              </th>
            ))}
            {deleteItem && <th />}
          </tr>
        </thead>
        <tbody>
          {items.map((item: T) => (
            <tr key={item.id}>
              {columns.map((col) =>
                typeof item[col.key as keyof T] === 'object' ? (
                  <td key={col.key as string} data-label={col.label}>
                    {(((item[col.key as keyof T] as any)['name'] ??
                      (item[col.key as keyof T] as any)['id']) as string) ?? ''}
                  </td>
                ) : (
                  <td key={col.key as string} data-label={col.label}>
                    {(item[col.key as keyof T] as string) ?? ''}
                  </td>
                ),
              )}
              {deleteItem && (
                <td className="whitespace-nowrap before:hidden lg:w-1">
                  <BaseButtons type="justify-start lg:justify-end" noWrap>
                    <Link href={`${Router.asPath}/${item.id}`}>
                      <BaseIcon path={mdiEye} />
                    </Link>
                    <BaseButton
                      color="danger"
                      icon={mdiTrashCan}
                      onClick={() => handleStartDelete(item)}
                      small
                    />
                  </BaseButtons>
                </td>
              )}
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
            Сторінка {currentPage + 1} із {numPages}
          </small>
        </div>
      </div>
    </>
  );
}

export default NestedTable;
