import Category from "@/types/category.interface"

const categories: Array<Category> = [
    {
        id: 1,
        title: "Relojesa",
        subCategories: [
            { id: 101, title: "Relojes de pulsera", subCategories: [] },
            { id: 102, title: "Smartwatches", subCategories: [] },
            { id: 103, title: "Relojes de lujo", subCategories: [] },
            {
                id: 104, title: "Relojes deportivos", subCategories: [
                    { id: 1041, title: "Relojes de pulsera1", subCategories: [] },
                    { id: 1042, title: "Smartwatches2", subCategories: [] },
                    { id: 1043, title: "Relojes de lujo3", subCategories: [] },
                    { id: 1044, title: "Relojes deportivos4", subCategories: [] },
                ]
            },
        ],
    },
    {
        id: 2,
        title: "Bolsos",
        subCategories: [
            { id: 201, title: "Mochilas", subCategories: [] },
            { id: 202, title: "Bolsos de mano", subCategories: [] },
            { id: 203, title: "Maletines", subCategories: [] },
            { id: 204, title: "Riñoneras", subCategories: [] },
        ],
    },
    {
        id: 3,
        title: "Gafas",
        subCategories: [
            { id: 301, title: "Gafas de sol", subCategories: [] },
            { id: 302, title: "Gafas graduadas", subCategories: [] },
            { id: 303, title: "Gafas deportivas", subCategories: [] },
        ],
    },
    {
        id: 4,
        title: "Zapatos",
        subCategories: [
            { id: 401, title: "Zapatillas", subCategories: [] },
            { id: 402, title: "Botas", subCategories: [] },
            { id: 403, title: "Sandalias", subCategories: [] },
            { id: 404, title: "Zapatos de vestir", subCategories: [] },
        ],
    },
    {
        id: 5,
        title: "Accesorios",
        subCategories: [
            { id: 501, title: "Cinturones", subCategories: [] },
            { id: 502, title: "Sombreros", subCategories: [] },
            { id: 503, title: "Bufandas", subCategories: [] },
            { id: 504, title: "Guantes", subCategories: [] },
        ],
    },
    { id: 6, title: "Perfumes", subCategories: [] },
    { id: 7, title: "Joyería", subCategories: [] },
    { id: 8, title: "Ropa interior", subCategories: [] },
    { id: 9, title: "Electrodomésticos", subCategories: [] },
    { id: 10, title: "Libros", subCategories: [] },
    { id: 11, title: "Deportes", subCategories: [] },
    { id: 12, title: "Muebles", subCategories: [] },
]


export default categories