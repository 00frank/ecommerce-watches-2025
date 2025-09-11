interface Category {
    id: number;
    name: string;
    subCategories: Array<Omit<Category, "subCategories">>;
}

export default Category 