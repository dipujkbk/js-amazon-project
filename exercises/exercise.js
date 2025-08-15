import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import isSatSun from "../scripts/utils/date.js";

const today = dayjs();

console.log('today>>', today);

const day5 = today.add(5, 'day');

console.log('day5>>', day5);

const day5Format = day5.format('MMMM DD');

console.log('day5Format>>', day5Format);

const oneMonthAfter = today.add(1, 'month');

console.log('oneMonthAfter>>', oneMonthAfter);

const oneMonthAfterFormat = oneMonthAfter.format('MMMM DD');

console.log('oneMonthAfterFormat>>', oneMonthAfterFormat);

const oneMonthBefore = today.subtract(1, 'month');

console.log('oneMonthBefore>>', oneMonthBefore);

const oneMonthBeforeFormat = oneMonthBefore.format('MMMM DD');

console.log('oneMonthBeforeFormat>>', oneMonthBeforeFormat);

const oneMonthBeforeInDiffFormat = oneMonthBefore.format('dddd MMMM DD');

console.log("oneMonthBeforeInDiffFormat>>", oneMonthBeforeInDiffFormat);


// function isWeekend(date) {
//     if(['Saturday', 'Sunday'].includes(date.format('dddd'))) {
//         return true;
//     }
//     return false;
// }

console.log(isSatSun(today.add(2, 'day')));
