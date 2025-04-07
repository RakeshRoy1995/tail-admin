import React from "react";

const HomeEntryPage = () => {
  return (
    <div className="home-entry-page">
      <div className="container-fluid px-0">
        {/* Carousel with fade effect and background images */}
        <div
          id="imageCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          {/* Slides with background images */}
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div
              className="carousel-item active"
              style={{ backgroundImage: 'url("asset/assets/img/slider-one.png")' }}
            >
              <div className="carousel-content">
                <p>Welcome to </p>
                <h3>
                  INSTITUTIONAL <span>INNOVATION &amp; DESIGN </span>
                  <span>TOOL</span>
                </h3>
              </div>
            </div>
            {/* Slide 2 */}
            <div
              className="carousel-item"
              style={{ backgroundImage: 'url("asset/assets/img/slider-two.png")' }}
            >
              <div className="carousel-content">
                <p>Welcome to </p>
                <h3>
                  INSTITUTIONAL <span>INNOVATION &amp; DESIGN </span>
                  <span>TOOL</span>
                </h3>
              </div>
            </div>
            {/* Slide 3 */}
            <div
              className="carousel-item"
              style={{ backgroundImage: 'url("asset/assets/img/slider3.png")' }}
            >
              <div className="carousel-content">
                <p>Welcome to </p>
                <h3>
                  INSTITUTIONAL <span>INNOVATION &amp; DESIGN </span>
                  <span>TOOL</span>
                </h3>
              </div>
            </div>
          </div>
          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeEntryPage;
