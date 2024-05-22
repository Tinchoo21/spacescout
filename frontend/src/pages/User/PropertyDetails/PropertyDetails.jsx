import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/User/Navbar/Navbar";
import Footer from "../../../components/User/Footer/Footer";
import { useParams } from "react-router-dom";
import "./PropertyDetails.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaHome,
  FaBed,
  FaRulerCombined,
  FaTag,
  FaRegTrashAlt,
  FaRegCalendarAlt 
} from "react-icons/fa";
import { FaLocationDot, FaWifi } from "react-icons/fa6";
import {
  MdOutlineBedroomParent,
  MdOutlineBathroom,
  MdOutlineStairs,
  MdElectricBolt,
  MdBalcony,
  MdOutlineLocalGasStation,
} from "react-icons/md";
import { GiHeatHaze, GiHomeGarage } from "react-icons/gi";
import { VscLayoutPanelJustify } from "react-icons/vsc";
import { BsDoorClosed } from "react-icons/bs";
import { TbAerialLift, TbAirConditioning } from "react-icons/tb";
import { PiTelevisionLight } from "react-icons/pi";
import { CiMicrophoneOn, CiParking1 } from "react-icons/ci";
import { toast } from 'react-toastify';

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: id,
    name: '',
    surname: '',
    email: '',
    tourDate: '', 
    tourTime: '',
});

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/property/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  //   const carouselSettings = {
  //     dots: true,
  //     infinite: true,
  //     autoplay: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     arrows: false,
  //   };

  const settings = {
    customPaging: function (i) {
      if (i === 0) {
        return <img alt="property" src={`/image/${id}`} />;
      }
      return <img alt="property" src={`/image/${id + "_" + (i + 1)}`} />;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    loop: true,
    arrows: false,
  };

  const formatPriceWithDot = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const openModal = () => {
    setShowModal(true);
};

const closeModal = () => {
    setShowModal(false);
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};
const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
};

const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            options.push(`${formattedHour}:${formattedMinute}`);
        }
    }
    return options;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const isFormIncomplete = Object.values(formData).some(
    (value) => value === "" || value.trim() === ""
  );

  if (isFormIncomplete) {
    toast.error("Please fill all fields");
    return;
  }
  axios
    .post("/add/tours", formData)
    .then((response) => {
      if (response.status === 200) {
        setShowModal(false);
        toast.success("Tour was appointed successfully");
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        toast.error(
          "This timeslot is full. Please select another timeslot for tour"
        );
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    });
};

const modalContent = (
    <div className="modal-container">
        <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Request a Tour</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname:</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tourDate">Tour Date:</label>
                    <input
                        type="date"
                        id="tourDate"
                        name="tourDate"
                        value={formData.tourDate}
                        onChange={handleInputChange}
                        min={getTomorrowDate()}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tourDate">Tour Time:</label>
                    <select
                        id="tourTime"
                        name="tourTime"
                        value={formData.tourTime}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>Select a time</option>
                        {generateTimeOptions().map((timeOption, index) => (
                            <option key={index} value={timeOption}>{timeOption}</option>
                        ))}
                    </select>
                </div>
                <div className="modal-buttons">
                    <button className="modal-button cancel" onClick={closeModal}>Cancel</button>
                    <button className="modal-button confirm" type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    </div>
);


  return (
    <>
      <Navbar />
      <div className="property-details-container">
        {property && (
          <div className="property-details">
            <div className="carousel-container">
              <Slider {...settings}>
                <div>
                  <img src={`/image/${id}`} alt="Property" />
                </div>
                <div>
                  <img src={`/image/${id}_2`} alt="Property" />
                </div>
                <div>
                  <img src={`/image/${id}_3`} alt="Property" />
                </div>
                <div>
                  <img src={`/image/${id}_4`} alt="Property" />
                </div>
              </Slider>
            </div>
            <div className="property-details">
              <div className="property-info">
                <div className="property-description">
                  <h2>{property.title}</h2>
                  <p>{property.description}</p>
                  <div className="special-info">
                    <div className="info-address-year">
                    <div className="info-item">
                      <FaLocationDot />
                      <span>{property.address} |</span>
                    </div>
                    <div className="info-item">
                      <FaRegCalendarAlt />
                      <span>Build year {property.construction_year}</span>
                    </div>
                    </div>
                    <div className="info-items">
                      <div className="info-item">
                        <FaRulerCombined />
                        <span>{property.area} M2 |</span>
                      </div>
                      <div className="info-item">
                        <FaBed />
                        <span>{property.bed} Bedrooms |</span>
                      </div>
                      <div className="info-item">
                        <FaHome />
                        <span>Type : {property.type}</span>
                      </div>
                    </div>
                    <div className="info-items" id="price" style={{alignItems: 'center'}}>
                      <FaTag />
                      <h2>$ {formatPriceWithDot(property.price)}</h2>
                      <button id="reqtourbtn" onClick={openModal} >Request a Tour</button>
                    </div>
                  </div>
                </div>
                <div className="property-detail-accesory">
                  <ul className="property-detail">
                    <h3>Property info</h3>
                    <li>
                      <label>
                        <MdOutlineBedroomParent /> Rooms : {property.room_num}
                      </label>
                    </li>
                    <li>
                      <label>
                        <MdOutlineBathroom /> Bathrooms : {property.bath_num}{" "}
                      </label>
                    </li>
                    <li>
                      <label>
                        <MdOutlineStairs /> Floor : {property.floor}{" "}
                      </label>
                    </li>
                    <li>
                      <label>
                        <GiHeatHaze /> Heating : {property.heating}
                      </label>
                    </li>
                    <li>
                      <label>
                        <VscLayoutPanelJustify /> Windows : {property.windows}
                      </label>
                    </li>
                  </ul>
                  <ul className="property-accessory">
                    <h3>Property features</h3>
                    <div className="accessory-flex">
                      <div>
                        {property.blinded_door && (
                          <li>
                            <label>
                              <BsDoorClosed></BsDoorClosed>Blinded door
                            </label>
                          </li>
                        )}
                        {property.lift && (
                          <li>
                            <label>
                              <TbAerialLift></TbAerialLift>Elevator
                            </label>
                          </li>
                        )}
                        {property.internet && (
                          <li>
                            <label>
                              <FaWifi />
                              Internet
                            </label>
                          </li>
                        )}
                        {property.garbage && (
                          <li>
                            <label>
                              <FaRegTrashAlt />
                              Garbage
                            </label>
                          </li>
                        )}
                        {property.cable_tv && (
                          <li>
                            <label>
                              <PiTelevisionLight />
                              Cable TV
                            </label>
                          </li>
                        )}
                        {property.interphone && (
                          <li>
                            <label>
                              <CiMicrophoneOn />
                              Interphone
                            </label>
                          </li>
                        )}
                      </div>
                      <div>
                        {property.public_parking && (
                          <li>
                            <label>
                              <CiParking1 />
                              Public Parking
                            </label>
                          </li>
                        )}
                        {property.electricity && (
                          <li>
                            <label>
                              <MdElectricBolt />
                              Electricity
                            </label>
                          </li>
                        )}
                        {property.balcony && (
                          <li>
                            <label>
                              <MdBalcony />
                              Balcony
                            </label>
                          </li>
                        )}
                        {property.garage && (
                          <li>
                            <label>
                              <GiHomeGarage />
                              Garage
                            </label>
                          </li>
                        )}
                        {property.air_conditioning && (
                          <li>
                            <label>
                              <TbAirConditioning />
                              Air Conditioning
                            </label>
                          </li>
                        )}
                        {property.gas && (
                          <li>
                            <label>
                              <MdOutlineLocalGasStation />
                              Gas
                            </label>
                          </li>
                        )}
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mapdetails">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1159.9476339964597!2d18.320908739567017!3d43.84027785487918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758cb78e16607ad%3A0x1adeaa8c367ae294!2sNaselje%20Bulevar!5e0!3m2!1sbs!2sba!4v1711463679789!5m2!1sbs!2sba"
          width="1000"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
      {showModal && modalContent}
    </>
  );
};

export default PropertyDetails;
