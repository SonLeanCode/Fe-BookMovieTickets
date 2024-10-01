
  const products = [
    {
      name: "Áo Polo nam thêu hình con hổ PL2M2025",
      description: "Vải Áo Polo nam thêu hình có độ bền cao tại Việt Nam.",
      imageUrl:
        "https://www.thecoth.com/imagecache/product-gallery/wp-content/uploads/2022/05/lHcAs6FLcyDTq9nmOVSXazprLRTfhVm8dj9DLFux.webp",
      price: "$10.00",
    },
    {
      name: "Áo Polo nam thêu hình con hổ PL2M2025",
      description: "Vải Áo Polo nam thêu hình có độ bền cao tại Việt Nam.",
      imageUrl:
        "https://www.thecoth.com/imagecache/product-gallery/wp-content/uploads/2022/05/lHcAs6FLcyDTq9nmOVSXazprLRTfhVm8dj9DLFux.webp",
      price: "$20.00",
    },
    {
      name: "Áo Polo nam thêu hình con hổ PL2M2025",
      description: "Vải Áo Polo nam thêu hình có độ bền cao tại Việt Nam.",
      imageUrl:
        "https://www.thecoth.com/imagecache/product-gallery/wp-content/uploads/2022/05/lHcAs6FLcyDTq9nmOVSXazprLRTfhVm8dj9DLFux.webp",
      price: "$30.00",
    },
  ];

  const displayProducts = (products) => {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    products.forEach((product, index) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";

      const productHtml = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p><strong>${product.price}</strong></p>
            <button class="edit-btn" data-index="${index}">Sửa</button>
            <button class="delete-btn" data-index="${index}">Xóa</button>
        `;

      productDiv.innerHTML = productHtml;
      productDiv.addEventListener("click", () => showPopup(product));
      container.appendChild(productDiv);
    });

    // Thêm sự kiện cho nút xóa
    document.querySelectorAll(".delete-btn").forEach((button) =>
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        deleteProduct(index);
      })
    );

    // Thêm sự kiện cho nút sửa
    document.querySelectorAll(".edit-btn").forEach((button) =>
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        editProduct(index);
      })
    );
  };

  const deleteProduct = (index) => {
    products.splice(index, 1); // Xóa sản phẩm
    displayProducts(products); // Cập nhật hiển thị
  };

  const editProduct = (index) => {
    const product = products[index];
    const newName = prompt("Nhập tên sản phẩm mới:", product.name);
    const newDescription = prompt("Nhập mô tả sản phẩm mới:", product.description);
    const newPrice = prompt("Nhập giá sản phẩm mới:", product.price);

    if (newName && newDescription && newPrice) {
      products[index] = {
        ...product,
        name: newName,
description: newDescription,
        price: newPrice,
      };
      displayProducts(products); // Cập nhật hiển thị
    }
  };

  const showPopup = (product) => {
    document.getElementById("popup-image").src = product.imageUrl;
    document.getElementById("popup-name").textContent = product.name;
    document.getElementById("popup-description").textContent =
      product.description;
    document.getElementById("popup-price").textContent = product.price;
    document.getElementById("popup").style.display = "flex";
  };

  document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
  });

  displayProducts(products);