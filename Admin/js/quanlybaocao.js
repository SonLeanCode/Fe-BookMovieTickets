 fetch('/db.json')
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data.Products)) {

    // tính tổng sản phẩm
    const totalProducts = data.Products.length;
    document.getElementById('TotalProducts').innerHTML = totalProducts + ' Sản phẩm';
    // End tính tổng sản phẩm

  // Tính hết hàng sản phẩm
    const stockProducts = data.Products.filter(product => product.quantity === 0);
    document.getElementById('stockProducts').innerHTML = stockProducts.length + ' Sản phẩm hết hàng';

    // Hiển thị sản phẩm bán hết
    var tableBody = document.querySelector('#sampleTableStock tbody');
    stockProducts.forEach(product => {
    var tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td><img src="/image/${product.image1}" alt="" width="100px"; height="100px"></td>
        <td>${product.quantity}</td>
        <td><span class="badge bg-danger">Hết hàng</span></td>
        <td>${product.price} đ</td>
        <td>${product.material}</td>
    `;
    tableBody.appendChild(tr);
    });
    // END hiển thị sản phẩm bán hết

    // Tính tổng số đơn hàng
     if (Array.isArray(data.Orders)) {
        const totalOrders = data.Orders.length;
        document.getElementById('TotalOrders').innerHTML = totalOrders + ' Đơn hàng';
      } else {
        console.error('Dữ liệu Orders không phải là một mảng.');
      }

    } else {
      console.error('Dữ liệu Products không phải là một mảng.');
    }
     // END Tính tổng số đơn hàng

  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Lỗi:', error);
  });