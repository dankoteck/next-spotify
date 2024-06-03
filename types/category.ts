import { Icon, Pagination } from "./common";

export type CategoryItem = {
  href: string;
  id: string;
  icons: Icon[];
  name: string;
};

export type Category = Pagination & {
  href: string;
  items: CategoryItem[];
};
