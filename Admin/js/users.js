fetch('http://localhost:3000/user/id')
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data)) {
      data.forEach(users => {
        // Tạo ID ngẫu nhiên
        // var randomId = generateRandomId();

        // Hiển thị thông tin comment trong trang admin
        var tr = document.createElement('tr');

        tr.innerHTML = `
          <tr>
            <td width="10"><input type="checkbox" name="check1" value="1"></td>
            <td>${users._id}</td>
            <td>${users.name}</td>
            <td>${users.adress}</td>
            <td>${users.birthday}</td>
            <td>${users.gender}</td>
            <td>${users.phone}</td>
            <td>${users.idrandom}</td>
            <td class="table-td-center">
              <button class="btn btn-primary btn-sm trash" type="button" title="Xóa" onclick="myFunction(this)">
                <i class="fas fa-trash-alt"></i>
              </button>
              <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp"
                data-toggle="modal" data-target="#ModalUP">
                <i class="fas fa-edit"></i>
              </button>
            </td>
          </tr>
        `;

        // Hiển thị thông tin khách hàng trong bảng
        var tableBody = document.querySelector('#sampleTable tbody');
        tableBody.appendChild(tr);
      });
    } else {
      console.error('Dữ liệu Users không phải là một mảng.');
    }
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Lỗi:', error);
  });
  
// Hàm tạo ID ngẫu nhiên
// function generateRandomId() {
//   var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   var idLength = 8;
//   var randomId = '';

//   for (var i = 0; i < idLength; i++) {
//     var randomIndex = Math.floor(Math.random() * chars.length);
//     randomId += chars[randomIndex];
//   }

//   return randomId;
// }