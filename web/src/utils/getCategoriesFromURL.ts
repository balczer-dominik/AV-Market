import { useRouter } from "next/router";
import { Categories } from "../components/navbar/MenuRoutes";

export const getCategoriesFromURL = () => {
  const router = useRouter();
  const category =
    typeof router.query.category === "string"
      ? Object.keys(Categories).find(
          (key) => Categories[key].route === router.query.category
        )
      : null;
  const subcategory =
    typeof router.query.subcategory === "string"
      ? Categories[category].subcategories.find(
          (sc) => sc.route === router.query.subcategory
        ).title
      : null;
  return { category, subcategory };
};
