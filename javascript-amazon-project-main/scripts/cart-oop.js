class CartStore {
	constructor(storageKey = 'amazon-cart') {
		this.storageKey = storageKey;
		this.items = this.load();
		this.save();
	}

	load() {
		try {
			const storedItems = JSON.parse(localStorage.getItem(this.storageKey)) || [];
			return storedItems.map((item) => ({
				...item,
				deliveryOptionId: item.deliveryOptionId || '1'
			}));
		} catch (error) {
			return [];
		}
	}

	save() {
		localStorage.setItem(this.storageKey, JSON.stringify(this.items));
	}

	add(productId, quantity = 1) {
		const matchingItem = this.items.find((item) => item.productId === productId);

		if (matchingItem) {
			matchingItem.quantity += quantity;
		} else {
			this.items.push({ productId, quantity, deliveryOptionId: '1' });
		}

		this.save();
	}

	remove(productId) {
		this.items = this.items.filter((item) => item.productId !== productId);
		this.save();
	}

	setDeliveryOption(productId, deliveryOptionId) {
		const item = this.items.find((cartItem) => cartItem.productId === productId);

		if (item) {
			item.deliveryOptionId = deliveryOptionId;
			this.save();
		}
	}

	getQuantity() {
		return this.items.reduce((total, item) => total + item.quantity, 0);
	}
}