import React, {useState, useEffect} from "react";
import Navbar from "../../../components/User/Navbar/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import "./Panel.css";
import axios from "axios";

const Panel = () => {

  const [properties, setProperties] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 150,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    loop: true,
    nav: true,
    arrows: false,
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/propertiespanel');
      setProperties(response.data); 
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []); 

  return (
    <>
      <div>
        <Navbar />
        <div className="intro intro-carousel">
          <Slider {...settings}>
            {properties.map((property, index) => (
              <div key={index} id="carousel" className="owl-carousel owl-theme">
                <div
                  className="carousel-item-a intro-item bg-image"
                  style={{
                    backgroundImage: `url(${property.pimage})`,
                    backgroundSize: "cover", 
                    backgroundPosition: "center", 
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="overlay overlay-a"></div>
                  <div className="intro-content display-table">
                    <div className="table-cell">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-8">
                            <div className="intro-body">
                              <p className="intro-title-top">
                                {property.address}
                                <br />
                              </p>
                              <h1 className="intro-title mb-4">
                                <span className="color-b">{property.title} </span>{" - "}
                                {property.area} m2
                              </h1>
                              <p className="intro-subtitle intro-price">
                                <a href={`/propertydetail/${property.id}`}>
                                  <span className="price-a">
                                    Sale | $ {property.price}
                                  </span>
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Panel;