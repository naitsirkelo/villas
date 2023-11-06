export function convertDecimalToYearsAndMonths(decimalNumber: number) {
    const years = Math.floor(decimalNumber);
    const months = Math.round((decimalNumber - years) * 12);
    return { years, months };
}