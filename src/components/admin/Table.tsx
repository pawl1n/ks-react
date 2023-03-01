import type { ApiEntityArrayResponse } from "../../types/Response";
import { useEffect, useState } from "preact/hooks";
import { memo } from "preact/compat";
import type { Column } from "../../types/Alps";
import { Type } from "../../types/Alps";
import get from "../../api/Get";

interface Props {
  title: string;
  columns: Column[];
  entity: string;
}

const Table = memo(({ title, columns, entity }: Props) => {
  const [data, setData] = useState<ApiEntityArrayResponse<any>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
    setLoading(true);

    get("http://localhost:8080/" + entity)
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then(setData)
      .catch((e) => {
        setErrorMessage(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="antialiased text-slate-800 h-min dark:text-slate-200">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full mx-auto shadow-lg rounded-sm border border-stone-200 dark:border-stone-700 dark:shadow-stone-700">
          <header className="px-5 py-4 border-b border-stone-100 dark:border-stone-700">
            <h2 className="font-semibold text-stone-800 dark:text-stone-50">
              {title}
            </h2>
          </header>
          <table className="table-auto w-full overflow-scroll">
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50 dark:bg-stone-900 dark:text-stone-200">
              <tr>
                {columns.map((column) => (
                  <th key={column.name} className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">{column.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-stone-100 dark:divide-stone-700">
              {loading
                ? "loading"
                : data?._embedded?.[entity]?.map((row) => (
                    <tr key={row.id} className="h-12">
                      {columns.map((column) => (
                        <td key={column} className="p-2 whitespace-nowrap">
                          {column.type === Type.SAFE && row[column.name] ? (
                            <a
                              href={
                                "/admin/" +
                                entity +
                                "/" +
                                row.id +
                                "/" +
                                column.name
                              }
                              className="text-sm text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                            >
                              {row[column.name] && row[column.name]}
                            </a>
                          ) : (
                            <div className="text-left">{row[column.name]}</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
          {errorMessage && (
            <div className="text-sm text-red-500">{errorMessage}</div>
          )}
        </div>
      </div>
    </section>
  );
});

export default Table;
