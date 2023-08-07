import type { User } from "shared/types/user";
import { getMe, updateMe } from "../api/userApi";
import { useEffect, useState } from "preact/hooks";
import UserLinks from "./UserLinks";

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe().then((res) => {
      if (res.data) {
        setUser(res.data);
      } else {
        window.location.href = "/login";
      }
    });
  }, []);

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    updateMe({
      firstName: formData.get("firstName") as string,
      middleName: formData.get("middleName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
    }).then((res) => {
      if (res.data) {
        setUser(res.data);
      } else {
        console.log(res.error);
      }
    });
  };

  if (!user) {
    return <></>;
  }

  return (
    <>
      <div className="mt-10 lg:mx-auto">
        <div className="md:grid md:grid-cols-3 md:gap-6 max-w-screen-lg">
          <UserLinks />
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Імʼя
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="first-name"
                        autoComplete="given-name"
                        value={user?.firstName}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Прізвище
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="last-name"
                        autoComplete="family-name"
                        value={user?.lastName}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={user?.email}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Номер телефону
                      </label>
                      <input
                        id="phone"
                        name="phoneNumber"
                        autoComplete="phone-number"
                        type="tel"
                        value={user?.phoneNumber}
                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>

                    {/*<div className="col-span-6 sm:col-span-3">*/}
                    {/*  <label*/}
                    {/*    htmlFor="country"*/}
                    {/*    className="block text-sm font-medium leading-6 text-gray-900"*/}
                    {/*  >*/}
                    {/*    Country*/}
                    {/*  </label>*/}
                    {/*  <select*/}
                    {/*    id="country"*/}
                    {/*    name="country"*/}
                    {/*    autoComplete="country-name"*/}
                    {/*    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"*/}
                    {/*  >*/}
                    {/*    <option>United States</option>*/}
                    {/*    <option>Canada</option>*/}
                    {/*    <option>Mexico</option>*/}
                    {/*  </select>*/}
                    {/*</div>*/}

                    {/*<div className="col-span-6">*/}
                    {/*  <label*/}
                    {/*    htmlFor="street-address"*/}
                    {/*    className="block text-sm font-medium leading-6 text-gray-900"*/}
                    {/*  >*/}
                    {/*    Street address*/}
                    {/*  </label>*/}
                    {/*  <input*/}
                    {/*    type="text"*/}
                    {/*    name="street-address"*/}
                    {/*    id="street-address"*/}
                    {/*    autoComplete="street-address"*/}
                    {/*    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"*/}
                    {/*  />*/}
                    {/*</div>*/}

                    {/*<div className="col-span-6 sm:col-span-6 lg:col-span-2">*/}
                    {/*  <label*/}
                    {/*    htmlFor="city"*/}
                    {/*    className="block text-sm font-medium leading-6 text-gray-900"*/}
                    {/*  >*/}
                    {/*    City*/}
                    {/*  </label>*/}
                    {/*  <input*/}
                    {/*    type="text"*/}
                    {/*    name="city"*/}
                    {/*    id="city"*/}
                    {/*    autoComplete="address-level2"*/}
                    {/*    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"*/}
                    {/*  />*/}
                    {/*</div>*/}

                    {/*<div className="col-span-6 sm:col-span-3 lg:col-span-2">*/}
                    {/*  <label*/}
                    {/*    htmlFor="region"*/}
                    {/*    className="block text-sm font-medium leading-6 text-gray-900"*/}
                    {/*  >*/}
                    {/*    State / Province*/}
                    {/*  </label>*/}
                    {/*  <input*/}
                    {/*    type="text"*/}
                    {/*    name="region"*/}
                    {/*    id="region"*/}
                    {/*    autoComplete="address-level1"*/}
                    {/*    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"*/}
                    {/*  />*/}
                    {/*</div>*/}

                    {/*<div className="col-span-6 sm:col-span-3 lg:col-span-2">*/}
                    {/*  <label*/}
                    {/*    htmlFor="postal-code"*/}
                    {/*    className="block text-sm font-medium leading-6 text-gray-900"*/}
                    {/*  >*/}
                    {/*    ZIP / Postal code*/}
                    {/*  </label>*/}
                    {/*  <input*/}
                    {/*    type="text"*/}
                    {/*    name="postal-code"*/}
                    {/*    id="postal-code"*/}
                    {/*    autoComplete="postal-code"*/}
                    {/*    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"*/}
                    {/*  />*/}
                    {/*</div>*/}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-primary py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Зберегти
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
