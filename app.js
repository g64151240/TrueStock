document.addEventListener('DOMContentLoaded', () => {
    const addProductButton = document.getElementById('addProductButton');
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('closeButton');
    const productForm = document.getElementById('productForm');
    const productTableBody = document.querySelector('#productTable tbody');

    const products = [];

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        productForm.reset();
    }

    function renderProducts() {
        productTableBody.innerHTML = '';
        products.forEach((product, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${product.productId}</td>
                <td>${product.productName}</td>
                <td>${product.price}</td>
                <td><img src="${product.imageUrl}" alt="${product.productName}" width="50"></td>
                <td>${product.variants}</td>
                <td>${product.description}</td>
                <td>
                    <button onclick="editProduct(${index})">Edit</button>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </td>
            `;

            productTableBody.appendChild(row);
        });
    }

    function addProduct(event) {
        event.preventDefault();

        const newProduct = {
            productId: productForm.productId.value,
            productName: productForm.productName.value,
            price: productForm.price.value,
            imageUrl: productForm.imageUrl.value,
            variants: productForm.variants.value,
            description: productForm.description.value,
        };

        products.push(newProduct);
        renderProducts();
        closeModal();
    }

    window.editProduct = (index) => {
        const product = products[index];
        productForm.productId.value = product.productId;
        productForm.productName.value = product.productName;
        productForm.price.value = product.price;
        productForm.imageUrl.value = product.imageUrl;
        productForm.variants.value = product.variants;
        productForm.description.value = product.description;

        openModal();
        productForm.onsubmit = (e) => {
            e.preventDefault();
            products[index] = {
                productId: productForm.productId.value,
                productName: productForm.productName.value,
                price: productForm.price.value,
                imageUrl: productForm.imageUrl.value,
                variants: productForm.variants.value,
                description: productForm.description.value,
            };
            renderProducts();
            closeModal();
            productForm.onsubmit = addProduct;
        };
    };

    window.deleteProduct = (index) => {
        products.splice(index, 1);
        renderProducts();
    };

    addProductButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    productForm.addEventListener('submit', addProduct);

    window.onclick = (event) => {
        if (event.target == modal) {
            closeModal();
        }
    };
});
