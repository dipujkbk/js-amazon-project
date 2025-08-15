/**
 * We create this as separate object and link this id to the cart
 * This is called Noramlization
 */
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import isWeekend from "../scripts/utils/date.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(id) {
  return (
    deliveryOptions.find((option) => option.id === id) || deliveryOptions[0]
  );
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let deliveryDays = deliveryOption.deliveryDays;
  //skipping weekends
  for (let i = 1; i <= deliveryDays; i++) {
    if (isWeekend(today.add(i, "day"))) {
      deliveryDays++;
    }
  }

  const deliveryDate = today.add(deliveryDays, "day");

  const dateString = deliveryDate.format("dddd, MMMM D");

  return dateString;
}
