import React from "react";
import { FaHome, FaBed, FaRulerCombined, FaTag } from "react-icons/fa";

const CardAdmin = ({
  id,
  title,
  description,
  pimage,
  address,
  bed,
  area,
  price,
  openModal
}) => {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      <img src={pimage} alt={title} className="card-img-top" />
      <div className="card-body" style={{ flex: 1 }}>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-info">
          <FaHome /> {address}
        </p>
        <p className="card-info">
          <FaBed /> {bed} Bedrooms &nbsp;|&nbsp; <FaRulerCombined /> {area} m2
        </p>
        <p className="card-info">
          <FaTag /> ${price}
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 20px 20px" }}>
        <a href={`/admin/edit/property/${id}`} className="btn btn-primary">
          Edit
        </a>
        <a
          className="btn btn-primary"
          style={{ backgroundColor: "red", cursor: 'pointer' }}
          id="dltproperty"
          onClick={() => openModal(id)}
        >
          Delete
        </a>
      </div>
    </div>
  );
};

export default CardAdmin;
