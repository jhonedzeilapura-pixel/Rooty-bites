// ================= PRODUCT DATA =================

const products = {

    bbq: {
        id: "bbq",
        name: "BBQ Flavor",
        price: 15,
        image: "Bbq.jpg"
    },

    cheese: {
        id: "cheese",
        name: "Cheese Flavor",
        price: 15,
        image: "Cheese.jpg"
    },

    sour: {
        id: "sour",
        name: "Sour Cream",
        price: 15,
        image: "Sour-cream.jpg"
    }

};


// ================= CART =================

let cart = [];


// ================= PRODUCT QUANTITY =================

const productQuantities = {
    bbq: 1,
    cheese: 1,
    sour: 1
};


function changeQuantity(productId, amount) {

    let newQuantity = productQuantities[productId] + amount;

    if (newQuantity < 1) {
        newQuantity = 1;
    }

    if (newQuantity > 99) {
        newQuantity = 99;
    }

    productQuantities[productId] = newQuantity;

    const quantityElement = document.getElementById(`qty-${productId}`);

    if (quantityElement) {
        quantityElement.textContent = newQuantity;
    }
}




// ================= ADD TO CART =================

function addToCart(productId) {

    const product = products[productId];

    const quantity =
        productQuantities[productId];

    const existingProduct =
        cart.find(item => item.id === productId);


    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity

        });

    }


    updateCart();

    openCart();

}


// ================= UPDATE CART =================

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");


    let total = 0;
    let itemCount = 0;


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-message">
                Your cart is empty.
            </p>
        `;

        checkoutItems.innerHTML = `
            <p class="empty-message">
                Your cart is empty.
            </p>
        `;

    } else {

        cartItems.innerHTML = "";

        checkoutItems.innerHTML = "";


        cart.forEach(item => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            itemCount += item.quantity;


            // CART SIDEBAR

            cartItems.innerHTML += `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="cart-item-info">

                        <h4>${item.name}</h4>

                        <p>
                            ₱${item.price}
                        </p>

                        <div class="cart-controls">

                            <button
                                onclick="updateCartQuantity('${item.id}', -1)">
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="updateCartQuantity('${item.id}', 1)">
                                +
                            </button>

                            <button
                                class="remove-button"
                                onclick="removeFromCart('${item.id}')">

                                Remove

                            </button>

                        </div>

                    </div>

                </div>

            `;


            // CHECKOUT SUMMARY

            checkoutItems.innerHTML += `

                <div class="checkout-item">

                    <div class="checkout-item-info">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                        <div>

                            <strong>
                                ${item.name}
                            </strong>

                            <br>

                            <small>
                                ${item.quantity} × ₱${item.price}
                            </small>

                        </div>

                    </div>

                    <strong>
                        ₱${itemTotal}
                    </strong>

                </div>

            `;

        });

    }


    cartCount.textContent = itemCount;

    cartTotal.textContent = `₱${total.toFixed(2)}`;
        

    checkoutTotal.textContent =`₱${total.toFixed(2)}`;
        

}


// ================= CHANGE CART QUANTITY =================

function updateCartQuantity(productId, amount) {

    const item =
        cart.find(product => product.id === productId);

    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(product => product.id !== productId);

    }


    updateCart();

}


// ================= REMOVE FROM CART =================

function removeFromCart(productId) {

    cart =
        cart.filter(product => product.id !== productId);

    updateCart();

}


// ================= OPEN CART =================

function openCart() {

    document
        .getElementById("cart-sidebar")
        .classList.add("active");

    document
        .getElementById("cart-overlay")
        .classList.add("active");

}


// ================= CLOSE CART =================

function closeCart() {

    document
        .getElementById("cart-sidebar")
        .classList.remove("active");

    document
        .getElementById("cart-overlay")
        .classList.remove("active");

}


// ================= GO TO CHECKOUT =================

function goToCheckout() {

    closeCart();

    document
        .getElementById("checkout")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= PLACE ORDER =================

document
    .getElementById("orderForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a product first."
            );

            return;

        }


        const customerName =
            document
                .getElementById("customerName")
                .value
                .trim();


        const contactNumber =
            document
                .getElementById("contactNumber")
                .value
                .trim();


        const orderOption =
            document
                .getElementById("orderOption")
                .value;


        const address =
            document
                .getElementById("address")
                .value
                .trim();


        let total = 0;

        let orderList = "";


        cart.forEach(item => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            orderList +=`;${item.name} × ${item.quantity}<br>`;
                

        });


        const successMessage = document
            .getElementById("success-message");


        successMessage.innerHTML = `

            Thank you,
            <strong>${customerName}</strong>! 🎉

            <br><br>

            <strong>Order:</strong><br>

            ${orderList}

            <br>

            <strong>Total: ₱${total}</strong>

            <br><br>

            <strong>Contact:</strong>
            ${contactNumber}

            <br>

            <strong>Option:</strong>
            ${orderOption}

            <br>

            <strong>Address:</strong>
            ${address}

        `;


        document
            .getElementById("success-modal")
            .classList.add("active");


        // Clear cart

        cart = [];

        updateCart();

        this.reset();

    });


// ================= CLOSE SUCCESS =================

function closeSuccess() {

    document
        .getElementById("success-modal")
        .classList.remove("active");

}


// ================= INITIALIZE =================
updateCart()
