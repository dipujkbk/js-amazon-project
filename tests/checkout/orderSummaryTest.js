import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe("testsuite: renderOrderSummary", () => {
  /**
   * When we are testing a part of the page , 2 things we need to test
   * How the page looks
   * How the page behaves
   */

  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(() => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 3,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 2,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadFromStorage();

    /**
     * So in this class '.js-order-summary' , we are putting the whole generated HTML
     * So we will create on div element with this class and put in the html and as
     * it is giving errors , so we need to create those divs aswell
     *
     */
    document.querySelector(".js-test-container").innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        <div class="js-return-to-home-link"></div>
        `;

    renderOrderSummary();
  });

  afterEach(() => {
    //we will clean up the page
    document.querySelector(".js-test-container").innerHTML = "";
  });

  //How the page looks
  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );

    expect(
      document.querySelector(`.js-quantity-label-${productId1}`).innerText
    ).toEqual("3");

    expect(
      document.querySelector(`.js-quantity-label-${productId2}`).innerText
    ).toEqual("2");
  });

  //How the page behaves
  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
});
