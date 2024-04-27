import { type Dispatch, type SetStateAction, useState } from "react";
import FormField from "./FormField";
import OverlayLayer from "./OverlayLayer";

type Props = {
  values: ListValue[];
  selectedValues: number[];
  onChange: Dispatch<SetStateAction<number[]>>;
};

export type ListValue = {
  id: number;
  name: string;
};

const Multiselect = ({ values, selectedValues, onChange }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onSelectedChange = (value: number[]) => {
    onChange(value);
  };

  const removeItem = (value: number) => {
    onSelectedChange(selectedValues.filter((item) => item !== value));
  };

  const addItem = (value: ListValue) => {
    onSelectedChange([...selectedValues, value.id]);
  };

  const filteredValues = values.filter(
    (value) =>
      value.name.toLowerCase().includes(searchText.toLowerCase()) &&
      !selectedValues?.some((selectedValue) => selectedValue === value.id),
  );

  return (
    <div className="flex flex-col items-center relative overflow-visible mt-5">
      <div className="w-full">
        <div className="my-2 p-1 flex border border-gray-700 bg-primary rounded">
          <div className="flex flex-auto flex-wrap">
            {selectedValues?.map((value) => (
              <div
                key={`selected_${value}`}
                className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-primary rounded-full border border-blue-600 "
              >
                <div className="text-xs font-normal leading-none max-w-full flex-initial">
                  {values.find((item) => item.id === value)?.name}
                </div>
                <div className="flex flex-auto flex-row-reverse">
                  <button type="button" onClick={() => removeItem(value)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x cursor-pointer rounded-full w-4 h-4 ml-2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <title>Видалити</title>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="flex-1">
              <FormField>
                <input
                  placeholder=""
                  className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full border-none"
                  type="text"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (filteredValues?.length > 0) {
                        addItem(filteredValues[0]);
                      }
                    }
                  }}
                />
              </FormField>
            </div>
          </div>
          <div className="w-8 py-1 pl-2 pr-1 flex items-center">
            <button
              type="button"
              className="cursor-pointer w-6 h-6 outline-none focus:outline-none text-gray-400"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-up w-4 h-4"
              >
                {isDropdownOpen ? (
                  <polyline points="18 15 12 9 6 15" />
                ) : (
                  <polyline points="6 9 12 15 18 9" />
                )}
                <title>{isDropdownOpen ? "Згорнути" : "Розгорнути"}</title>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className=" top-16 bg-primary z-40 w-full rounded">
        {isDropdownOpen &&
          filteredValues?.map((value) => (
            <button
              key={value.id}
              type="button"
              className="text-start cursor-pointer w-full hover:dark:bg-gray-600 hover:bg-gray-200 z-40 h-10 px-2"
              onClick={() => addItem(value)}
            >
              <div>{value.name}</div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default Multiselect;
