export default function formatMoney(value: number, currency: string = "ARS", locale: string = "es-AR") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
    }).format(value)
}