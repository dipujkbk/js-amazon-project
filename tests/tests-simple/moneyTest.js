import { formatCurrency } from "../../scripts/utils/money.js";
console.log('test suite: formatCurrency');

//Test case 1
console.log('converts cents into dollars');
if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

//Test case 2
console.log('works with 0');
if (formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}

//Test case 3
console.log('rounds up to the nearest cent');
if (formatCurrency(2000.5) === '20.01') {
    console.log('passed');
} else {
    console.log('failed');
}

if (formatCurrency(2000.4) === '20.00') {
    console.log('passed');
} else {
    console.log('failed');
}