import React, { useState, useEffect, useRef } from "react";
import SidebarAdmin from "../../../components/Admin/SidebarAdmin/SidebarAdmin";
import NavbarAdmin from "../../../components/Admin/NavbarAdmin/NavbarAdmin";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AdminEditProperty.css";
import {
  FaHome,
  FaBed,
  FaRulerCombined,
  FaTag,
  FaRegTrashAlt,
  FaRegCalendarAlt,
  FaImages,
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
import { ToastContainer, toast } from 'react-toastify';

function Dropdown({ name, options, value, onChange }) {
  return (
    <select
      name={name}
      className="rounded-dropdown"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Heating({ name, options, selectedValue, onChange }) {
  return (
    <select name={name} value={selectedValue} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Windows({ name, options, selectedValue, onChange }) {
  return (
    <select
      name={name}
      value={selectedValue}
      onChange={onChange}
      style={{ width: "50%" }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function CheckboxGroup({ options, selectedValues, onChange }) {
  return (
    <ul style={{ listStyle: "none" }}>
      {options.map((option) => (
        <li key={option}>
          <label>
            <input
              type="checkbox"
              value={option}
              checked={selectedValues[option]}
              onChange={onChange}
            />
            {option}
          </label>
        </li>
      ))}
    </ul>
  );
}

const AdminEditProperty = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [editProperty, setEditProperty] = useState({
    title: "",
    desc: "",
    address: "",
    price: "",
    size: "",
    type: "Flat",
    images: [],
    bed: "1",
    room_num: "1",
    bath_num: "1",
    construction_year: "",
    floor: "1",
    heatingOption: "",
    joineryOption: "",
    selectedFeatures: {
      "Blinded door": false,
      Lift: false,
      Internet: false,
      Garbage: false,
      "Cable TV": false,
      Interphone: false,
      "Public Parking": false,
      Electricity: false,
      Balcony: false,
      Garage: false,
      "Air conditioning": false,
      Gas: false,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const propertyId = id;

    axios
      .get(`/property/${propertyId}`)
      .then((response) => {
        const receivedFeatures = response.data;
        const selectedFeatures = {
          "Blinded door": receivedFeatures.blinded_door,
          Lift: receivedFeatures.lift,
          Internet: receivedFeatures.internet,
          Garbage: receivedFeatures.garbage,
          "Cable TV": receivedFeatures.cable_tv,
          Interphone: receivedFeatures.interphone,
          "Public Parking": receivedFeatures.public_parking,
          Electricity: receivedFeatures.electricity,
          Balcony: receivedFeatures.balcony,
          Garage: receivedFeatures.garage,
          "Air conditioning": receivedFeatures.air_conditioning,
          Gas: receivedFeatures.gas,
        };

        setEditProperty({
          ...response.data,
          selectedFeatures: selectedFeatures,
        });
        axios
          .get(`/images/${propertyId}`)
          .then((imageResponse) => {
            const newImages = imageResponse.data.map((base64Data, index) => {
              return {
                name: `Image ${index + 1}`,
                url: `data:image/png;base64,${base64Data}`,
                data: base64Data,
              };
            });

            setImages((prevImages) => [...prevImages, ...newImages]);
          })
          .catch((error) => {
            console.error("Error fetching images:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching property details:", error);
      });
  }, [id]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const selectFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const onFileSelect = (event) => {
    const files = event.target.files;
    if (files.length === 0) return;
    if (files.length > 4) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (images.length + files.length > 4) {
        break;
      }
      if (!images.some((e) => e.name === files[i].name)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          let dataUrl = event.target.result;

          dataUrl = dataUrl.replace(/^data:image\/\w+;base64,/, "");

          setImages((prevImages) => [
            ...prevImages,
            {
              name: files[i].name,
              url: URL.createObjectURL(files[i]),
              data: dataUrl,
            },
          ]);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };
  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 4) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (images.length + files.length > 4) {
        break;
      }
      if (!images.some((e) => e.name === files[i].name)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          let dataUrl = event.target.result;

          dataUrl = dataUrl.replace(/^data:image\/\w+;base64,/, "");

          setImages((prevImages) => [
            ...prevImages,
            {
              name: files[i].name,
              url: URL.createObjectURL(files[i]),
              data: dataUrl,
            },
          ]);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleTitleChange = (event) => {
    setEditProperty({
      ...editProperty,
      title: event.target.value,
    });
  };

  const handleDescChange = (event) => {
    setEditProperty({
      ...editProperty,
      description: event.target.value,
    });
  };

  const handleAddressChange = (event) => {
    setEditProperty({
      ...editProperty,
      address: event.target.value,
    });
  };

  const handlePriceChange = (event) => {
    setEditProperty({
      ...editProperty,
      price: event.target.value,
    });
  };
  const handleSizeChange = (event) => {
    setEditProperty({
      ...editProperty,
      area: event.target.value,
    });
  };
  const handleYearConstructionChange = (event) => {
    const newValue = event.target.value;
    setEditProperty({
      ...editProperty,
      construction_year: newValue,
    });
  };

  const handleRoomNumberClick = (event) => {
    const newValue = event.target.value;
    setEditProperty({
      ...editProperty,
      room_num: newValue,
    });
  };

  const handleBedRoomNumberClick = (event) => {
    const newValue = event.target.value;
    setEditProperty({
      ...editProperty,
      bed: newValue,
    });
  };
  const handleBathroomNumberChange = (event) => {
    const newValue = event.target.value;
    setEditProperty({
      ...editProperty,
      bath_num: newValue,
    });
  };
  const handleFloorChange = (event) => {
    const newValue = event.target.value;
    setEditProperty({
      ...editProperty,
      floor: newValue,
    });
  };
  const handleTypeChange = (event) => {
    setEditProperty({
      ...editProperty,
      type: event.target.value,
    });
  };
  const handleHeatingOptionChange = (event) => {
    setEditProperty({
      ...editProperty,
      heating: event.target.value,
    });
  };

  const handleJoineryOptionChange = (event) => {
    setEditProperty({
      ...editProperty,
      windows: event.target.value,
    });
  };

  const handlePropertyFeatureChange = (event) => {
    const { value, checked } = event.target;

    setEditProperty((prevEditProperty) => ({
      ...prevEditProperty,
      selectedFeatures: {
        ...prevEditProperty.selectedFeatures,
        [value]: checked,
      },
    }));
  };

  const roomNumberOptions = ["1", "2", "3", "4", "5", "6"];
  const bathroomNumberOptions = ["1", "2", "3", "4"];
  const typeOptions = ["Flat", "Apartment", "Commercial"];
  const yearConstructionOptions = Array.from({ length: 40 }, (_, i) =>
    (2024 - i).toString()
  );
  const floorOptions = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

  const saveProperty = async () => {

    const propertyData = {
        title: editProperty.title,
        desc: editProperty.description,
        address: editProperty.address,
        price: editProperty.price,
        size: editProperty.area,
        type: editProperty.type,
        images,
        roomNumber: editProperty.room_num,
        bedRoomNum: editProperty.bed,
        bathroomNumber: editProperty.bath_num,
        construction_year: editProperty.construction_year,
        floor: editProperty.floor,
        heatingOption: editProperty.heating,
        joineryOption: editProperty.windows,
        selectedFeatures: editProperty.selectedFeatures,

    };

    try {
        const propertyId = id;
        console.log(propertyData);
        const response = await axios.post(`/admin/editingProperty/${propertyId}`, propertyData);
        if (response.status === 200) {
            toast.success("Property updated successfully");
            navigate('/admin')
        }

    } catch (error) {
        toast.error("Error when editing property ", {
            toastId: 'error1',
            autoClose: 1000,
        })
    }
};


  return (
    <>
      <SidebarAdmin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <section className="home-section">
        <NavbarAdmin toggleSidebar={toggleSidebar} />
        <div className="home-content">
          <div className="property-details-container">
            {editProperty && (
              <div className="property-details">
                <div className="carousel-container">
                  <div className="icon-left-side  text-primary font-inter font-semibold ">
                    <div
                      className="lines"
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                    >
                      <FaImages />
                      {isDragging ? (
                        <h5 className="icon-text">
                          <br></br> Drop Images here <br></br>{" "}
                        </h5>
                      ) : (
                        <h5 className="icon-text">
                          <br></br>Drag and Drop Images <br></br> or{" "}
                          <span role="button" onClick={selectFiles}>
                            Browse
                          </span>{" "}
                        </h5>
                      )}
                      <input
                        type="file"
                        className="imgupload"
                        ref={fileInputRef}
                        onChange={onFileSelect}
                        multiple
                      />
                    </div>
                    <div className="containerImage">
                      {images.map((images, index) => (
                        <div className="image" key={index}>
                          <span
                            className="delete"
                            onClick={() => deleteImage(index)}
                          >
                            &times;
                          </span>
                          <img src={images.url} alt={images.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="property-details">
                  <div className="property-info">
                    <div className="property-description">
                      <input
                        style={{ width: "80%" }}
                        className="a-mainTitle text-primary font-inter bg-lightgray"
                        type="text"
                        value={editProperty.title}
                        onChange={handleTitleChange}
                      />
                      <br></br>
                      <input
                        style={{ width: "80%" }}
                        className="a-desc bg-lightgray"
                        type="text"
                        value={editProperty.description}
                        onChange={handleDescChange}
                      />
                      <div className="special-info">
                        <div className="info-address-year">
                          <div className="info-item">
                            <FaLocationDot />
                            <span>
                              <input
                                className="a-address text-primary font-inter bg-lightgray"
                                type="text"
                                value={editProperty.address}
                                onChange={handleAddressChange}
                              />
                              |
                            </span>
                          </div>
                          <div className="info-item">
                            <FaRegCalendarAlt />
                            <span>
                              Build year{" "}
                              <Dropdown
                                name="yearConstruction"
                                options={yearConstructionOptions}
                                value={editProperty.construction_year}
                                onChange={handleYearConstructionChange}
                              />
                            </span>
                          </div>
                        </div>
                        <div className="info-items">
                          <div className="info-item" style={{ width: "30%" }}>
                            <FaRulerCombined />
                            <span
                              style={{
                                width: "flex",
                                alignItems: "center",
                              }}
                            >
                              <input
                                className="form bg-lightgray"
                                type="text"
                                style={{ width: "50%", margin: '0', position: 'static' }}
                                value={editProperty.area}
                                onChange={handleSizeChange}
                              />{" "}
                              M2 |
                            </span>
                          </div>
                          <div className="info-item">
                            <FaBed />
                            <span>
                              {" "}
                              <Dropdown
                                name="roomNumber"
                                options={roomNumberOptions}
                                value={editProperty.bed}
                                onChange={handleBedRoomNumberClick}
                              />{" "}
                              Bedrooms |
                            </span>
                          </div>
                          <div className="info-item">
                            <FaHome />
                            <span>
                              Type :{" "}
                              <Dropdown
                                name="type"
                                options={typeOptions}
                                value={editProperty.type}
                                onChange={handleTypeChange}
                              />
                            </span>
                          </div>
                        </div>
                        <div className="info-item" id="price">
                          <FaTag />
                          <h2>
                            ${" "}
                            <input
                              className="a-price text-primary font-inter bg-lightgray font-extrabold"
                              type="text"
                              value={editProperty.price}
                              onChange={handlePriceChange}
                            />
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="property-detail-accesory">
                      <ul className="property-detail">
                        <h3>Property info</h3>
                        <li>
                          <label>
                            <MdOutlineBedroomParent /> Rooms :{" "}
                            <Dropdown
                              name="roomNumber"
                              options={roomNumberOptions}
                              value={editProperty.room_num}
                              onChange={handleRoomNumberClick}
                            />
                          </label>
                        </li>
                        <li>
                          <label>
                            <MdOutlineBathroom /> Bathrooms :{" "}
                            <Dropdown
                              name="bathroomNumber"
                              options={bathroomNumberOptions}
                              value={editProperty.bath_num}
                              onChange={handleBathroomNumberChange}
                            />
                          </label>
                        </li>
                        <li>
                          <label>
                            <MdOutlineStairs /> Floor :{" "}
                            <Dropdown
                              name="floor"
                              options={floorOptions}
                              value={editProperty.floor}
                              onChange={handleFloorChange}
                            />{" "}
                          </label>
                        </li>
                        <li>
                          <label>
                            <GiHeatHaze /> Heating :{" "}
                            <Heating
                              name="heatingOption"
                              options={["Gas", "City central heating"]}
                              selectedValue={editProperty.heating}
                              onChange={handleHeatingOptionChange}
                            />
                          </label>
                        </li>
                        <li>
                          <label>
                            <VscLayoutPanelJustify /> Windows :{" "}
                            <Windows
                              name="joineryOption"
                              options={[
                                "Wood",
                                "PVC",
                                "Mix: Interior wood exterior PVC",
                              ]}
                              selectedValue={editProperty.windows}
                              onChange={handleJoineryOptionChange}
                            />
                          </label>
                        </li>
                      </ul>
                      <ul className="property-accessory">
                        <h3>Property features</h3>
                        <CheckboxGroup
                          options={[
                            "Blinded door",
                            "Lift",
                            "Internet",
                            "Garbage",
                            "Cable TV",
                            "Interphone",
                            "Public Parking",
                            "Electricity",
                            "Balcony",
                            "Garage",
                            "Air conditioning",
                            "Gas",
                          ]}
                          selectedValues={editProperty.selectedFeatures}
                          onChange={handlePropertyFeatureChange}
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='btnSaveDiv'>
                <button className='btnSave' onClick={saveProperty} >Save</button>
            </div>
           
      </section>
    </>
  );
};

export default AdminEditProperty;
