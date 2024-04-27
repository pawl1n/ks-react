import type { User } from "shared/types/user";
import { getMe } from "../api/userApi";
import { useEffect, useState } from "preact/hooks";
import UserLinks from "./UserLinks";
import { getUserOrders } from "../api/ordersApi";
import type { Order } from "shared/types/order";

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState([] as Order[]);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState([] as number[]);

  const [params] = useState(
    new URLSearchParams({
      size: "5",
      page: String(page),
      sort: "id,desc",
    }),
  );
  useEffect(() => {
    getMe().then((res) => {
      if (res.data) {
        setUser(res.data);
      } else {
        window.location.href = "/login";
      }
    });
  }, []);

  useEffect(() => {
    getUserOrders(params).then((res) => {
      setOrders(res.data?._embedded?.orders ?? []);
      setTotalPages(res.data?.page?.totalPages ?? 0);
    });
  }, [params]);

  useEffect(() => {
    const newPages: number[] = [];
    for (
      let i = Math.max(0, page - 4);
      i < Math.min(totalPages, page + 4);
      i++
    ) {
      newPages.push(i);
    }
    setPages(newPages);
  }, [totalPages, page]);

  if (!user) {
    return <></>;
  }

  return (
    <>
      <div className="mt-10 lg:mx-auto">
        <div className="md:grid md:grid-cols-3 md:gap-6 max-w-screen-lg">
          <UserLinks />
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Сума
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Статус
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Опис
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.totalPrice}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.currentStatus}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              {pages.map((number, _) => {
                return (
                  <div
                    key={number}
                    className={`${page === number
                        ? "bg-secondary text-black"
                        : "bg-primary text-white"
                      } px-4 py-2 m-2 cursor-pointer`}
                    onClick={() => {
                      setPage(number);
                    }}
                  >
                    {number + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
