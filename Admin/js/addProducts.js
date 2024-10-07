fetch('http://localhost:3000/product/id')
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data)) {
      document.querySelector('.btn-save').addEventListener('click', () => {
        var addName = document.querySelector('.addName').value;
        var addQuantity = document.querySelector('.addQuantity').value;
        var addMaterial = document.querySelector('.addMaterial').value;
        var addPrice = document.querySelector('.addPrice').value;
        var fileName1 = document.querySelector('#fileName1').files[0].name;
        var fileName2 = document.querySelector('#fileName2').files[0].name;
           
        var motaTextarea = CKEDITOR.instances.mota;
        var motaContent = motaTextarea.getData().replace(/<[^>]+>/g, '');               

        // Kiểm tra up ảnh qua multer
        const avatarInput = document.querySelector('input[name="avatar"]');
        const avatarInput1 = document.querySelector('input[name="avatar1"]');
              
        // Gửi yêu cầu POST đến '/store' để đẩy ảnh lên máy chủ
        const formData = new FormData();
        formData.append('avatar', avatarInput.files[0]);
        formData.append('avatar1', avatarInput1.files[0]);
        formData.append('name', addName); // Thêm các trường thông tin vào formData
        formData.append('image1', fileName1);
        formData.append('image2', fileName2);
        formData.append('price', addPrice);
        formData.append('material', addMaterial);
        formData.append('quantity', addQuantity);
        // formData.append('image1', fileName1);
        formData.append('title', motaContent);
      
        // Kiểm tra xem các trường cần thiết có được điền đầy đủ hay không
        if (!addName || !addQuantity || !addMaterial || !addPrice || !fileName1) {
          alert('Vui lòng điền đầy đủ thông tin sản phẩm.');
          return;
        }

        // Kiểm tra xem sản phẩm có id hoặc tên trùng với các sản phẩm khác không
        var isDuplicate = data.some(product => product.name === addName);
        if (isDuplicate) {
          alert('Tên sản phẩm đã tồn tại.');
          return;
        }
        
        // Gửi yêu cầu POST để lưu mới sản phẩm 
        fetch('http://localhost:3000/product/store', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (response.ok) {
            window.location.href = 'table-data-product.html'; // Thay đổi URL để chuyển về trang index
          } else {
            throw new Error('Lỗi khi gửi yêu cầu lưu dữ liệu.');
          }
        })
        .catch(error => {
          console.error('Lỗi khi gửi yêu cầu lưu dữ liệu:', error);
        });
      });
    } else {
      console.error('Dữ liệu Products không phải là một mảng.');
    }
  })
  .catch(error => {
    console.error('Lỗi:', error);
  });
