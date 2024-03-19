import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../../components/User/Navbar/Navbar";
import "./Properties.css";
import Card from "../../../components/User/Card/Card";
import Pagination from "rc-pagination";
import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import axios from "axios";

// const cardData = [
//   {
//     title: "Property One",
//     description: "A beautiful property with stunning views.",
//     imgSrc: slide1,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Two",
//     description: "Luxurious living with all modern amenities.",
//     imgSrc: slide2,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Three",
//     description: "A cozy home located in a serene neighborhood.",
//     imgSrc: slide3,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property One",
//     description: "A beautiful property with stunning views.",
//     imgSrc: slide1,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Two",
//     description: "Luxurious living with all modern amenities.",
//     imgSrc: slide2,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Three",
//     description: "A cozy home located in a serene neighborhood.",
//     imgSrc: slide3,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property One",
//     description: "A beautiful property with stunning views.",
//     imgSrc: slide1,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Two",
//     description: "Luxurious living with all modern amenities.",
//     imgSrc: slide2,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Three",
//     description: "A cozy home located in a serene neighborhood.",
//     imgSrc: slide3,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property One",
//     description: "A beautiful property with stunning views.",
//     imgSrc: slide1,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Two",
//     description: "Luxurious living with all modern amenities.",
//     imgSrc: slide2,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Three",
//     description: "A cozy home located in a serene neighborhood.",
//     imgSrc: slide3,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property One",
//     description: "A beautiful property with stunning views.",
//     imgSrc: slide1,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Two",
//     description: "Luxurious living with all modern amenities.",
//     imgSrc: slide2,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Three",
//     description: "A cozy home located in a serene neighborhood.",
//     imgSrc: slide3,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property One",
//     description: "A beautiful property with stunning views.",
//     imgSrc: slide1,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Two",
//     description: "Luxurious living with all modern amenities.",
//     imgSrc: slide2,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Three",
//     description: "A cozy home located in a serene neighborhood.",
//     imgSrc: slide3,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property One",
//     description: "A beautiful property with stunning views.",
//     imgSrc: slide1,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Two",
//     description: "Luxurious living with all modern amenities.",
//     imgSrc: slide2,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Three",
//     description: "A cozy home located in a serene neighborhood.",
//     imgSrc: slide3,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property One",
//     description: "A beautiful property with stunning views.",
//     imgSrc: slide1,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Two",
//     description: "Luxurious living with all modern amenities.",
//     imgSrc: slide2,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Three",
//     description: "A cozy home located in a serene neighborhood.",
//     imgSrc: slide3,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property One",
//     description: "A beautiful property with stunning views.",
//     imgSrc: slide1,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Two",
//     description: "Luxurious living with all modern amenities.",
//     imgSrc: slide2,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
//   {
//     title: "Property Three",
//     description: "A cozy home located in a serene neighborhood.",
//     imgSrc: slide3,
//     address: "Adress1",
//     bedroom: "2",
//     size: "43",
//     price: "55 000",
//   },
// ];

const Properties = () => {
  const perPage = 9;
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [cardItems, setCardItems] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredCardItems = cardItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchData = useCallback(async () => {
    try {
      let url = "/propertiessale";
      const queryParams = [];

      if (selectedType) {
        queryParams.push(`type=${selectedType}`);
      }
      if (selectedSort) {
        queryParams.push(`sort=${selectedSort.toLowerCase()}`);
      }

      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }

      const response = await axios.get(url);
      setCardItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedType, selectedSort]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setCurrent(1);
  }, []);

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(filteredCardItems.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const getData = (current, pageSize) => {
    return filteredCardItems.slice(
      (current - 1) * pageSize,
      current * pageSize
    );
  };

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <button>
          <IoArrowBackOutline />
        </button>
      );
    }
    if (type === "next") {
      return (
        <button>
          <IoArrowForward />
        </button>
      );
    }
    return originalElement;
  };

  const handleTypeOptionClick = async (option) => {
    setSelectedType(option);
  };

  const handleSortOptionClick = async (option) => {
    setSelectedSort(option); 
};

  return (
    <>
      <Navbar />
      <div className="properties-back">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
          <button className="search-button font-sans bg-accent">
            <GoSearch className="search-icon " />
            Search
          </button>
        </div>

        <div className="container-property">
          <div className="select-dropdown">
            <select onChange={(e) => handleTypeOptionClick(e.target.value)}>
              <option value="" selected disabled>
                Property type
              </option>
              <option value="All">All</option>
              <option value="Flat">Flat</option>
              <option value="Apartment">House</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div className="select-dropdown">
          <select onChange={(e) => handleSortOptionClick(e.target.value)}>
              <option value="" selected disabled>
                Sort by
              </option>
              <option value="Highest">Highest Price First</option>
              <option value="Lowest">Lowest Price First</option>
            </select>
          </div>
        </div>

        <div className="card-container">
          {getData(current, size).map((data, index) => {
            return <Card key={index} {...data} />;
          })}
        </div>
        {filteredCardItems.length > 0 ? (
          <Pagination
            className="pagination-data"
            showTotal={
              isSmallScreen
                ? undefined
                : (total, range) =>
                    `Showing ${range[0]}-${range[1]} of ${total}`
            }
            onChange={PaginationChange}
            total={filteredCardItems.length}
            current={current}
            pageSize={size}
            showSizeChanger={false}
            itemRender={PrevNextArrow}
            onShowSizeChange={PerPageChange}
          />
        ) : null}
      </div>
    </>
  );
};

export default Properties;
