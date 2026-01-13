// Modified function from https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
// Returns Year * 100 + Week for easy indexing
export function getWeekNumber(d: Date) {
    // Copy date so don't modify original
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sundays day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    const yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(( ( (d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
    // Return array of year and week number
    return d.getUTCFullYear() * 100 + weekNo;
}
