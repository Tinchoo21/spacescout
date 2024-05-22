// const path = require("path");
// const fs = require("fs");

// const imagesSearchService = (pictureId) => {
//   const imageIds = [pictureId, `${pictureId}_2`, `${pictureId}_3`, `${pictureId}_4`];
//   const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

//   const validImageBase64Strings = [];

//   imageIds.forEach((id) => {
//     allowedExtensions.some((extension) => {
//       const imagePath = path.join(
//         __dirname,
//         "..",
//         "..",
//         "property_images",
//         id + extension
//       );
//       try {
//         const imageBuffer = fs.readFileSync(imagePath);
//         const base64String = imageBuffer.toString("base64");
//         validImageBase64Strings.push(base64String);

//         return true;
//       } catch (err) {
//         return false;
//       }
//     });
//   });

//   if (validImageBase64Strings.length === 0) {
//     return "Images not found";
//   } else {
//     return validImageBase64Strings;
//   }
// };

// module.exports = { imagesSearchService };

const path = require('path');
const fs = require('fs');

const imagesSearchService = (imageId) => {
  const imageIds = [imageId, `${imageId}_2`, `${imageId}_3`, `${imageId}_4`];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  const validImageBase64Strings = [];

  imageIds.forEach(id => {
      allowedExtensions.some(extension => {
          const imagePath = path.join(__dirname,'..','..', 'property_images', id + extension);
          try {
              const imageBuffer = fs.readFileSync(imagePath);
              const base64String = imageBuffer.toString('base64');
              validImageBase64Strings.push(base64String);

              return true;
          } catch (err) {
              return false;
          }
      });
  });

  return validImageBase64Strings;
}
module.exports = { imagesSearchService };
