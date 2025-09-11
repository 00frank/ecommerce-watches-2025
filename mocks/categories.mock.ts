import Category from "@/types/category.interface"

const categories: Array<Category> = [
    {
        id: 1,
        name: "Relojesasdsadasasdsdasds",
        subCategories: [
            { id: 101, name: "Relojes de pulsera" },
            { id: 102, name: "Smartwatches" },
            { id: 103, name: "Relojes de lujo" },
            { id: 104, name: "Relojes deportivos" },
        ],
    },
    {
        id: 2,
        name: "Bolsos",
        subCategories: [
            { id: 201, name: "Mochilas" },
            { id: 202, name: "Bolsos de mano" },
            { id: 203, name: "Maletines" },
            { id: 204, name: "Riñoneras" },
        ],
    },
    {
        id: 3,
        name: "Gafas",
        subCategories: [
            { id: 301, name: "Gafas de sol" },
            { id: 302, name: "Gafas graduadas" },
            { id: 303, name: "Gafas deportivas" },
        ],
    },
    {
        id: 4,
        name: "Zapatos",
        subCategories: [
            { id: 401, name: "Zapatillas" },
            { id: 402, name: "Botas" },
            { id: 403, name: "Sandalias" },
            { id: 404, name: "Zapatos de vestir" },
        ],
    },
    {
        id: 5,
        name: "Accesorios",
        subCategories: [
            { id: 501, name: "Cinturones" },
            { id: 502, name: "Sombreros" },
            { id: 503, name: "Bufandas" },
            { id: 504, name: "Guantes" },
        ],
    },
    { id: 6, name: "Perfumes", subCategories: [] },
    { id: 7, name: "Joyería", subCategories: [] },
    { id: 8, name: "Ropa interior", subCategories: [] },
    { id: 9, name: "Electrodomésticos", subCategories: [] },
    { id: 10, name: "Libros", subCategories: [] },
    { id: 11, name: "Deportes", subCategories: [] },
    { id: 12, name: "Muebles", subCategories: [] },
    { id: 13, name: "Videojuegos", subCategories: [] },
    { id: 14, name: "Bicicletas", subCategories: [] },
    { id: 15, name: "Instrumentos musicales", subCategories: [] },
]


export default categories