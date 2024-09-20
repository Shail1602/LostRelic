// app.js

document.addEventListener('DOMContentLoaded', function() {
    const csvFilePath = 'books.csv';
    let books = [];
    let cart = [];

    // Function to parse CSV data
    function parseCSV(filePath, callback) {
        Papa.parse(filePath, {
            download: true,
            header: true,
            complete: function(results) {
                callback(results.data);
            },
            error: function(error) {
                console.error('Error reading CSV file:', error);
            }
        });
    }

    // Function to display books
    function displayBooks(bookList) {
        const bookListContainer = document.getElementById('book-list');
        bookListContainer.innerHTML = ''; // Clear previous content

        bookList.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = 
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Price: $${book.price}</p>
                <button onclick="addToCart('${book.title}')">Add to Cart</button>
            ;
            bookListContainer.appendChild(bookItem);
        });
    }

    // Function to search books
    window.searchBooks = function() {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchInput) ||
            book.author.toLowerCase().includes(searchInput)
        );
        displayBooks(filteredBooks);
    }

    // Function to add book to cart
    window.addToCart = function(title) {
        const book = books.find(b => b.title === title);
        if (book) {
            cart.push(book);
            updateCart();
        }
    }

    // Function to update cart display
    function updateCart() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = ''; // Clear previous content

        cart.forEach(book => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = 
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Price: $${book.price}</p>
                <button onclick="removeFromCart('${book.title}')">Remove</button>
            ;
            cartList.appendChild(cartItem);
        });
        updateTotal();
    }

    // Function to remove book from cart
    window.removeFromCart = function(title) {
        cart = cart.filter(b => b.title !== title);
        updateCart();
    }

    // Function to update total price
    function updateTotal() {
        const total = cart.reduce((sum, book) => sum + parseFloat(book.price), 0);
        document.getElementById('total-price').textContent = Total: $${total.toFixed(2)};
    }

    // Function to handle checkout
    window.checkout = function() {
        alert('Checkout complete!');
        cart = [];
        updateCart();
        document.getElementById('order-confirmation').style.display = 'block';
    }

    // Function to display order confirmation
    function showOrderConfirmation() {
        document.getElementById('order-confirmation').style.display = 'block';
    }

    // Function to display order history (mockup)
    window.viewOrderHistory = function() {
        alert('Viewing order history!');
    }

    // Function to show admin dashboard
    window.showAdminDashboard = function() {
        alert('Admin Dashboard!');
    }

    // Load books data
    parseCSV(csvFilePath, function(data) {
        books = data;
        displayBooks(books);
    });
});