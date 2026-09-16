const orderSummary = document.querySelector('.order-summary');
const paymentSummary = document.querySelector('.payment-summary');

function getDeliveryOption(deliveryOptionId) {
  return deliveryOptions.find((option) => option.id === deliveryOptionId)
    || deliveryOptions[0];
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
    const selectedDeliveryOption = getDeliveryOption(item.deliveryOptionId);

    return `
      <div class="cart-item-container">
        <div class="delivery-date">Delivery date: ${selectedDeliveryOption.date}</div>
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
            ${deliveryOptions.map((option) => `
              <label class="delivery-option">
                <input type="radio" class="delivery-option-input"
                  name="delivery-option-${index}" value="${option.id}"
                  data-product-id="${product.id}"${option.id === selectedDeliveryOption.id ? ' checked' : ''}>
                <div>
                  <div class="delivery-option-date">${option.date}</div>
                  <div class="delivery-option-price">${option.priceCents === 0 ? 'FREE' : `$${(option.priceCents / 100).toFixed(2)}`} - Shipping</div>
                </div>
              </label>`).join('')}
          </div>
        </div>
      </div>`;
  }).join('');

  document.querySelectorAll('.js-delete-item').forEach((button) => {
    button.addEventListener('click', () => {
      cartStore.remove(button.dataset.productId);
      cart = cartStore.items;
      renderOrderSummary();
      renderPaymentSummary();
      updateCartHeader();
    });
  });

  document.querySelectorAll('.delivery-option-input').forEach((input) => {
    input.addEventListener('change', () => {
      cartStore.setDeliveryOption(input.dataset.productId, input.value);
      cart = cartStore.items;
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

function renderPaymentSummary() {
  const itemCount = getCartQuantity();
  const itemTotal = cart.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + product.priceCents * item.quantity;
  }, 0);
  const shippingCents = cart.reduce((total, item) => {
    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    return total + deliveryOption.priceCents * item.quantity;
  }, 0);
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
