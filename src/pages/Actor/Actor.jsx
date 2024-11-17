import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useGetAllActorsQuery } from "../../services/Actor/actor.service";
import notfound_img from "../../assets/img/404/actor-default.png";
import { useTranslation } from 'react-i18next';

const Actor = () => {
  const { t } = useTranslation();
  const { data: actorData } = useGetAllActorsQuery();
  console.log(actorData?.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNationality, setSelectedNationality] = useState("");
  const actorsPerPage = 10;
  const nationalities = useMemo(() => {
    return actorData?.data
      ? [...new Set(actorData.data.map((actor) => actor.nationality))] 
      : [];
  }, [actorData]);

  // Filter actors based on selected nationality
  const filteredActors = actorData?.data.filter((actor) =>
    selectedNationality ? actor.nationality === selectedNationality : true
  );

  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = filteredActors?.slice(indexOfFirstActor, indexOfLastActor);

  const totalPages = Math.ceil(filteredActors?.length / actorsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNationalityChange = (event) => {
    setSelectedNationality(event.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="flex justify-center bg-black">
      <div className="mx-24 w-11/12">
        <div
          className="mt-28 flex items-center rounded-lg bg-gray-900 p-4"
          style={{ backgroundColor: "#181818" }}
        >
          <h2 className="font-roboto pb-2 text-2xl font-semibold text-white">
            <span className="border-l-4 border-solid border-red-600 mr-2"></span> {t("DIỄN VIÊN")} 
          </h2>
          <div className="flex">
            <select
              value={selectedNationality}
              onChange={handleNationalityChange}
              className="ml-4 mr-4 rounded-md border border-white bg-gray-900 p-2 text-white"
            >
              <option value="">{t("Quốc Gia")}</option>
              {nationalities.map((nationality, index) => (
                <option key={index} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="my-4 flex flex-col md:flex-row">
          <div className="mr-2 flex-1 text-white">
            {currentActors?.map((actor) => (
              <div
                className="flex items-start rounded-sm bg-gray-900 p-4"
                style={{ backgroundColor: "#181818" }}
                key={actor._id}
              >
                <Link to={`${actor._id}`} className="flex-shrink-0">
                  <img
                    src={actor.thumbnail_img || notfound_img}
                    alt={actor.name}
                    className="rounded-md"
style={{ width: "255px", height: "170px" }}
                  />
                </Link>
                <div className="ml-4 flex flex-1 flex-col">
                  <Link to={`${actor._id}`} className="flex-shrink-0">
                    <h2 className="text-lg font-semibold">{actor.name}</h2>
                  </Link>
                  <div className="my-2 flex items-center">
                    <button
                      className="rounded px-2 text-white"
                      style={{ backgroundColor: "#4080ff" }}
                    >
                      <i className="fa-regular fa-thumbs-up"></i> Thích
                    </button>
                    <div className="ml-4 rounded-sm bg-gray-200 px-2 text-black">
                      <i className="fa-solid fa-eye"></i> {actor.views}
                    </div>
                  </div>
                  <p className="text-gray-300">{actor.description}</p>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="my-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`mx-2 rounded px-4 py-2 ${currentPage === i + 1 ? "bg-red-600" : "bg-gray-700"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 w-full md:mt-0 md:w-[30%]">
            <h2 className="font-roboto mb-3 text-center text-2xl font-semibold text-white">
              {t("Phim đang chiếu")}
            </h2>
            {[1, 2, 3].map((_, idx) => (
              <div className="group ml-6" key={idx}>
                <div className="relative my-2 flex flex-shrink-0 flex-grow flex-col items-center">
                  <img
                    src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-750_1723544376869.jpg"
                    alt="item"
                    className="h-auto w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Link
                      to="/cinema/buy-tickets"
                      className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                    >
                      {t("Mua vé")} <i className="fas fa-ticket-alt ml-1"></i>
                    </Link>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-orange-600 px-2 py-1 text-white">
                    T18
                  </div>
                  <div className="absolute bottom-14 right-2 text-yellow-400">
                    ★★★★☆
                  </div>
                </div>
                <div className="text-white">Tên phim</div>
              </div>
))}
            <h2 className="font-roboto right-0 ml-auto mt-5 w-48 rounded-sm border border-orange-600 p-2 text-center text-lg text-orange-600">
              <Link to="/cinema/movie">{t("Xem thêm")}</Link>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Actor;