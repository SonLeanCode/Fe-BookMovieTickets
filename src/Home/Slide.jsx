import { useState } from "react";

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(moviesData.length - 1);

  const moviesData = [
    {
      image: "./src/assets/img/trending1.jpg",
      name: "Avatar",
    },
    {
      image: "./src/assets/img/trending2.jpg",
      name: "John Wich",
    },
    {
      image: "./src/assets/img/trending3.jpg",
      name: "Queen of tear",
    },
    {
      image: "./src/assets/img/trending4.jpg",
      name: "Batman | Story",
    },
    {
      image: "./src/assets/img/trending5.jpg",
      name: "King Kong",
    },
  ];

  const handleNext = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(moviesData.length - 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex < moviesData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const updateUI = () => {
    return (
      <div className="toptrending">
        <h3 className="trending font-bold">
          <span className="colorTrend"> | </span> Trending Now
        </h3>
        <div className="row-trend">
          <span className="controll-prev prev" onClick={handlePrev}>
            <i className="fa-solid fa-angle-left"></i>
          </span>
          {moviesData.map((movie, index) => (
            <div className="trend" key={index}>
              <img className="img-trend" src={movie.image} alt="" />
              <div className="name-move">{movie.name}</div>
            </div>
          ))}
          <span className="controll-next next" onClick={handleNext}>
            <i className="fa-solid fa-chevron-right"></i>
          </span>
        </div>
      </div>
    );
  };

  return updateUI();
};

export default Slideshow;
