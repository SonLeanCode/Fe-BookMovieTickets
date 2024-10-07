// @ts-ignore
declare const CKEDITOR: any;

fetch('http://localhost:3000/product/id')
  .then(response => response.json())
  .then((data: any[]) => {
    if (Array.isArray(data)) {
      document.querySelector('.btn-save')?.addEventListener('click', () => {
        const addNameInput: HTMLInputElement | null = document.querySelector('.addName');
        const addQuantityInput: HTMLInputElement | null = document.querySelector('.addQuantity');
        const addMaterialInput: HTMLInputElement | null = document.querySelector('.addMaterial');
        const addPriceInput: HTMLInputElement | null = document.querySelector('.addPrice');
        const fileName1Input: HTMLInputElement | null = document.querySelector('#fileName1');
        const fileName2Input: HTMLInputElement | null = document.querySelector('#fileName2');

        // Kiểm tra xem có giá trị null/undefined không trước khi sử dụng
        const addName: string = addNameInput ? addNameInput.value : '';
        const addQuantity: string = addQuantityInput ? addQuantityInput.value : '';
        const addMaterial: string = addMaterialInput ? addMaterialInput.value : '';
        const addPrice: string = addPriceInput ? addPriceInput.value : '';
        const fileName1: string = fileName1Input && fileName1Input.files ? fileName1Input.files[0].name : '';
        const fileName2: string = fileName2Input && fileName2Input.files ? fileName2Input.files[0].name : '';
           
        const motaTextarea: any = CKEDITOR.instances.mota;
        const motaContent: string = motaTextarea.getData().replace(/<[^>]+>/g, '');               

        // Kiểm tra up ảnh qua multer
        const avatarInput: HTMLInputElement | null = document.querySelector('input[name="avatar"]');
        const avatarInput1: HTMLInputElement | null = document.querySelector('input[name="avatar1"]');

        if (!avatarInput || !avatarInput1) {
          console.error('Không tìm thấy input avatar.');
          return;
        }

        


        // Gửi yêu cầu POST đến '/store' để đẩy ảnh lên máy chủ
        const formData = new FormData();
        if (avatarInput && avatarInput.files && avatarInput.files[0]) {
          formData.append('avatar', avatarInput.files[0]);
        }
        if (avatarInput1 && avatarInput1.files && avatarInput1.files[0]) {
          formData.append('avatar1', avatarInput1.files[0]);
        }
        
        formData.append('avatar', avatarInput.files?.[0] ?? ''); // hoặc null thay cho ''
        formData.append('avatar1', avatarInput.files?.[0] ?? ''); // hoặc null thay cho ''
        // formData.append('avatar1', avatarInput1.files ? avatarInput1.files[0] : null);
        formData.append('name', addName); // Thêm các trường thông tin vào formData
        formData.append('image1', fileName1);
        formData.append('image2', fileName2);
        formData.append('price', addPrice);
        formData.append('material', addMaterial);
        formData.append('quantity', addQuantity);
        formData.append('title', motaContent);

        // Kiểm tra xem các trường cần thiết có được điền đầy đủ hay không
        if (!addName || !addQuantity || !addMaterial || !addPrice || !fileName1) {
          alert('Vui lòng điền đầy đủ thông tin sản phẩm.');
          return;
        }

        // Kiểm tra xem sản phẩm có id hoặc tên trùng với các sản phẩm khác không
        const isDuplicate: boolean = data.some(product => product.name === addName);
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
