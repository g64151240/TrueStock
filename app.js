document.addEventListener('DOMContentLoaded', () => {
    const productTable = document.getElementById('productTable').querySelector('tbody');
    const addProductButton = document.getElementById('addProductButton');
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('closeButton');
    const productForm = document.getElementById('productForm');

    const products = [];

    function renderProducts() {
        productTable.innerHTML = '';
        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.productId}</td>
                <td>${product.productName}</td>
                <td>${product.price}</td>
                <td><img src="${product.imageUrl}" alt="${product.productName}" width="50"></td>
                <td>${product.variants}</td>
                <td>${product.description}</td>
                <td><button onclick="editProduct(${index})">Edit</button> <button onclick="deleteProduct(${index})">Delete</button></td>
            `;
            productTable.appendChild(row);
        });
    }

    function addProduct(product) {
        products.push(product);
        renderProducts();
    }

    function editProduct(index) {
        const product = products[index];
        productForm.productId.value = product.productId;
        productForm.productName.value = product.productName;
        productForm.price.value = product.price;
        productForm.imageUrl.value = product.imageUrl;
        productForm.variants.value = product.variants;
        productForm.description.value = product.description;
        addProductButton.textContent = 'Update Product';
        addProductButton.onclick = () => updateProduct(index);
        modal.style.display = 'block';
    }

    function updateProduct(index) {
        const product = {
            productId: productForm.productId.value,
            productName: productForm.productName.value,
            price: productForm.price.value,
            imageUrl: productForm.imageUrl.value,
            variants: productForm.variants.value,
            description: productForm.description.value
        };
        products[index] = product;
        renderProducts();
        modal.style.display = 'none';
        productForm.reset();
        addProductButton.textContent = 'Add Product';
        addProductButton.onclick = showAddProductModal;
    }

    function deleteProduct(index) {
        products.splice(index, 1);
        renderProducts();
    }

    function showAddProductModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        productForm.reset();
        addProductButton.textContent = 'Add Product';
        addProductButton.onclick = showAddProductModal;
    }

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const product = {
            productId: productForm.productId.value,
            productName: productForm.productName.value,
            price: productForm.price.value,
            imageUrl: productForm.imageUrl.value,
            variants: productForm.variants.value,
            description: productForm.description.value
        };
        addProduct(product);
        modal.style.display = 'none';
        productForm.reset();
    });

    addProductButton.addEventListener('click', showAddProductModal);
    closeButton.addEventListener('click', closeModal);

    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };
});
