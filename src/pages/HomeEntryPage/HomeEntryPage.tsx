import React from 'react';
import { Link } from 'react-router-dom';

const HomeEntryPage = () => {
    return (
      <>
        {/* <div className="container slider-wrapper position-relative">
          <Link
            to="/login"
            className="btn btn-primary position-absolute top-0 end-0 m-3"
            style={{ zIndex: 1050 }}
          >
            Login
          </Link>
          <div className="row">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="asset/assets/img/slide1.png" alt="" />
                </div>
                <div className="carousel-item">
                  <img src="asset/assets/img/slide2.png" alt="" />
                </div>
                <div className="carousel-item">
                  <img src="asset/assets/img/slide3.png" alt="" />
                </div>
                <div className="carousel-item">
                  <img src="asset/assets/img/slide4.png" alt="" />
                </div>
                <div className="carousel-item">
                  <img src="asset/assets/img/slide4.png" alt="" />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div> */}

        <div className="admin-panel">
          <div className="wrapper">
            <div className="section-two" />
            <div className="section-one">
              <div className="container"></div>
            </div>
          </div>
        </div>
      </>
    );
};

export default HomeEntryPage;