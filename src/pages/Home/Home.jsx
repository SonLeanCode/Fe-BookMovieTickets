// Index.jsx
// import { useHistory } from "react-router-dom";
import "./style.css";
// import { useHistory } from "react-router-dom";
import { GetApi } from "./ApiGet";


function Index() {
  // const history = useHistory();
 
  const data = GetApi();
  if (!data) {
    return <div>Loanding......</div>;
  }
  // hotdeal 1
  const filterData = data.filter((item) => item.hotdeal === "1");
  const filterData2 = data.filter((item) => item.hotdeal === "2");
  const filterData3 = data.filter((item) => item.hotdeal === "3");
  const filterData4 = data.filter((item) => item.hotdeal === "4");

  // chuye trang
  // const handleBuyTicket = (item) => {
  //   history.push({
  //     pathname: `/detail/${item.id}`,
  //     state: { item },
  //   });
  // };
  return (
    <div>
      
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="move">
              MOVE <span>ORIGINAL</span>
            </h3>
            <h1 className="title-mov">TRANGER THINGS</h1>
            <div className="imformation">
              <p className="text-font1">97% Match</p>
              <div className="year">
                <p className="text-font">2017</p>
              </div>
              <div className="tv">
                <p className="text-font3">TV-20</p>
              </div>
              <div className="secons">
                <p className="text-font">2 Seasons</p>
              </div>
              <div className="hd">
                <p className="text-font5">HD</p>
              </div>
            </div>
            <p className="description">
              Movie Hub is a one-stop destination for movie <br />
              enthusiasts. Our website offers a wide selection of movies from
              <br />
              different genres, eras, and languages
            </p>

            <button className="ex" type="button">
              Explore
            </button>
            {/* trending */}
          </div>
        </div>

        <div className="toptrending">
          <h3 className="trending font-bold">
            <span className="colorTrend"> | </span> Trending Now
          </h3>
          <div className="row-trend">
            {/* prev */}
            <span className="controll-prev prev">
              <i className="fa-solid fa-angle-left"></i>
            </span>
            {/* */}
            {filterData.map((item, index) => (
              <div key={index} className="trend">
                <img className="img-trend" src={item.image} alt={item.name} />
                <div className="overlay">
                  <button
                    // onClick={() => handleBuyTicket(item)}
                    className="btn-buy"
                  >
                    Mua vé
                  </button>
                  <button className="btn-trailer">Xem trailer</button>
                </div>
                <div className="name-move">{item.name}</div>
              </div>
            ))}
            {/*next */}
            <span className="controll-next next">
              <i className="fa-solid fa-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="updating">
        <h3 className="updating-title font-bold">
          <span className="colorTrend"> | </span> Updating
        </h3>
        <div className="row-updating">
          {filterData2.length > 0 && (
            <div className="updating1">
              <img
                className="img-updating-back"
                src={filterData2[0].image}
                alt={filterData2[0].image}
              />
              <div className="imformation-upda">
                <h4 className="name-updating">{filterData2[0].name}</h4>
                <div className="description-updating pr-[30px]">
                  {/* The K-drama follows the romance between art students
                  <br />
                  Yoo Na-bi and Park Jae-eon . */}
                  {filterData2[0].description}
                </div>
              </div>
            </div>
          )}
          {/* updating items */}
          <div className="imformation-updating grid grid-cols-3 gap-3">
            {filterData2.map((item, index) => (
              <div key={index}>
                <div className="row-threeUp">
                  <div className="updating2">
                    <img
                      className="img-updating"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="name-updating">{item.name}</div>
                  </div>
                </div>
                <br />
              </div>
            ))}
          </div>
        </div>

        {/* recommend */}
        <div className="recomend my-20">
          <div className="recomend-title">
            {/*  */}
            <div className="left">
              <h3 className="left-recoment font-bold">
                <span className="colorTrend"> | </span> Recommend
              </h3>
              <div className="all-left grid grid-cols-4 gap-3">
                {filterData3.map((item, index) => (
                  <div key={index} className="recomend">
                    <img
                      className="img-recommend block"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="name-recommend mt-5">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
            {/*  */}
            <div className="right">
              <h3 className="Right-recoment font-bold">
                <span className="colorTrend"> | </span> Top Trending
              </h3>
              <div className="topTrend">
                <div className="numberList">
                  <p>1</p>
                  <p>2</p>
                  <p>3</p>
                  <p>4</p>
                  <p>5</p>
                </div>

                <div className="author imgToptrend gap grid grid-cols-1">
                  {filterData4.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <p className="mx-6 mt-1">{item.director}</p>
                      <img className="imgTop mr-4" src={item.image} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
