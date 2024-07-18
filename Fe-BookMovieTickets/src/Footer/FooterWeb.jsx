const FooterPage = () => {
  return (
    <>
      <div className="footer border-3 box-border flex h-[40vh] w-full justify-around border-b-2 border-t-2 border-[#505050] bg-[#161616] bg-cover bg-center px-8 pt-14">
        <div className="information-footer">
          <img
            className="home-footer h-[40px] w-[200px]"
            src="./img/home.jpg"
            alt=""
          />
          <p className="information-title-films mt-5 text-[13px] leading-5">
            Free online movie viewing site in Vietnam.
            <br />
            Here you can search for your favorite movies
            <br />
            rather than new movies that are updated regularly
            <br />
            really beautiful humorous in nature create a friendly
            <br />
            feeling
          </p>
        </div>
        <div className="trendNow-footer">
          <h3 className="title-footer text-[#b0b0b0]">Movie Trending</h3>
          <p className="information-films my-5 text-[14px]">Act</p>
          <p className="information-films text-[14px]">Emotional</p>
          <p className="information-films my-5 text-[14px]">Science Fiction</p>
          <p className="information-films text-[14px]">Children</p>
        </div>
        <div className="trendNow-footer">
          <h3 className="title-footer text-[#b0b0b0]">Movie Updating</h3>
          <p className="information-films my-5 text-[14px]">Act</p>
          <p className="information-films text-[14px]">Emotional</p>
          <p className="information-films my-5 text-[14px]">Science Fiction</p>
          <p className="information-films text-[14px]">Children</p>
        </div>
        <div className="trendNow-footer">
          <h3 className="title-footer text-[#b0b0b0]">Movie Top Trending</h3>
          <p className="information-films my-5 text-[14px]">Act</p>
          <p className="information-films text-[14px]">Emotional</p>
          <p className="information-films my-5 text-[14px]">Science Fiction</p>
          <p className="information-films text-[14px]">Children</p>
        </div>
        <div className="trendNow-footer">
          <h3 className="title-footer text-[#b0b0b0]">Movie Recommend</h3>
          <p className="information-films my-5 text-[14px]">Act</p>
          <p className="information-films text-[14px]">Emotional</p>
          <p className="information-films my-5 text-[14px]">Science Fiction</p>
          <p className="information-films text-[14px]">Children</p>
        </div>
      </div>
      <div className="foot-end flex h-[13vh] w-full justify-between bg-[#161616] bg-cover bg-center px-8 py-2">
        <div className="home font-roboto ml-14 mt-8 text-[14px] text-[#888484]">
          @Home
        </div>
        <div className="icons m-14 mt-8 flex gap-6">
          <div className="face">
            <i className="fa-brands fa-facebook" />
          </div>
          <div className="tw">
            <i className="fa-brands fa-twitter" />
          </div>
          <div className="ig">
            <i className="fa-brands fa-instagram" />
          </div>
          <div className="ytb">
            <i className="fa-brands fa-youtube" />
          </div>
          <div className="ar">
            <i className="fa-solid fa-arrow-up-from-bracket" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterPage;
