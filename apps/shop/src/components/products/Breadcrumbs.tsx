import type { BreadCrumb as BreadCrumbType } from "shared/types/product";
import { useEffect, useState } from "preact/hooks";

type Props = {
  breadcrumbs: BreadCrumbType;
};

type FlatBreadcrumbsType = {
  path: string;
  name: string;
};

const Breadcrumbs = ({ breadcrumbs }: Props) => {
  const [flatBreadcrumbs, setFlatBreadcrumbs] = useState(
    [] as FlatBreadcrumbsType[]
  );

  const flattenBreadcrumbs = (
    current: BreadCrumbType,
    flat: FlatBreadcrumbsType[] = []
  ) => {
    if (!current) return;

    if (current.descendant) {
      flattenBreadcrumbs(current.descendant, [...flat, current]);
    } else {
      setFlatBreadcrumbs([...flat, current]);
    }
  };

  useEffect(() => {
    flattenBreadcrumbs(breadcrumbs);
  }, [breadcrumbs]);

  return (
    <div class="flex items-center my-2 gap-2 text-neutral-400">
      {flatBreadcrumbs.map((breadcrumb, index) => (
        <div>
          <a
            key={index}
            href={`/categories/${breadcrumb.path}`}
            className="hover:text-primary"
          >
            {breadcrumb.name}
          </a>
          {index !== flatBreadcrumbs.length - 1 && (
            <span className="pl-2">&gt;</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
