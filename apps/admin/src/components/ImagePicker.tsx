import CardBoxModal from "./CardBoxModal";
import { useState } from "react";
import type { Image } from "types/request";
import GridImages from "./GridImages";
import BaseButton from "./BaseButton";
import { mdiImage } from "@mdi/js";
import { useAppDispatch } from "../stores/hooks";
import { addToast } from "../stores/toastSlice";
import { ToastType } from "types/toast";

type Props = {
  selectImage: (image: Image | null) => void;
};

const ImagePicker = ({ selectImage }: Props) => {
  const [selectedImage, setSelectedImage] = useState(null as Image | null);
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useAppDispatch();

  const handleSelectImage = () => {
    if (!selectedImage) {
      dispatch(
        addToast({
          toast: {
            type: ToastType.danger,
            message: "Зображення не обрано",
          },
        }),
      );
      return;
    }

    selectImage(selectedImage);
    setIsModalActive(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <CardBoxModal
        title="Вибір зображення"
        isActive={isModalActive}
        onConfirm={handleSelectImage}
        onCancel={() => setIsModalActive(false)}
        buttonColor="info"
        buttonLabel="Вибрати"
        fullWidth
      >
        <GridImages onImageClick={setSelectedImage} />
      </CardBoxModal>
      <BaseButton
        icon={mdiImage}
        color="info"
        label="Вибрати зображення"
        onClick={() => {
          setIsModalActive(true);
        }}
      />
    </div>
  );
};

export default ImagePicker;
