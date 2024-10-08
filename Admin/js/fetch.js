fetch('http://localhost:3000/product/id')
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data)) {
      data.forEach(products => {
        // Hiển thị thông tin comment trong trang admin
        var tr = document.createElement('tr');

        tr.innerHTML = `
        <tr>
            <td width="10"><input type="checkbox" name="check1" value="1"></td>
            <td class="productId">${products._id}</td>
            <td>${products.name}</td>
            <td><img src="/BackEnd/public/images/${products.image1}" alt="" width="100px"; height="100px";></td>
            <td>${products.quantity}</td>
            <td><span class="${products.quantity == 0 ? 'badge bg-danger' : 'badge bg-success'}">${products.quantity > 0 ? "Còn hàng" : "Hết hàng"}</span></td>
            <td>${products.price}.000 đ</td>
            <td>${products.material}</td>
            <td><button class="btn btn-primary btn-sm trash" type="button" title="Xóa"
            onclick="deleteRow(this.parentNode.parentNode)"><i class="fas fa-trash-alt"></i> 
                </button>
                <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp" data-toggle="modal"
                data-target="#ModalUP"><i class="fas fa-edit"></i></button>
            </td>
        </tr>
        `;
         // Hiển thị thông tin sản phẩm trong bảng
         var tableBody = document.querySelector('#sampleTable tbody');
         tableBody.appendChild(tr);

      });
    
  // Lấy tất cả các phần tử có class là 'edit'
  var editButtons = document.getElementsByClassName('edit');

  function getProductById(products, id) {
    // Kiểm tra xem products có tồn tại và có phải là một mảng không
    if (Array.isArray(products) && products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        if (products[i]._id === id) {
          return products[i];
        }
      }
    }
    return null; // Trả về null nếu không tìm thấy sản phẩm hoặc products không hợp lệ
  } 
  

  // Gán sự kiện click cho tất cả các phần tử
  Array.from(editButtons).forEach(function (editButton) {
    editButton.addEventListener('click', function (event) {
      event.preventDefault();

      // In ra giá trị ID của sản phẩm
      var tr = this.closest('tr');
      var tidElement = tr.querySelector('.productId');
      var idfix = tidElement.innerText;
      
      // Tìm sản phẩm dựa trên ID
      var product = getProductById(data, idfix);
      // console.log(product);

      if (product) {
        // Kiểm tra xem tên sản phẩm đã tồn tại trong dữ liệu không
        var productNameInput = document.getElementById('productsName');
        var productIdInput = document.getElementById('productsId');
        var productQuantityInput = document.getElementById('productQuantity');
        var productPriceInput = document.getElementById('productPrice');
        var productMaterialInput = document.getElementById('productMaterial');
        var Image1 = document.getElementById('Image1');
        var Image2 = document.getElementById('Image2');

        // Cập nhật giá trị của các trường
        productIdInput.value = product._id;
        productNameInput.value = product.name;
        productQuantityInput.value = product.quantity;
        productPriceInput.value = product.price;
        productMaterialInput.value = product.material;
        // Image1.src = product.image1;
        // Image2.src = product.image2;
    } else {
        alert('Không tìm thấy sản phẩm với ID:', idfix);
    }
      // console.log(product);
    });
  });

  // Sự kiện khi lưu lại sau khi cập nhật
var saveButton = document.getElementById('saveFixProducts');
saveButton.addEventListener('click', function() {

  // Lấy giá trị từ các trường nhập liệu trong biểu mẫu
  var productIdInput = document.getElementById('productsId');
  var productNameInput = document.getElementById('productsName');
  var productQuantityInput = document.getElementById('productQuantity');
  var productPriceInput = document.getElementById('productPrice');
  var productMaterialInput = document.getElementById('productMaterial');
  var Image1 = document.getElementById('image1');
  var Image2 = document.getElementById('image2');

  // Lấy giá trị ID sản phẩm
  var productId = productIdInput.value;

  // Tìm sản phẩm trong mảng dữ liệu
  var productToUpdate = getProductById(data, productId);

  if (productToUpdate) {
    // Kiểm tra xem tên sản phẩm đã tồn tại trong dữ liệu không
    var isProductNameExists = data.some(function (existingProduct) {
      return existingProduct.name === productNameInput.value && existingProduct._id !== productId;
    });

    if (isProductNameExists) {
      alert('Tên sản phẩm đã tồn tại trong dữ liệu. Vui lòng chọn một tên khác.');
      return; // Ngăn chặn việc tiếp tục thực hiện khi tên sản phẩm trùng
    }
    // Cập nhật thông tin sản phẩm
    productToUpdate.id = productId;
    productToUpdate.name = productNameInput.value;
    productToUpdate.quantity = productQuantityInput.value;
    productToUpdate.price = productPriceInput.value;
    productToUpdate.material = productMaterialInput.value;
    // productToUpdate.image1 = Image1.src;
    // productToUpdate.image2 = Image2.src;

    // Gửi yêu cầu PUT để cập nhật dữ liệu trong db.json
    fetch(`http://localhost:3000/product/edit/fix/` + productId ,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productToUpdate)
    })
      .then(response => response.json())
      .then(result => {
        console.log('Dữ liệu đã được cập nhật trong db.json:', result);
        swal({
          title: "Sửa thành công!",
          icon: "success"
      }).then(() => {
          window.location.reload();
      });
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật dữ liệu:', error);
        swal({
          title: "Sửa thành công!",
          icon: "success"
      }).then(() => {
          window.location.reload();
      });
      });
  } else {
    alert('Không tìm thấy sản phẩm với ID: ' + productId);
  }
});
  } else {
    console.error('Dữ liệu Comments không phải là một mảng.');
  }
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Lỗi:', error);
  });

//   console.log('tui bon kido')