const cartStore = new CartStore();
let cart = cartStore.items;

function saveCart() {
  cartStore.items = cart;
  cartStore.save();
}

function getCartQuantity() {
	return cartStore.getQuantity();
}

document.querySelectorAll('.js-cart-quantity').forEach((element) => {
	element.innerHTML = getCartQuantity();
});