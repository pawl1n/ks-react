import type { ApiEntityArrayResponse } from "../../types/Response";
import { useEffect, useState } from "preact/hooks";
import { memo } from "preact/compat";
import get from "../../api/Get";

export interface Column {
  name: string;
  field: string;
}

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

    get("http://localhost:8080/api/" + entity)
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
                  <th key={column.field} className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">{column.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-stone-100 dark:divide-stone-700">
              {loading
                ? "loading"
                : data?._embedded?.[entity]?.map((row) => (
                    <tr
                      key={row.id}
                      className="h-12 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-700"
                      onClick={() => {
                        window.location.href = `/admin/${entity}/${row.id}`;
                      }}
                    >
                      {columns.map((column) => (
                        <td key={column} className="p-2 whitespace-nowrap">
                          {row._links[column.field] && row[column.field] ? (
                            <a
                              href={
                                "/admin/" +
                                entity +
                                "/" +
                                row.id +
                                "/" +
                                column.field
                              }
                              className="text-sm text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                            >
                              {row[column.field] && row[column.field]}
                            </a>
                          ) : (
                            <div className="text-left">
                              {row[column.field] && row[column.field]}
                            </div>
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
