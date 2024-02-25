import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
          <div class="product-order">
            <div class="delivery-date">Delivery: Wednesday, February 28</div>
            <div class="product-order-details">
              <div class="product-img">
                <img
                  src="${matchingProduct.image}"
                  alt=""
                />
              </div>
              <div class="product-info">
                <p class="product-name">${matchingProduct.name}</p>
                <p class="price">$${formatCurrency(
                  matchingProduct.priceCents
                )}</p>
                <div class="product-qty">
                  Quantity:
                  <span class="qty-lable">${cartItem.quantity}</span>
                  <span class="updete-link">Updete</span>
                  <span class="delete-link">Delete</span>
                </div>
              </div>
              <div class="delivery-option-container span-col">
                <p class="delivery-option-title">Choose a delivery option:</p>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-input-option"
                    name="delivery-option-${productId}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, March 5</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-input-option"
                    name="delivery-option-${productId}"
                  />
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, February 28
                    </div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-input-option"
                    name="delivery-option-${productId}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, February 26</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
});

document.querySelector(".js-order-container").innerHTML = cartSummaryHTML;
