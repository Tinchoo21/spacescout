const path = require("path");
const fs = require('fs');
const nodemailer = require('nodemailer');
const Property = require("../../models/Property");
const Tours = require("../../models/Tours");
const {imageSearchService} = require("../../services/imageSearchService");
const {imagesSearchService} = require("../../services/imagesSearchService");
const { Router } = require("express");
const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'adnantinjak37@gmail.com', 
//   from: 'space.scout.agency@gmail.com', 
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
const route = Router();

route.get("/properties", (req, res) => {
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

route.get("/aboutus", (req, res) => {
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

route.get("/contact", (req, res) => {
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

route.get("/propertydetail/:id", (req, res) => {
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

route.get("/login", (req, res) => {
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

route.get("/propertiespanel", async (req, res) => {
    try {
        const properties = await Property.findAll({
            order: [['id', 'ASC']],
            limit: 3
        });

        res.json(properties);
    } catch (error) {
        console.error('An error occurred while fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

route.get("/propertiessale", async (req, res) => {
    const { sort, type } = req.query;

    let order = [['id', 'ASC']];
    let where = {};
    
    if (type && type.toLowerCase() !== 'all') {
        where.type = type;
    }
    
    if (sort) {
        if (sort.toLowerCase() === 'lowest') {
            order = [['price', 'ASC']];
        } else if (sort.toLowerCase() === 'highest') {
            order = [['price', 'DESC']];
        }
    }
    
    try {
        const properties = await Property.findAll({
            where,
            order,
        });
        res.json(properties);
    } catch (error) {
        console.error('An error occurred while fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

route.get("/image/:id", (req, res) => {
  const pictureId = req.params.id;
  const foundImagePath = imageSearchService(pictureId);

  if (!foundImagePath) {
    res.status(404).send("Image not found");
  } else {
    res.sendFile(foundImagePath);
  }
});

route.get("/images/:id", (req, res) => {
  const pictureId = req.params.id;
  const foundImagePaths = imagesSearchService(pictureId);

  if (!foundImagePaths || foundImagePaths.length === 0) {
    res.status(404).send("Image not found");
  } else {
  
    res.send(foundImagePaths);
  }
});

route.get("/property/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findByPk(id);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }
    res.json(property);
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.post('/contact/mail', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: email,
      to: "space.scout.agency@gmail.com",
      subject: `Property Inquiry`,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0f0f0; border-radius: 10px;">
      <h2 style="color: #333; margin-bottom: 20px;">Property Inquiry from ${name}</h2>
      <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <p style="margin-bottom: 10px; font-weight: bold;">Full Name: ${name}</p>
        <p style="margin-bottom: 10px; font-weight: bold;">Email: ${email}</p>
        <p style="margin-bottom: 20px; font-weight: bold;">Message:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          <p style="font-size: 14px; color: #555; line-height: 1.6;">${message}</p>
        </div>
      </div>
      </div>
        `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send('Email sent successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while sending the email');
  }
});

route.post("/add/tours", async (req, res) => {
  try {
    const { id, name, surname, email, tourDate, tourTime } = req.body;
    const state = "none";

    const tourTimeFull = tourTime + ":00"

    const existingTour = await Tours.findOne({
        where: {
            property_id: id,
            tourdate: tourDate,
            tourtime: tourTimeFull
        }
    });

    if (existingTour) {
        return res.status(400).json({ message: 'Tour already exists at this date and time for this property.' });
    }

    const newTour = await Tours.create({
        name,
        surname,
        email,
        tourdate: tourDate,
        tourtime: tourTime,
        property_id: id,
        state
    });

    res.status(200).json("Success adding tour");
} catch (error) {
    console.error('Error adding tour:', error);
    res.status(500).json({ error: 'An error occurred while adding the tour.' });
}
});

route.post("/accept/tour/:id", async (req, res) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const { id } = req.params;
    const accepted = 'accepted';

    const tour = await Tours.findByPk(id);

    if (!tour) {
        return res.status(404).json({ error: 'Tour not found' });
    }

    const { name, email, tourdate, tourtime, property_id } = tour;
    const property = await Property.findByPk(property_id);

    if (!property) {
        return res.status(404).json({ error: 'Property not found' });
    }

    const propetyTitle = property.title;

    const msg = {
        from: {
            email: 'space.scout.agency@gmail.com',
        },
        personalizations: [
            {
                to: [
                    {
                        email: email,
                        name: "Tour accepted"
                    }
                ],
                dynamic_template_data: {
                    name: name,
                    date: tourdate,
                    time: tourtime,
                    property: propetyTitle
                }
            }
        ],
        template_id: 'd-86616b939041493d8172b7ada34bfd95'
    };

    await sgMail.send(msg);

    tour.state = accepted;
    await tour.save();

    res.status(200).json({ tour });
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});

route.post("/decline/tour/:id", async (req, res) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const { id } = req.params;
    const accepted = 'declined';

    const tour = await Tours.findByPk(id);

    if (!tour) {
        return res.status(404).json({ error: 'Tour not found' });
    }

    const { name, email, tourdate, tourtime, property_id } = tour;
    const property = await Property.findByPk(property_id);

    if (!property) {
        return res.status(404).json({ error: 'Property not found' });
    }

    const propetyTitle = property.title;

    const msg = {
        from: {
            email: 'space.scout.agency@gmail.com',
        },
        personalizations: [
            {
                to: [
                    {
                        email: email,
                        name: "Tour declined"
                    }
                ],
                dynamic_template_data: {
                    name: name,
                    date: tourdate,
                    time: tourtime,
                    property: propetyTitle
                }
            }
        ],
        template_id: 'd-d8084636667b4450b8156e321d9fe9e4'
    };

    await sgMail.send(msg);

    tour.state = accepted;
    await tour.save();

    res.status(200).json({ tour });
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});



module.exports = route;
