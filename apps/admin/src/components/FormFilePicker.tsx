import React, { useState } from 'react';
import { ColorButtonKey } from 'types/style';
import BaseButton from './BaseButton';

type Props = {
  label?: string;
  icon?: string;
  accept?: string;
  color: ColorButtonKey;
  isRoundIcon?: boolean;
  handleChange?: (e: File) => void;
};

const FormFilePicker = ({
  label,
  icon,
  accept,
  color,
  isRoundIcon,
  handleChange,
}: Props) => {
  const [file, setFile] = useState(null as File | null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      handleChange && handleChange(file);
    }
  };

  const showFilename = !isRoundIcon && file;

  return (
    <div className="flex items-stretch justify-start relative">
      <label className="inline-flex">
        <BaseButton
          className={`${isRoundIcon ? 'w-12 h-12' : ''} ${
            showFilename ? 'rounded-r-none' : ''
          }`}
          iconSize={isRoundIcon ? 24 : undefined}
          label={isRoundIcon ? '' : label}
          icon={icon}
          color={color}
          roundedFull={isRoundIcon}
          asAnchor
        />
        <input
          type="file"
          className="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"
          onChange={handleFileChange}
          accept={accept}
        />
      </label>
      {showFilename && (
        <div className="px-4 py-2 max-w-full flex-grow-0 overflow-x-hidden bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r">
          <span className="text-ellipsis max-w-full line-clamp-1">
            {file.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default FormFilePicker;
