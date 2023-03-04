import SidebarLink from "./SidebarLink";

export interface Link {
  name: string;
  url: string;
}

interface Props {
  currentPath: string;
  links: Link[];
}

const Sidebar = ({ currentPath, links }: Props) => {
  return (
    <aside class="h-full z-20 hidden w-64 overflow-y-auto md:block flex-shrink-0">
      <div class="h-full flex flex-col py-4 text-gray-500 dark:text-gray-400">
        <a
          class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          href="#"
        >
          Кішка Стрибає
        </a>
        <ul class="mt-6">
          {links?.map((link) => (
            <SidebarLink
              key={link.url}
              name={link.name}
              link={link.url}
              selected={
                currentPath === "/admin/" + link.url ||
                currentPath === "/admin/" + link.url + "/"
              }
            />
          ))}
        </ul>
        <div class="px-6 mb-0 mt-auto">
          <button class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-purple-600 hover:bg-black focus:outline-none focus:shadow-outline-purple">
            Create account
            <span class="ml-2" aria-hidden="true">
              +
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
