const path = require("path");
const fs = require('fs');
const { authenticator } = require('otplib');
const jwt = require('jsonwebtoken');
const Property = require("../../models/Property");
const Tours = require("../../models/Tours");
const Users = require("../../models/Users");
const { updateImageService } = require("../../services/updateImageService");
const { verifyAdmToken } = require('../../services/authService'); 

const { Router } = require("express");

const route = Router();

route.get("/",verifyAdmToken, (req, res) => {
  const location = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "build",
    "index.html"
  );
  res.sendFile(location);
});
route.get("/edit/property/:id",verifyAdmToken, (req, res) => {
  const location = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "build",
    "index.html"
  );
  res.sendFile(location);
});

route.get("/tours",verifyAdmToken, (req, res) => {
  const location = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "build",
    "index.html"
  );
  res.sendFile(location);
});

route.get("/add/property",verifyAdmToken, (req, res) => {
  const location = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "build",
    "index.html"
  );
  res.sendFile(location);
});

route.post("/editingProperty/:id", verifyAdmToken,async (req, res) => {
  const propertyId = req.params.id;
  const { images, ...propertyData } = req.body;

  try {
    const imagePaths = await updateImageService(images, propertyId);

    await Property.update(
      {
        pimage: `/image/${propertyId}`,
        title: propertyData.title,
        description: propertyData.desc,
        address: propertyData.address,
        bed: parseInt(propertyData.bedRoomNum),
        area: parseInt(propertyData.size),
        price: parseInt(propertyData.price),
        plink: "/property",
        type: propertyData.type,
        room_num: parseInt(propertyData.roomNumber),
        bath_num: parseInt(propertyData.bathroomNumber),
        construction_year: parseInt(propertyData.construction_year),
        floor: parseInt(propertyData.floor),
        heating: propertyData.heatingOption,
        windows: propertyData.joineryOption,
        blinded_door: propertyData.selectedFeatures["Blinded door"],
        lift: propertyData.selectedFeatures.Lift,
        internet: propertyData.selectedFeatures.Internet,
        garbage: propertyData.selectedFeatures.Garbage,
        cable_tv: propertyData.selectedFeatures["Cable TV"],
        interphone: propertyData.selectedFeatures.Interphone,
        public_parking: propertyData.selectedFeatures["Public Parking"],
        electricity: propertyData.selectedFeatures.Electricity,
        balcony: propertyData.selectedFeatures.Balcony,
        garage: propertyData.selectedFeatures.Garage,
        air_conditioning: propertyData.selectedFeatures["Air conditioning"],
        gas: propertyData.selectedFeatures.Gas,
      },
      {
        where: { id: propertyId },
      }
    );

    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Error updating property" });
  }
});

route.post("/add/property",verifyAdmToken, async (req, res) => {
  const { images, ...propertyData } = req.body;

  try {
    
    const property = await Property.create({
      pimage: `/image/placeholder`, 
      title: propertyData.title,
      description: propertyData.desc,
      address: propertyData.address,
      bed: parseInt(propertyData.bedRoomNum),
      area: parseInt(propertyData.size),
      price: parseInt(propertyData.price),
      plink: "/property",
      type: propertyData.type,
      room_num: parseInt(propertyData.roomNumber),
      bath_num: parseInt(propertyData.bathroomNumber),
      construction_year: parseInt(propertyData.construction_year),
      floor: parseInt(propertyData.floor),
      heating: propertyData.heatingOption,
      windows: propertyData.joineryOption,
      blinded_door: propertyData.selectedFeatures["Blinded door"],
      lift: propertyData.selectedFeatures.Lift,
      internet: propertyData.selectedFeatures.Internet,
      garbage: propertyData.selectedFeatures.Garbage,
      cable_tv: propertyData.selectedFeatures["Cable TV"],
      interphone: propertyData.selectedFeatures.Interphone,
      public_parking: propertyData.selectedFeatures["Public Parking"],
      electricity: propertyData.selectedFeatures.Electricity,
      balcony: propertyData.selectedFeatures.Balcony,
      garage: propertyData.selectedFeatures.Garage,
      air_conditioning: propertyData.selectedFeatures["Air conditioning"],
      gas: propertyData.selectedFeatures.Gas,
    });

    const imagePaths = await updateImageService(images, property.id);

    await property.update({ pimage: `/image/${property.id}` });

    res.status(201).json({ message: "Property added successfully" });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Error adding property" });
  }
});

route.get("/tours/schedule",verifyAdmToken, async (req, res) => {
  try {
    const tours = await Tours.findAll({
      order: [['id', 'DESC']]
    });

    res.json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

route.post("/delete/property", verifyAdmToken, async (req, res) => {
  try {
    const { id } = req.body;

    const deletedProperty = await Property.destroy({
      where: {
        id: id
      }
    });

    if (deletedProperty) {
      res.status(200).send("Property deleted successfully");
    } else {
      res.status(404).send("Property not found");
    }
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).send("Internal Server Error");
  }
});

route.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await Users.findOne({
          where: {
              username: username,
              password: password
          }
      });

      if (user) {
          const currentDate = new Date();
          const status = user.status;
          const expiryDate = user.expirydate;

          if (status === 'active' && expiryDate > currentDate) {
              return res.status(200).json({ message: 'Login successful' });
          } else {
              return res.status(403).json({ message: 'Profile not active' });
          }
      } else {
          return res.status(401).json({ message: 'Profile not found' });
      }
  } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
  }
});

route.post("/login/check2FA", async (req, res) => {
  const { code, username } = req.body.params;

  try {
    const user = await Users.findOne({
      where: {
        username: username,
      },
      attributes: ["id", "name", "surname", "email", "tempsecret", "role"],
    });

    if (user) {
      authenticator.options = { window: 10 };

      const authVerify = (code, secret) => {
        return authenticator.verify({ token: code, secret: secret });
      };

      const {
        tempsecret: secret,
        role,
        id: userId,
        name,
        surname,
        email,
      } = user;
      const isValid = authVerify(code, secret);

      if (!isValid) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      await Users.update(
        { lastlogin: new Date() },
        { where: { username: username } }
      );

      if (role === "Admin") {
        const token = jwt.sign(
          { userId, username, name, surname, role },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "4 hours", algorithm: "HS256" }
        );
        res.status(200).cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
        });
        return res.status(200).json({ location: "/admin", token: token });
      } else {
        return res.status(401).json({ error: "User not found" });
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Error" });
  }
});

module.exports = route;
