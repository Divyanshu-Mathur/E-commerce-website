let cartItems = [];


function handleProduct(itemName, price) {
    const cartItems = getCartItemsFromStorage();
    const index = cartItems.findIndex(item => item.name === itemName);
    if (index !== -1) {
        // If item is already in cart, increment quantity
        cartItems[index].quantity++;
    } else {
        // If item is not in cart, add it with quantity 1
        cartItems.push({ name: itemName, price: price, quantity: 1 });
    }
    updateCartAndStore(cartItems);

}

// Rest of your code...


// Rest of your code...

function removeFromCart(index) {
    let cartItems = getCartItemsFromStorage();
    cartItems.splice(index, 1);
    updateCartAndStore(cartItems);
}

function clearCart() {
    updateCartAndStore([]);

}

/*function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    return total;
}*/
function updateCart(cartItems) {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartItemCount = document.getElementById('cart-item-count');
    cartList.innerHTML = '';
    let total = 0;
    let itemCount = 0; // Initialize itemCount variable
    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.onclick = function () {
            decreaseQuantity(index);
        };

        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = item.quantity;

        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.onclick = function () {
            increaseQuantity(index);
        };

        li.textContent = `${item.name} - Rs.${item.price * item.quantity} - `;
        li.appendChild(decreaseBtn);
        li.appendChild(quantitySpan);
        li.appendChild(increaseBtn);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = function () {
            removeFromCart(index);
        };
        li.appendChild(removeBtn);

        cartList.appendChild(li);
        total += item.price * item.quantity;
        itemCount += item.quantity; // Increment itemCount with the quantity of each item
    });
    cartTotal.textContent = total;
    cartItemCount.textContent = itemCount; // Update cart count with itemCount

}


function showCart() {
    const cart = document.getElementById('cart');
    if (cart.style.display === 'block') {
        cart.style.display = 'none';
    } else {
        cart.style.display = 'block';
    }
}
function decreaseQuantity(index) {
    let cartItems = getCartItemsFromStorage();
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        updateCartAndStore(cartItems);
    }
}

function increaseQuantity(index) {
    let cartItems = getCartItemsFromStorage();
    cartItems[index].quantity++;
    updateCartAndStore(cartItems);
}



function checkout(event) {
    // Prevent form submission
    event.preventDefault();

    // Display the thank you message
    document.getElementById("thank-you-message").style.display = "block";

    // Clear the cart
    clearCart();

    // Hide the form
    document.getElementById("checkout-form").style.display = "none";
}



// Your existing JavaScript code

function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    var chatBox = document.getElementById("chat-box");

    // Display user message
    chatBox.innerHTML += "<p><strong>You:</strong> " + userInput + "</p>";

    // Respond with a predefined message
    var botResponse = getBotResponse(userInput);
    chatBox.innerHTML += "<p><strong>ChatBot:</strong> " + botResponse + "</p>";

    // Clear user input
    document.getElementById("user-input").value = "";

    // Scroll to bottom of chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userInput) {
    // Add your predefined responses here
    switch (userInput.toLowerCase()) {
        case "hello":
            return "Hello! How can I assist you today?";
        case "how are you":
            return "I'm just a bot, but thank you for asking!";
        case "bye":
            return "Goodbye! Have a great day!";
        default:
            return "I'm sorry, I don't understand. Can you please rephrase?";
    }
}

function hideCart() {
    document.getElementById("cart").style.display = "none";
}


function showChatbot() {
    document.getElementById("chatbot").style.display = "block";
}

function hideChatbot() {
    document.getElementById("chatbot").style.display = "none";
}



// Function to update cart and store it in localStorage
function updateCartAndStore(cartItems) {
    // Update the cart display as usual
    updateCart(cartItems);

    // Store the cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to retrieve cart items from localStorage
function getCartItemsFromStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
}

// Call this function when the page loads to populate the cart from localStorage
window.onload = function () {
    const cartItems = getCartItemsFromStorage();
    updateCart(cartItems);
};





