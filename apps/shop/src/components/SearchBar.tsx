import { useState } from "preact/hooks";

type Props = {
  onSearch: (query: string) => void;
  initialValue?: string;
};

export default ({ onSearch, initialValue }: Props) => {
  const [query, setQuery] = useState(initialValue ?? "");

  const onSubmit = (event: Event) => {
    event.preventDefault();
    onSearch?.(query);
  };

  console.log(initialValue);

  return (
    <form className="max-w-sm" onSubmit={onSubmit}>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
          <title>Пошук</title>
        </svg>
        <input
          type="text"
          placeholder="Пошук"
          className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary"
          onChange={(event) => {
            setQuery(event?.target?.value);
          }}
          defaultValue={initialValue}
          value={query}
        />
      </div>
    </form>
  );
};
