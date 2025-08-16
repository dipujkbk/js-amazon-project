import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {
    //we need to getItems from local stoarge from starting , so we wil mock
    // this to get the cart items

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();

    console.log("cart>>", cart);

    // Create a mock input element with the expected class and value

    //here we are creating the actual DOM
    /*
    const input = document.createElement("input");
    input.className =
      "js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    input.value = "1"; // or whatever quantity you want to test
    document.body.appendChild(input);
    */

    //Here we are creating the mock dom, as querySelector method takes one
    // parameter, so in the arrow function of callfake we need to pass one
    // param as well
    spyOn(document, "querySelector").and.callFake((selectorString) => {
      return {
        value: "1",
      };
    });

    console.log("before spying my local storage: ", localStorage);

    spyOn(localStorage, "setItem");

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart[0].quantity).toEqual(3);

    console.log("after spying my local storage: ", localStorage);
  });

  it("adds a new product to the cart", () => {
    //creating mock data

    // Create a mock input element with the expected class and value
    spyOn(document, "querySelector").and.callFake((selectorString) => {
      return {
        value: "1",
      };
    });

    //spyOn(object that you want to mock, method you want to mock=> so
    // wherever this method is used , it will return empty array string)
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    // this addToCart also uses saveToStorage, which indirectly calls
    // setItem in localStorage , but we dont want to store, so we mock this
    // method also

    spyOn(localStorage, "setItem");

    console.log(localStorage.getItem("cart"));
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    //comapring the length of the cart
    expect(cart.length).toEqual(1);

    //for the mehtod we mocked , we can also check how many times the mocked has been called

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    //we cna check the first product Id of the cart
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  });
});
