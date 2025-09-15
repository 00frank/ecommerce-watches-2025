import Category from "@/types/category.interface"

const categories: Array<Category> = [
    {
        id: 1,
        name: "Relojesa",
        subCategories: [
            { id: 101, name: "Relojes de pulsera", subCategories: [] },
            { id: 102, name: "Smartwatches", subCategories: [] },
            { id: 103, name: "Relojes de lujo", subCategories: [] },
            {
                id: 104, name: "Relojes deportivos", subCategories: [
                    { id: 1041, name: "Relojes de pulsera1", subCategories: [] },
                    { id: 1042, name: "Smartwatches2", subCategories: [] },
                    { id: 1043, name: "Relojes de lujo3", subCategories: [] },
                    { id: 1044, name: "Relojes deportivos4", subCategories: [] },
                ]
            },
        ],
    },
    {
        id: 2,
        name: "Bolsos",
        subCategories: [
            { id: 201, name: "Mochilas", subCategories: [] },
            { id: 202, name: "Bolsos de mano", subCategories: [] },
            { id: 203, name: "Maletines", subCategories: [] },
            { id: 204, name: "Riñoneras", subCategories: [] },
        ],
    },
    {
        id: 3,
        name: "Gafas",
        subCategories: [
            { id: 301, name: "Gafas de sol", subCategories: [] },
            { id: 302, name: "Gafas graduadas", subCategories: [] },
            { id: 303, name: "Gafas deportivas", subCategories: [] },
        ],
    },
    {
        id: 4,
        name: "Zapatos",
        subCategories: [
            { id: 401, name: "Zapatillas", subCategories: [] },
            { id: 402, name: "Botas", subCategories: [] },
            { id: 403, name: "Sandalias", subCategories: [] },
            { id: 404, name: "Zapatos de vestir", subCategories: [] },
        ],
    },
    {
        id: 5,
        name: "Accesorios",
        subCategories: [
            { id: 501, name: "Cinturones", subCategories: [] },
            { id: 502, name: "Sombreros", subCategories: [] },
            { id: 503, name: "Bufandas", subCategories: [] },
            { id: 504, name: "Guantes", subCategories: [] },
        ],
    },
    { id: 6, name: "Perfumes", subCategories: [] },
    { id: 7, name: "Joyería", subCategories: [] },
    { id: 8, name: "Ropa interior", subCategories: [] },
    { id: 9, name: "Electrodomésticos", subCategories: [] },
    { id: 10, name: "Libros", subCategories: [] },
    { id: 11, name: "Deportes", subCategories: [] },
    { id: 12, name: "Muebles", subCategories: [] },
]


export default categories