fetch('http://localhost:3000/product/id')
  .then(response => response.json())
  .then((data: any[]) => {
    if (Array.isArray(data)) {
      data.forEach((products: any) => {
        // Hiển thị thông tin comment trong trang admin
        const tr = document.createElement('tr');

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
         const tableBody: HTMLTableSectionElement | null = document.querySelector('#sampleTable tbody');
         if (tableBody) {
           tableBody.appendChild(tr);
         }

      });
    
  // Lấy tất cả các phần tử có class là 'edit'
  const editButtons = document.querySelectorAll('.edit');

  function getProductById(products: any[], id: string): any | null {
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
  editButtons.forEach(function (editButton: Element) {
    editButton.addEventListener('click', function (event) {
      event.preventDefault();

      // In ra giá trị ID của sản phẩm
      const tr:any = editButton.closest('tr');
      const tidElement: HTMLTableDataCellElement | null = tr.querySelector('.productId');
      const idfix: string = tidElement ? tidElement.innerText : '';
      
      // Tìm sản phẩm dựa trên ID
      const product = getProductById(data, idfix);
      // console.log(product);

      if (product) {
        // Cập nhật các trường trong form với thông tin sản phẩm đã tìm thấy
        const productIdInput: HTMLInputElement | null = document.getElementById('productsId') as HTMLInputElement;
        const productNameInput: HTMLInputElement | null = document.getElementById('productsName') as HTMLInputElement;
        const productQuantityInput: HTMLInputElement | null = document.getElementById('productQuantity') as HTMLInputElement;
        const productPriceInput: HTMLInputElement | null = document.getElementById('productPrice') as HTMLInputElement;
        const productMaterialInput: HTMLInputElement | null = document.getElementById('productMaterial') as HTMLInputElement;
        const Image1: HTMLImageElement | null = document.getElementById('Image1') as HTMLImageElement;
        const Image2: HTMLImageElement | null = document.getElementById('Image2') as HTMLImageElement;

        // Cập nhật giá trị của các trường
        if (productIdInput) productIdInput.value = product._id;
        if (productNameInput) productNameInput.value = product.name;
        if (productQuantityInput) productQuantityInput.value = product.quantity;
        if (productPriceInput) productPriceInput.value = product.price;
        if (productMaterialInput) productMaterialInput.value = product.material;
        // if (Image1) Image1.src = product.image1;
        // if (Image2) Image2.src = product.image2;
      } else {
        alert('Không tìm thấy sản phẩm với ID: ' + idfix);
      }
      // console.log(product);
    });
  });

  // Sự kiện khi lưu lại sau khi cập nhật
const saveButton: HTMLElement | null = document.getElementById('saveFixProducts');
if (saveButton) {
  saveButton.addEventListener('click', function() {

  // Lấy giá trị từ các trường nhập liệu trong biểu mẫu
  const productIdInput: HTMLInputElement | null = document.getElementById('productsId') as HTMLInputElement;
  const productNameInput: HTMLInputElement | null = document.getElementById('productsName') as HTMLInputElement;
  const productQuantityInput: HTMLInputElement | null = document.getElementById('productQuantity') as HTMLInputElement;
  const productPriceInput: HTMLInputElement | null = document.getElementById('productPrice') as HTMLInputElement;
  const productMaterialInput: HTMLInputElement | null = document.getElementById('productMaterial') as HTMLInputElement;
  const Image1: HTMLImageElement | null = document.getElementById('image1') as HTMLImageElement;
  const Image2: HTMLImageElement | null = document.getElementById('image2') as HTMLImageElement;

  // Lấy giá trị ID sản phẩm
  const productId: string = productIdInput ? productIdInput.value : '';

  // Tìm sản phẩm trong mảng dữ liệu
  const productToUpdate = getProductById(data, productId);

  if (productToUpdate) {
    var isProductNameExists = data.some(function (existingProduct) {
      return existingProduct.name === productNameInput.value && existingProduct._id !== productId;
    });

    if (isProductNameExists) {
      alert('Tên sản phẩm đã tồn tại trong dữ liệu. Vui lòng chọn một tên khác.');
      return; // Ngăn chặn việc tiếp tục thực hiện khi tên sản phẩm trùng
    }
    // Cập nhật thông tin sản phẩm
    productToUpdate.id = productId;
    if (productNameInput) productToUpdate.name = productNameInput.value;
    if (productQuantityInput) productToUpdate.quantity = productQuantityInput.value;
    if (productPriceInput) productToUpdate.price = productPriceInput.value;
    if (productMaterialInput) productToUpdate.material = productMaterialInput.value;
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
        window.location.reload();
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật dữ liệu:', error);
       
      });
  } else {
    alert('Không tìm thấy sản phẩm với ID: ' + productId);
  }
});
}
  } else {
    console.error('Dữ liệu Comments không phải là một mảng.');
  }
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Lỗi:', error);
  });


