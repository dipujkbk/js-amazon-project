let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
                src=${product.image}>
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" 
        data-product-id="${product.id}"
        >
            Add to Cart
        </button>
    </div>
    `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

// We're going to use an object to save the timeout ids.
// The reason we use an object is because each product
// will have its own timeoutId. So an object lets us
// save multiple timeout ids for different products.
// For example:
// {
//   'product-id1': 2,
//   'product-id2': 5,
//   ...
// }
// (2 and 5 are ids that are returned when we call setTimeout).
const addedMessageTimeouts = {};

document.querySelectorAll(".js-add-to-cart").forEach((button) => {

    // This solution uses a feature of JavaScript called a
    // closure. Each time we run the loop, it will create
    // a new variable called addedMessageTimeoutId and do
    // button.addEventListener().
    //
    // Then, because of closure, the function we give to
    // button.addEventListener() will get a unique copy
    // of the addedMessageTimeoutId variable and it will
    // keep this copy of the variable forever.
    // (Reminder: closure = if a function has access to a
    // value/variable, it will always have access to that
    // value/variable).
    //
    // This allows us to create many unique copies of the
    // addedMessageTimeoutId variable (one for every time
    // we run the loop) so it lets us keep track of many
    // timeoutIds (one for each product).

    /*
    let addedMessageTimeoutId;
    */

  button.addEventListener("click", () => {
    /*
        - Now how do we know which product to add when we click
        - So here we will use data attribute in html

        - it allows us to attach any information to an element
        - Syntax
        - starts with data-name-of-property(data-product-name)
        - to retrive
            button.dataset.productMap

    */
    const { productId } = button.dataset;

    let quantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`).value
    );

    let matchingProductFound = false;

    cart.forEach((item) => {
      if (productId === item.productId) {
        item.quantity += quantity;
        matchingProductFound = true;
      }
    });

    if (!matchingProductFound) {
      cart.push({
        productId,
        quantity,
      });
    }

    console.log(cart);
    // calulating the total quantity
    let totalCartQuantity = 0;
    cart.forEach((item) => {
      totalCartQuantity += item.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = totalCartQuantity;

    // Added message to the screen
    const addedMesaage = document.querySelector(".js-added-to-cart");
    addedMesaage.classList.add("added-to-cart-visible");

    // Check if there's a previous timeout for this
    // product. If there is, we should stop it.

    const previousTimeoutId = addedMessageTimeouts[productId];

    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMesaage.classList.remove("added-to-cart-visible");
    }, 2000);

    // Save the timeoutId for this product
    // so we can stop it later if we need to.
    addedMessageTimeouts[productId] = timeoutId;


    /**
     * code of clousre type solution
     * 
     *  // Check if a previous timeoutId exists. If it does,
      // we will stop it.
      if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);

      // Save the timeoutId so we can stop it later.
      addedMessageTimeoutId = timeoutId;
     */
  });

});
