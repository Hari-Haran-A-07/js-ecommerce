let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      <div class="product-name limit-text-to-2-lines">${product.name}</div>
      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">${product.rating.count}</div>
      </div>
      <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
      <div class="product-quantity-container">
        <select>
          ${Array.from({ length: 10 }, (_, index) => `
            <option value="${index + 1}"${index === 0 ? ' selected' : ''}>${index + 1}</option>`).join('')}
        </select>
      </div>
      <div class="product-spacer"></div>
      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>
      <button class="add-to-cart-button button-primary j-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
  document.querySelectorAll('.js-cart-quantity').forEach((element) => {
    element.innerHTML = getCartQuantity();
  });
}

document.querySelectorAll('.j-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    cartStore.add(productId);
    updateCartQuantity();
  });
});

updateCartQuantity();