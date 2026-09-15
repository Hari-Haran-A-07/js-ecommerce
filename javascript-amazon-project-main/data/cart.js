const cartStorageKey = 'amazon-cart';

let cart;

try {
	cart = JSON.parse(localStorage.getItem(cartStorageKey)) || [];
} catch (error) {
	cart = [];
}

function saveCart() {
	localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function getCartQuantity() {
	return cart.reduce((total, item) => total + item.quantity, 0);
}

document.querySelectorAll('.js-cart-quantity').forEach((element) => {
	element.innerHTML = getCartQuantity();
});