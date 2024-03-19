const { app, pool } = require('../mainServer')
const path = require('path');
const fs = require('fs')
//const cookieParser = require('cookie-parser');
//app.use(cookieParser());

app.get('/properties', (req, res) => {

    const location = path.join(__dirname, '..', '..', 'build', 'index.html')
    res.sendFile(location);
});

app.get('/aboutus', (req, res) => {

    const location = path.join(__dirname, '..', '..', 'build', 'index.html')
    res.sendFile(location);
});

app.get('/contact', (req, res) => {

    const location = path.join(__dirname, '..', '..', 'build', 'index.html')
    res.sendFile(location);
});

app.get('/propertiespanel', (req, res) => {

    const query = `SELECT * FROM property ORDER BY id ASC LIMIT 3`;

    pool.query(query, (err, dbRes) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
            return;
        }
        res.json(dbRes.rows);
    });
});
app.get('/propertiessale', (req, res) => {
    const { sort, type } = req.query;

    let orderByClause = 'ORDER BY id ASC';
    let whereClause = '';

    if (type && type.toLowerCase() !== 'all') {
        whereClause = `WHERE type = '${type}'`;
    }

    if (sort) {
        if (sort[0].toLowerCase() === 'l') {
            orderByClause = 'ORDER BY price ASC';
        } else if (sort[0].toLowerCase() === 'h') {
            orderByClause = 'ORDER BY price DESC';
        }
    }

    const query = `SELECT * FROM property ${whereClause} ${orderByClause}`;

    pool.query(query, (err, dbRes) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
            return;
        }
        res.json(dbRes.rows);
    });
});

app.get('/image/:id', (req, res) => {
    const pictureId = req.params.id;
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    let foundImagePath = null;

    allowedExtensions.some(extension => {
        const imagePath = path.join(__dirname,'..','..' , 'property_images', pictureId + extension);
        
        try {
            fs.accessSync(imagePath, fs.constants.F_OK);
            foundImagePath = imagePath;
            return true;
        } catch (err) {
            return false;
        }
    });

    if (!foundImagePath) {
        res.status(404).send('Image not found');
    } else {
        res.sendFile(foundImagePath);
    }
});
app.get('/images/:id', (req, res) => {
    const imageId = req.params.id;
    const imageIds = [imageId, `${imageId}_2`, `${imageId}_3`, `${imageId}_4`];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    const validImageBase64Strings = [];

    imageIds.forEach(id => {
        allowedExtensions.some(extension => {
            const imagePath = path.join(__dirname, 'property_images', id + extension);
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

    if (validImageBase64Strings.length === 0) {
        res.status(404).send('Images not found');
    } else {
        res.send(validImageBase64Strings);
    }
});