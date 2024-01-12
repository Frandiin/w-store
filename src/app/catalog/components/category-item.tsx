import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="flex flex-col">
        <div className="flex h-[150px] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-category-item-gradient">
          <Image
            src={category.imageUrl[0]}
            alt={category.name}
            width={0}
            height={0}
            className="h-auto max-h-[70%] w-auto max-w-[80%] "
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        <div className="rounded-bl-lg rounded-br-lg bg-accent py-4">
          <p className="text-center text-sm font-semibold">{category.slug}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
