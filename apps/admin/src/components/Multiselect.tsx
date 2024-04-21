import { type Dispatch, type SetStateAction, useState } from "react";

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
    <div className="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto">
      <div className="w-full px-4">
        <div className="flex flex-col items-center relative">
          <div className="w-full ">
            <div className="my-2 p-1 flex border border-gray-200 bg-primary rounded">
              <div className="flex flex-auto flex-wrap">
                {selectedValues?.map((value) => (
                  <div
                    key={`selected_${value}`}
                    className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-primary rounded-full text-blue-600 border border-blue-600 "
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
                          className="feather feather-x cursor-pointer hover:text-blue-600 rounded-full w-4 h-4 ml-2"
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
                  <input
                    placeholder=""
                    className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800 border-none"
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
                </div>
              </div>
              <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                <button
                  type="button"
                  className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
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
                    <polyline points="18 15 12 9 6 15" />
                    <title>Відкрити</title>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="absolute top-100 bg-primary z-40 w-full lef-0 rounded max-h-select overflow-y-auto" />
          {filteredValues?.map((value) => (
            <button
              key={value.id}
              type="button"
              className="cursor-pointer w-full hover:bg-teal-100"
              onClick={() => addItem(value)}
            >
              <div className="flex w-full items-center p-2 pl-2 relative border-teal-600">
                <div className="w-full items-center flex">
                  <div className="mx-2 leading-6">{value.name}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Multiselect;
