import type { Category } from "shared/types/category";

interface Props {
  category: Category;
}

const Descendants = ({ category }: Props) => {
  return (
    <div className="h-10 left-0 w-full font-normal collapse group-hover/descendant:visible">
      <div className="flex left-0 w-full gap-5 top-5 group-hover/descendant:bg-primary px-5 group-hover/descendant:py-5 text-transparent group-hover/descendant:text-white transition-all">
        {category.descendants
          ?.sort((c1, c2) => c1.id - c2.id)
          .map((child) => (
            <div key={child.id}>
              <a href={"/categories/" + child.path} className="">
                {child.name}
              </a>
              {child.descendants.length > 0 && <Descendants category={child} />}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Descendants;
