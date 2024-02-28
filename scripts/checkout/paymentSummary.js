import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
      <p class="summary-title">Order Summary</p>
        <div class="payment-summary">
          <p>Items (3):</p>
          <p class="payment-summary-money">$${formatCurrency(
            productPriceCents
          )}</p>
        </div>
        <div class="payment-summary">
          <p>Shipping & handling:</p>
          <p class="payment-summary-money underline">$${formatCurrency(
            shippingPriceCents
          )}</p>
        </div>
        <div class="payment-summary">
          <p>Total before tax:</p>
          <p class="payment-summary-money">$${formatCurrency(
            totalBeforeTaxCents
          )}</p>
        </div>
        <div class="payment-summary">
          <p>Estimated tax(10%):</p>
          <p class="payment-summary-money">$${formatCurrency(taxCents)}</p>
        </div>
        <div class="payment-summary">
          <p>Order total:</p>
          <p class="payment-summary-money">$${formatCurrency(totalCents)}</p>
        </div>
        <div class="paypal">Use PayPal <input type="checkbox" /></div>
        <button class="place-order-btn">Place your order</button>
  `;

  document.querySelector(".js-summary-order").innerHTML = paymentSummaryHTML;
}
