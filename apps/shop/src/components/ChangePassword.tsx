import type { User } from "shared/types/user";
import { changePassword, getMe } from "../api/userApi";
import { useEffect, useState } from "preact/hooks";
import UserLinks from "./UserLinks";

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const newPasswordConfirmation = formData.get(
      "newPasswordConfirmation",
    ) as string;

    if (newPassword.length < 7) {
      setErrorMessage("Пароль повинен містити не менше 7 символів");
      return;
    }

    if (newPassword !== newPasswordConfirmation) {
      setErrorMessage("Паролі не співпадають");
      return;
    }

    setErrorMessage(null);

    changePassword({
      currentPassword,
      newPassword,
    }).then((res) => {
      if (res.status === 200) {
        window.location.href = "/profile";
      } else {
        setErrorMessage(res.error.message ?? "Не вдалося змінити пароль");
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
                  <div className="flex flex-col gap-6">
                    <div className="">
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Поточний пароль
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="current-password"
                        autoComplete="current-password"
                        placeholder="Поточний пароль"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="">
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Новий пароль
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="new-password"
                        autoComplete="new-password"
                        placeholder="Новий пароль"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="">
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Підтвердження паролю
                      </label>
                      <input
                        type="password"
                        name="newPasswordConfirmation"
                        id="confirm-password"
                        autoComplete="new-password"
                        placeholder="Підтвердження паролю"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                {errorMessage && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <span className="block sm:inline">{errorMessage}</span>
                  </div>
                )}
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
