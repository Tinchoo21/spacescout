import React from "react";
import "./Card.css";
import { FaHome, FaBed, FaRulerCombined, FaTag } from "react-icons/fa";

const Card = ({
  title,
  description,
  pimage,
  address,
  bed,
  area,
  price,
}) => {
  return (
    <div className="card">
      <img src={pimage} alt={title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-info">
          <FaHome /> {address}
        </p>
        <p className="card-info">
          <FaBed /> {bed} Bedrooms &nbsp;|&nbsp; <FaRulerCombined /> {area}{" "}
          m2
        </p>
        <p className="card-info">
          <FaTag /> ${price}
        </p>
        <a href="/" className="btn btn-primary">
          Details
        </a>
      </div>
    </div>
  );
};

export default Card;
