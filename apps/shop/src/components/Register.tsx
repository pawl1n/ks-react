import { useState } from "preact/hooks";
import { setToken } from "../stores/tokenStore";
import { register } from "../api/authApi";

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    setErrorMessage("");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await register({
      email: formData.get("email") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      password: formData.get("password") as string,
    });

    if (response.data) {
      setToken(response.data);
      window.location.href = "/";
    } else {
      if (response.error.message) {
        setErrorMessage(`Деякі поля вказано невірно`);
      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            placeholder="Email *"
          />
        </div>
        <div>
          <label htmlFor="first-name" className="sr-only">
            Імʼя
          </label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            autoComplete="first-name"
            required
            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            placeholder="Імʼя *"
          />
        </div>
        <div>
          <label htmlFor="last-name" className="sr-only">
            Прізвище
          </label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            autoComplete="last-name"
            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            placeholder="Прізвище"
          />
        </div>
        <div>
          <label htmlFor="phone-number" className="sr-only">
            Прізвище
          </label>
          <input
            id="phone-number"
            name="phoneNumber"
            type="tel"
            autoComplete="phone-number"
            required
            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            placeholder="Номер телефону *"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            placeholder="Пароль *"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary transition-all"
            checked
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Запамʼятати мене
          </label>
        </div>

        <div className="text-sm">
          <a
            href="/login"
            className="font-medium text-primary hover:text-black"
          >
            Увійти
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Зареєструватись
        </button>
      </div>
      {errorMessage && (
        <div
          class="bg-red-200 border-red-600 text-red-600 border-l-4 p-4"
          role="alert"
        >
          <p class="font-bold">Помилка</p>
          <p>{errorMessage}</p>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
