const path = require('path');
const fs = require('fs');

const imageSearchService = (pictureId) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    let foundImagePath = null;

    allowedExtensions.some(extension => {
        const imagePath = path.join(__dirname, '..','..', 'property_images', pictureId + extension);

        try {
            fs.accessSync(imagePath, fs.constants.F_OK);
            foundImagePath = imagePath;
            return true;
        } catch (err) {
            return false;
        }
    });

    return foundImagePath;
}

module.exports = { imageSearchService };
