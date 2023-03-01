import type { JSXInternal } from "preact/src/jsx";

export interface Props {
  name: string;
  link: string;
  icon?: JSXInternal.Element;
  selected?: boolean;
}

const SidebarLink = ({ name, link, icon, selected }: Props) => {
  return (
    <li className="relative px-6 py-3">
      {selected && (
        <span
          className="absolute inset-y-0 left-0 w-1 bg-primary dark:bg-white rounded-tr-lg rounded-br-lg"
          aria-hidden="true"
        />
      )}
      <a
        className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
        href={"/admin" + link}
      >
        {icon}
        <span className="ml-4">{name}</span>
      </a>
    </li>
  );
};
export default SidebarLink;
