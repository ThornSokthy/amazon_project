let productHTML = "";

products.forEach((product) => {
  productHTML += `
        <div class="product">
          <div class="product-img">
            <img src="${product.image}" alt="" />
          </div>

          <div class="product-name">
            ${product.name}
          </div>
          <div class="rating">
            <img src="rating/rating-${product.rating.stars * 10}.png" alt="" />
            <span>${product.rating.count}</span>
          </div>
          <p class="price">$${(product.priceCents / 100).toFixed(2)}</p>
          <div class="product-quantity-container">
            <select id="quantity-selector">
              <option value="1" selected>1</option>
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
          <div class="spacer"></div>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
  `;
});

document.querySelector(".js-products-container").innerHTML = productHTML;
