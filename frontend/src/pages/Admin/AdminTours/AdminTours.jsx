import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminTours.css";
import {  toast } from "react-toastify";
import SidebarAdmin from "../../../components/Admin/SidebarAdmin/SidebarAdmin";
import NavbarAdmin from "../../../components/Admin/NavbarAdmin/NavbarAdmin";

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    axios
      .get("/admin/tours/schedule")
      .then((response) => {
        setTours(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tours:", error);
      });
  }, [emailSent]);

  async function handleAccept(tourId) {
    try {
      await axios.post(`/accept/tour/${tourId}`);
      toast.success("Tour has been accepted");
      toast.success("Confirmation mail was sent to client");
      setEmailSent(!emailSent);
    } catch (error) {
      toast.error("Error when confirming tour, try again ");
    }
  }

  async function handleDecline(tourId) {
    try {
      await axios.post(`/decline/tour/${tourId}`);
      toast.success("Tour has been declined succesfully");
      toast.success("Confirmation mail was sent to client");
      setEmailSent(!emailSent);
    } catch (error) {
      toast.error("Error when declining tour, try again ");
    }
  }

  return (
    <div>
      <SidebarAdmin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <section className="home-section">
        <NavbarAdmin toggleSidebar={toggleSidebar} />
        <div className="home-content">
          <div className="tours-table-container">
            <table className="tours-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Tour Date</th>
                  <th>Tour Time</th>
                  <th>Property</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour) => (
                  <tr key={tour.id}>
                    <td>{tour.name}</td>
                    <td>{tour.surname}</td>
                    <td>{tour.email}</td>
                    <td>
                      {new Date(tour.tourdate).toLocaleDateString("en-GB")}
                    </td>
                    <td>{tour.tourtime}</td>
                    <td>
                      <a
                        href={`/propertydetail/${tour.property_id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Property
                      </a>
                    </td>
                    <td className="tourBtns">
                      {tour.state === "none" && (
                        <div>
                          <button
                            className="acceptBtn"
                            onClick={() => handleAccept(tour.id)}
                          >
                            Accept
                          </button>
                          <button
                            className="declineBtn"
                            onClick={() => handleDecline(tour.id)}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                      {tour.state === "accepted" && (
                        <button className="confirmedBtn" disabled>
                          Confirmed
                        </button>
                      )}
                      {tour.state === "declined" && (
                        <button className="declinedBtn" disabled>
                          Declined
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminTours;
