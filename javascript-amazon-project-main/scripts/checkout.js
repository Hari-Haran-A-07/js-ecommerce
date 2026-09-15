const orderSummary = document.querySelector('.order-summary');
const paymentSummary = document.querySelector('.payment-summary');

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

function updateCartHeader() {
  document.querySelectorAll('.js-cart-quantity').forEach((element) => {
    element.innerHTML = getCartQuantity();
  });
  document.querySelectorAll('.js-cart-items').forEach((element) => {
    element.innerHTML = `${getCartQuantity()} items`;
  });
}

function renderOrderSummary() {
  if (cart.length === 0) {
    orderSummary.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  orderSummary.innerHTML = cart.map((item, index) => {
    const product = getProduct(item.productId);

    return `
      <div class="cart-item-container">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}">
          <div class="cart-item-details">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${item.quantity}</span></span>
              <span class="delete-quantity-link link-primary js-delete-item"
                data-product-id="${product.id}">Delete</span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            <div class="delivery-option">
              <input type="radio" checked class="delivery-option-input"
                name="delivery-option-${index}">
              <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" class="delivery-option-input"
                name="delivery-option-${index}">
              <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');

  document.querySelectorAll('.js-delete-item').forEach((button) => {
    button.addEventListener('click', () => {
      const itemIndex = cart.findIndex((item) => item.productId === button.dataset.productId);
      cart.splice(itemIndex, 1);
      saveCart();
      renderOrderSummary();
      renderPaymentSummary();
      updateCartHeader();
    });
  });
}

function renderPaymentSummary() {
  const itemCount = getCartQuantity();
  const itemTotal = cart.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + product.priceCents * item.quantity;
  }, 0);
  const shippingCents = itemCount > 0 ? 499 : 0;
  const subtotalCents = itemTotal + shippingCents;
  const taxCents = Math.round(subtotalCents * 0.1);
  const totalCents = subtotalCents + taxCents;

  paymentSummary.innerHTML = `
    <div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row"><div>Items (${itemCount}):</div><div class="payment-summary-money">$${(itemTotal / 100).toFixed(2)}</div></div>
    <div class="payment-summary-row"><div>Shipping &amp; handling:</div><div class="payment-summary-money">$${(shippingCents / 100).toFixed(2)}</div></div>
    <div class="payment-summary-row subtotal-row"><div>Total before tax:</div><div class="payment-summary-money">$${(subtotalCents / 100).toFixed(2)}</div></div>
    <div class="payment-summary-row"><div>Estimated tax (10%):</div><div class="payment-summary-money">$${(taxCents / 100).toFixed(2)}</div></div>
    <div class="payment-summary-row total-row"><div>Order total:</div><div class="payment-summary-money">$${(totalCents / 100).toFixed(2)}</div></div>
    <button class="place-order-button button-primary"${itemCount === 0 ? ' disabled' : ''}>Place your order</button>`;
}

renderOrderSummary();
renderPaymentSummary();
updateCartHeader();
