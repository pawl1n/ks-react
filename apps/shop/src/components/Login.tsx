import { useState } from "preact/hooks";
import { setToken } from "../stores/tokenStore";
import { login } from "../api/authApi";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    setErrorMessage("");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    await login({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }).then((res) => {
      if (res.data) {
        setToken(res.data);
        window.location.href = "/profile";
      } else {
        setErrorMessage("Неправильний логін або пароль");
      }
    });
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
            placeholder="Email"
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
            placeholder="Пароль"
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
            href="/register"
            className="font-medium text-primary hover:text-black"
          >
            Зареєструватись
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Увійти
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

export default LoginForm;
