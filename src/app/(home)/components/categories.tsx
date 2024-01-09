import { prismaClient } from "../../lib/prisma";
import CategoriesItem from "./category-item";

const Categories = async () => {
  const categories = await prismaClient.category.findMany({});
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
      {categories.map((category) => (
        <CategoriesItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default Categories;
