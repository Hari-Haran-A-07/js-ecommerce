const cartStorageKey = 'amazon-cart';

let cart;

try {
	cart = JSON.parse(localStorage.getItem(cartStorageKey)) || [];
} catch (error) {
	cart = [];
}

cart = cart.map((item) => ({
	...item,
	deliveryOptionId: item.deliveryOptionId || '1'
}));

function saveCart() {
	localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

saveCart();

function getCartQuantity() {
	return cart.reduce((total, item) => total + item.quantity, 0);
}

document.querySelectorAll('.js-cart-quantity').forEach((element) => {
	element.innerHTML = getCartQuantity();
});