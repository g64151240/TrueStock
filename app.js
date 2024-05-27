document.addEventListener('DOMContentLoaded', function() {
  const stockTableBody = document.getElementById('stockTableBody');
  const addProductBtn = document.getElementById('addProductBtn');
  const productModal = document.getElementById('productModal');
  const closeModal = document.getElementsByClassName('close')[0];
  const productForm = document.getElementById('productForm');

  let products = [];

  function renderTable() {
    stockTableBody.innerHTML = '';
    products.forEach((product, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.productId}</td>
        <td>${product.productName}</td>
        <td>${product.price}</td>
        <td><img src="${product.imageUrl}" alt="${product.productName}" style="width: 50px;"></td>
        <td>${product.variants}</td>
        <td>${product.description}</td>
        <td>
          <button onclick="editProduct(${index})">Edit</button>
          <button onclick="deleteProduct(${index})">Delete</button>
        </td>
      `;
      stockTableBody.appendChild(row);
    });
  }

  function openModal() {
    productModal.style.display = 'block';
  }

  function closeModalFunc() {
    productModal.style.display = 'none';
  }

  addProductBtn.addEventListener('click', function() {
    openModal();
    productForm.reset();
  });

  closeModal.addEventListener('click', closeModalFunc);

  window.onclick = function(event) {
    if (event.target == productModal) {
      closeModalFunc();
    }
  }

  productForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(productForm);
    const newProduct = {
      productId: formData.get('productId') || new Date().getTime().toString(),
      productName: formData.get('productName'),
      price: formData.get('price'),
      imageUrl: formData.get('imageUrl'),
      variants: formData.get('variants'),
      description: formData.get('description'),
    };
    
    if (formData.get('productId')) {
      const index = products.findIndex(p => p.productId === formData.get('productId'));
      products[index] = newProduct;
    } else {
      products.push(newProduct);
    }

    renderTable();
    closeModalFunc();
  });

  window.editProduct = function(index) {
    openModal();
    const product = products[index];
    document.getElementById('productId').value = product.productId;
    document.getElementById('productName').value = product.productName;
    document.getElementById('price').value = product.price;
    document.getElementById('imageUrl').value = product.imageUrl;
    document.getElementById('variants').value = product.variants;
    document.getElementById('description').value = product.description;
  };

  window.deleteProduct = function(index) {
    products.splice(index, 1);
    renderTable();
  };

  renderTable();
});
