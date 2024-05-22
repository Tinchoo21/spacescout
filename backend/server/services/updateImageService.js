const fs = require('fs');
const path = require('path');

const updateImageService = async (images, propertyId) => {
    const savedFiles = [];

    images.forEach((image, index) => {
        const imageData = Buffer.from(image.data, 'base64');
        const fileExtension = image.name.split('.').pop();
        const fileNameSuffix = index === 0 ? '' : `_${index + 1}`;
        const newFileName = `${propertyId}${fileNameSuffix}.${fileExtension}`;
        const filePath = path.join(__dirname, '..','..', 'property_images', newFileName); 

        fs.writeFileSync(filePath, imageData);
        savedFiles.push(filePath);
    });

    return savedFiles;
};

module.exports = {updateImageService};
