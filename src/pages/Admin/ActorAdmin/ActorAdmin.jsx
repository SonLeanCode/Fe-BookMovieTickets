import { useState } from "react";
import {
  useGetAllActorsQuery,
  useAddActorMutation,
  useUpdateActorMutation,
  useDeleteActorMutation,
} from "../../../services/Actor/actor.service";
import notfound_img from "../../../assets/img/404/not_found_img.jpg"

const ActorAdmin = () => {
  const { data: actors, isLoading, isError, refetch } = useGetAllActorsQuery();
  const [addActor] = useAddActorMutation();
  const [updateActor] = useUpdateActorMutation();
  const [deleteActor] = useDeleteActorMutation();

  const [editActorId, setEditActorId] = useState(null);
  const [feature_img, setFeature_img] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [sub_img, setSub_img] = useState([]);

  const [newActor, setNewActor] = useState({
    name: "",
    description: "",
    date_of_birth: "",
    nationality: "",
    biography: "",
    height: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newActor.name) {
      alert("Tên diễn viên là bắt buộc");
      return;
    }
    const formData = new FormData();
    formData.append("name", newActor.name);
    if (newActor.description) {
      formData.append("description", newActor.description);
    }
    if (newActor.date_of_birth) {
      formData.append("date_of_birth", newActor.date_of_birth);
    }
    if (newActor.nationality) {
      formData.append("nationality", newActor.nationality);
    }
    if (newActor.biography) {
      formData.append("biography", newActor.biography);
    }
    if (newActor.height) {
      formData.append("height", newActor.height);
    }

    if (feature_img) {
      formData.append("feature_img", feature_img);
    }
    if (thumbnail) {
      formData.append("thumbnail_img", thumbnail);
    }

    sub_img.forEach((sub_img) => {
      formData.append("sub_img", sub_img);
    });

    if (editActorId) {
      await updateActor({ id: editActorId, updatedData: formData });
    } else {
      await addActor(formData);
    }

    setNewActor({
      name: "",
      description: "",
      date_of_birth: "",
      nationality: "",
      biography: "",
      height: "",
    });
    setFeature_img(null);
    setThumbnail(null);
    setSub_img([]);
    setEditActorId(null);
    refetch();
  };

  const handleEditClick = (actor) => {
    setEditActorId(actor._id);
    setNewActor({
      name: actor.name,
      description: actor.description,
      date_of_birth: actor.date_of_birth ? new Date(actor.date_of_birth).toISOString().split("T")[0] : "",
      nationality: actor.nationality,
      biography: actor.biography,
      height: actor.height,
    });
  };

  const handleDelete = async (id) => {
    await deleteActor(id);
    refetch();
  };

  const handleMainImageChange = (e) => {
    setFeature_img(e.target.files[0]);
  };

  const handleThumbnailImageChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubImagesChange = (e) => {
    const fileArray = Array.from(e.target.files);
    setSub_img(fileArray);
  };

  if (isLoading) return <div>Đang tải...</div>;
  if (isError) return <div>Có lỗi xảy ra khi tải dữ liệu</div>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="mb-5 text-2xl font-bold">Quản lý Diễn viên</h1>

      <form onSubmit={handleSubmit} className="mb-5 text-black" encType="multipart/form-data">
        <div className="grid grid-cols-2 gap-4">
          <label className="text-white">Tên diễn viên</label>
          <input
            type="text"
            name="name"
            value={newActor.name}
            onChange={handleInputChange}
            placeholder="Tên diễn viên"
            className="input input-bordered w-full"
            required
          />

          <label className="text-white">Mô tả</label>
          <input
            type="text"
            name="description"
            value={newActor.description}
            onChange={handleInputChange}
            placeholder="Mô tả diễn viên"
            className="input input-bordered w-full"
          />

          <label className="text-white">Ngày sinh</label>
          <input
            type="date"
            name="date_of_birth"
            value={newActor.date_of_birth}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />

          <label className="text-white">Quốc tịch</label>
          <input
            type="text"
            name="nationality"
            value={newActor.nationality}
            onChange={handleInputChange}
            placeholder="Quốc tịch"
            className="input input-bordered w-full"
          />

          <label className="text-white">Tiểu sử</label>
          <input
            type="text"
            name="biography"
            value={newActor.biography}
            onChange={handleInputChange}
            placeholder="Tiểu sử"
            className="input input-bordered w-full"
          />

          <label className="text-white">Chiều cao (cm)</label>
          <input
            type="number"
            name="height"
            value={newActor.height}
            onChange={handleInputChange}
            placeholder="Chiều cao (cm)"
            className="input input-bordered w-full"
          />

          <label className="text-white">Ảnh chính</label>
          <input
            type="file"
            onChange={handleMainImageChange}
            accept="image/*"
            className="input input-bordered w-full text-white"
          />

          <label className="text-white">Ảnh Thumbnail</label>
          <input
            type="file"
            onChange={handleThumbnailImageChange}
            accept="image/*"
            className="input input-bordered w-full text-white"
          />

          <label className="text-white">Ảnh phụ</label>
          <input
            type="file"
            multiple
            onChange={handleSubImagesChange}
            accept="image/*"
            className="input input-bordered w-full text-white"
          />
        </div>

        <div className="mt-4 flex gap-4 text-white">
          <button type="submit" className="btn btn-primary bg-green-500 rounded-md p-2">
            {editActorId ? "Cập nhật Diễn viên" : "Thêm Diễn viên"}
          </button>
          {editActorId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditActorId(null)}
            >
              Hủy chỉnh sửa
            </button>
          )}
        </div>
      </form>

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Ngày sinh</th>
            <th>Quốc tịch</th>
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {actors?.map((actor) => (
            <tr key={actor._id}>
              <td>{actor.name}</td>
              <td>{actor.description}</td>
              <td>{actor.date_of_birth ? new Date(actor.date_of_birth).toLocaleDateString() : "Đang cập nhật"}</td>
              <td>{actor.nationality}</td>
              <td>
                <img
                  src={actor.feature_img || notfound_img}
                  alt={actor.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEditClick(actor)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(actor._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActorAdmin;
