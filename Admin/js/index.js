fetch('http://localhost:3000/index')
.then(response => response.json())
.then(data => {
  // console.log(data);
  if (Array.isArray(data.users)) {
  // tính tổng khách hàng
  const totalUsers = data.users.length;
  document.getElementById('totalCustomers').innerHTML = totalUsers + ' khách hàng';

  // khách hàng mới
  for (let i = 0; i < data.users.length; i++) {
    var tr = document.createElement('tr');

    tr.innerHTML = `
    <tr>
       <td>${data.users[i]._id}</td>
       <td>${data.users[i].name}</td>
       <td>${data.users[i].birthday}</td>
       <td>${data.users[i].phone}</span></td>
   </tr>
    `;
     // Hiển thị thông tin sản phẩm trong bảng
     var tableBody = document.querySelector('#sampleTable2 tbody');
     tableBody.appendChild(tr);
  }
  // End tính tổng khách hàng

  // tính tổng sản phẩm
   if(Array.isArray(data.products)) {
     const totalProducts = data.products.length;
     document.getElementById('totalProduct').innerHTML = totalProducts + ' sản phẩm';

    // Tính hết hàng sản phẩm
    const stockProducts = data.products.filter(product => product.quantity === 0);
    document.getElementById('totalStocks').innerHTML = stockProducts.length + ' Sản phẩm';
    }
    // End tính tổng sản phẩm

    // tính tổng đơn hàng
   if(Array.isArray(data.bills)){
    for (let i = 0; i < data.bills.length; i++) {
    const totalOrders = data.bills.length;
    document.getElementById('totalOrder').innerHTML = totalOrders + ' đơn hàng';

     // Hiển thị thông tin comment trong trang admin
     var tr = document.createElement('tr');

     tr.innerHTML = `
     <tr>
        <td>${data.bills[i]._id}</td>
        <td>${data.bills[i].name_user}</td>
        <td>${data.bills[i].total} đ</td>
        <td><span class="badge ${data.bills[i].active === 'Đang giao hàng' ? 'bg-warning' : (data.bills[i].active === 'Chờ duyệt' ? 'bg-info' : (data.bills[i].active === 'Đã hoàn thành' ? 'bg-success' :  (data.bills[i].active === 'Đã hủy' ? 'bg-danger' : '')))}">${data.bills[i].active}</span></td>
    </tr>
     `;
      // Hiển thị thông tin sản phẩm trong bảng
      var tableBody = document.querySelector('#sampleTable tbody');
      tableBody.appendChild(tr);
    }
   }
    // End tính tổng đơn hàng

  } else {
    console.error('Dữ liệu Products không phải là một mảng.');
  }
   // END Tính tổng số đơn hàng

})
.catch(error => {
  // Xử lý lỗi nếu có
  console.error('Lỗi:', error);
});