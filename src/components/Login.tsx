import { useState } from "preact/hooks";
import { setToken } from "../stores/tokenStore";

interface LoginProps {
  email: string;
  password: string;
}

interface Response {
  token: string;
  authorities: string[];
}

const loginUser = async (credentials: LoginProps): Promise<Response> => {
  return fetch("http://localhost:8080/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json())
    .catch(() => {
      throw new Error("Неправильний логін або пароль");
    });
};

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    setErrorMessage("");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await loginUser({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }).catch((e: Error) => {
      setErrorMessage(e.message);
      return { token: "", authorities: [] as string[] };
    });

    if (response.token) {
      setToken(response.token);

      if (response.authorities.includes("ADMIN")) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            placeholder="Email"
          />
        </div>
        <div>
          <label for="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
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
          <label for="remember-me" className="ml-2 block text-sm text-gray-900">
            Запамʼятати мене
          </label>
        </div>

        {/*<div className="text-sm">*/}
        {/*  <a*/}
        {/*    href="#"*/}
        {/*    className="font-medium text-indigo-600 hover:text-indigo-500"*/}
        {/*  >*/}
        {/*    Забули пароль?*/}
        {/*  </a>*/}
        {/*</div>*/}
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
