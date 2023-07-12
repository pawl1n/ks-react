import { setToken } from "../stores/tokenStore";

const links = [
  {
    label: "Профіль",
    path: "/profile",
  },
  {
    label: "Змінити пароль",
    path: "/profile/change-password",
  },
];

const UserLinks = () => {
  const logout = () => {
    setToken({
      accessToken: "",
      refreshToken: "",
    });

    window.location.href = "/";
  };

  return (
    <>
      <div className="md:col-span-1 mx-10 flex flex-row sm:gap-5 md:flex-col items-center md:items-start gap-2">
        {links.map((link) => {
          return window.location.href.endsWith(link.path) ? (
            <div className="sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {link.label}
              </h3>
            </div>
          ) : (
            <div className="sm:px-0">
              <a href={link.path} className="text-primary hover:text-black">
                {link.label}
              </a>
            </div>
          );
        })}
        <button
          className="md:mt-auto md:w-full inline-flex justify-center rounded-md bg-primary py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={logout}
        >
          Вийти
        </button>
      </div>
    </>
  );
};

export default UserLinks;
