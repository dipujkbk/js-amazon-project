// import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export default function isWeekend(date) {
    if(['Saturday', 'Sunday'].includes(date.format('dddd'))) {
        return true;
    }
    return false;
}