import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
          <div class="product-order js-cart-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery: ${dateString}</div>
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
                  <span class="delete-link js-delete-link"
                   data-product-id="${matchingProduct.id}">Delete</span>
                </div>
              </div>
              <div class="delivery-option-container span-col">
                <p class="delivery-option-title">Choose a delivery option:</p>               
                ${deliveryOptionHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
  `;
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}"
      >
        <input
          type="radio" ${isChecked ? "checked" : ""}
          class="delivery-input-option"
          name="delivery-option-${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} - Shipping</div>
        </div>
      </div>
    `;
    });

    return html;
  }

  document.querySelector(".js-order-container").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-container-${productId}`
      );

      container.remove();

      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
