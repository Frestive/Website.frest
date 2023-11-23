const cartItems = {};

// Dapatkan semua elemen "cart-btn"
const addToCartBtns = document.querySelectorAll('.cart-btn');

// Tambahkan event listener untuk setiap tombol "Add to cart"
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const productName = btn.getAttribute('data-product');
        const weight = parseFloat(btn.getAttribute('data-weight'));
        const price = parseFloat(btn.getAttribute('data-price'));
        if (!cartItems[productName]) {
            cartItems[productName] = { count: 0, weight: 0, price: price };
        }
        cartItems[productName].count++;
        cartItems[productName].weight += weight;
        updateCart();
    });
});

// Fungsi untuk memformat harga dengan koma sebagai pemisah ribuan
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
    let totalItems = 0;
    let totalWeight = 0;
    let totalPrice = 0;

    for (const item in cartItems) {
        totalItems += cartItems[item].count;
        totalWeight += cartItems[item].weight;
        totalPrice += cartItems[item].price * cartItems[item].count;
    }

    const cartQuantity = document.querySelector('.cart .quantity');
    if (cartQuantity) {
        cartQuantity.textContent = totalItems;
    }

    // Tambahkan event listener untuk ikon keranjang
    const cartIcon = document.querySelector('.cart');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            // Buat pesan WhatsApp berdasarkan produk yang ada di keranjang
            let message = "Halo FRESTIVE, saya ingin memesan:\n";
            let totalMessage = "";

            for (const item in cartItems) {
                if (cartItems[item].count > 0) {
                    const pricePerHalfKg = (cartItems[item].price / 0.5).toFixed(2); // Harga per 0.5 kg
                    const subTotalPrice = cartItems[item].price * cartItems[item].count;
                    totalMessage += `${item} (${cartItems[item].weight} kg) - ${formatCurrency(subTotalPrice)} (${formatCurrency(cartItems[item].price)} / 0.5 kg)\n`;
                }
            }

            message += totalMessage;

            // Tambahkan total berat dan total harga
            message += `Total berat keseluruhan: ${totalWeight} kg\n`;
            message += `Total harga keseluruhan: ${formatCurrency(totalPrice)}\n\n`;

            // Tambahkan informasi transfer
            message += "Silahkan transfer ke (234-898-898 a/n Ilum)\n";
            message += "Jika sudah, silahkan foto bukti transfer dan berikan alamat lengkap serta nama pemesan";

            //const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
            const whatsappURL = `https://api.whatsapp.com/send?phone=6281389338181&text=${encodeURIComponent(message)}`;

            window.location.href = whatsappURL;
        });
    }
}

const infoButton = document.getElementById('info-button');
const tooltip = document.getElementById('tooltip');

infoButton.addEventListener('click', () => {
  if (tooltip.style.display === 'block') {
    tooltip.style.display = 'none';
  } else {
    tooltip.style.display = 'block';
  }
});

const infoButtons = document.querySelectorAll('.info-button');
const descriptions = document.querySelectorAll('.product p');

// Menambahkan event listener untuk setiap tombol "!"
infoButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Tampilkan atau sembunyikan deskripsi sesuai dengan keadaan saat ini
        if (descriptions[index].style.display === 'block') {
            descriptions[index].style.display = 'none';
        } else {
            descriptions[index].style.display = 'block';
        }
    });
});

const incrementButtons = document.querySelectorAll('.increment-item');
const decrementButtons = document.querySelectorAll('.decrement-item');
const quantityDisplays = document.querySelectorAll('.quantity');

incrementButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const product = btn.getAttribute('data-product');
        const display = document.querySelector(`.product[data-product="${product}"] .quantity`);
        let count = parseInt(display.textContent) || 0;
        count++;
        display.textContent = count;
    });
});

decrementButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const product = btn.getAttribute('data-product');
        const display = document.querySelector(`.product[data-product="${product}"] .quantity`);
        let count = parseInt(display.textContent) || 0;
        if (count > 0) {
            count--;
            display.textContent = count;
        }
    });
});


