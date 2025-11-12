import React from "react";

interface Category {
  id: number;
  name: string;
}

interface CategorySelectorProps {
  categories: Category[];
  onSelectCategory: (id: number) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="text-center">
      <h1 className="text-6xl mb-4 text-white">𝓢𝓮𝓵𝓮𝓬𝓽 𝓪 𝓒𝓪𝓽𝓮𝓰𝓸𝓻𝔂</h1>
      <div className="flex flex-wrap justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            className="m-2 p-4 bg-card text-card-foreground rounded border border-[#AA0000] shadow hover:bg-gray-200 transition duration-300"
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
