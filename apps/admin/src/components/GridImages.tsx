import React, { useState } from 'react';
import { useDeleteImageMutation, useGetImagesQuery } from '../services/images';
import Image from 'next/image';
import CardBox from './CardBox';
import BaseButtons from './BaseButtons';
import BaseButton from './BaseButton';
import { mdiTrashCan } from '@mdi/js';
import CardBoxModal from './CardBoxModal';
import ImageType from 'interfaces/Image';

type Props = {
  onImageClick?: (image: ImageType) => void;
};
const GridImages = ({ onImageClick }: Props) => {
  const { data } = useGetImagesQuery();
  const [deleteImage] = useDeleteImageMutation();

  const perPage = 5;

  const [currentPage, setCurrentPage] = useState(0);

  const imagesPaginated = data?.slice(
    perPage * currentPage,
    perPage * (currentPage + 1),
  );

  const numPages = data ? Math.ceil(data.length / perPage) : 0;

  const pagesList = [];

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const [isModalTrashActive, setIsModalTrashActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleModalAction = () => {
    setIsModalTrashActive(false);
  };
  const handleDelete = () => {
    if (!selectedImage) {
      return;
    }

    deleteImage(selectedImage);
    setSelectedImage(null);
    setIsModalTrashActive(false);
  };

  const deleteItem = (href: string) => {
    setSelectedImage(href);
    setIsModalTrashActive(true);
  };

  const isSelected = (image: ImageType) => {
    console.log(selectedImage === image._links.self.href);
    return selectedImage === image._links.self.href;
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
        <p>Ви впевнені що бажаєте видалити продукт?</p>
      </CardBoxModal>
      <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
      >
        {imagesPaginated?.map((image) => (
          <CardBox
            key={image.id}
            onClick={() => {
              if (onImageClick) {
                console.log('select');
                setSelectedImage(image._links.self.href);
                onImageClick(image);
              }
            }}
            className={`${onImageClick && 'cursor-pointer'} ${
              isSelected(image) && '!bg-gray-200'
            }`}
          >
            <div className="relative h-[150px] m-2">
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <p>{image.name}</p>
                <p>{image.description}</p>
              </div>
              <BaseButtons className="">
                <BaseButton
                  color="danger"
                  icon={mdiTrashCan}
                  onClick={() => {
                    deleteItem(image._links.self.href);
                  }}
                  small
                />
              </BaseButtons>
            </div>
          </CardBox>
        ))}
      </div>
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

export default GridImages;
