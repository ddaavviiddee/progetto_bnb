const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const Bnb = require('./models/Bnb.js');
const Booking = require('./models/Booking.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
require('dotenv').config();

path.join(__dirname, 'uploads');

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cors fa da middleware permettendo le XMLHttpRequests al di fuori della pagina di index
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.use(cookieParser());

const salt = bcrypt.genSaltSync();
const jwtSecret = "ry39q27fuieabhuifq3g";

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connesso MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Errore nella connessione a MongoDB Atlas:', error.message);
    });

async function getUserData(req) {
    // Serve la promise in quanto il return della funzione verrebe restituito alla funzione interna a jwt.verify
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userToken) => {
            if (err) throw err;
            resolve(userToken);
        });
    })

};

// Endpoint per la registrazione
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(user);

    } catch (error) {
        res.status(422).json(error);
    }
});

// Endpoint per il login
app.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            // Metodo per controllare se le password sono corrette
            const goodPass = bcrypt.compareSync(password, user.password)

            if (goodPass) {
                // Jwt permette di settare un cookie per la sessione
                jwt.sign({
                    email: user.email,
                    id: user._id,
                }, jwtSecret,
                    {expiresIn: '1d'},
                    (err, token) => {
                        if (err) throw err;
                        // Ritorna l'user in modo da essere utilizzato dai componenti per il contesto
                        res.cookie('token', token ,{secure: true}).json(user);

                    });

            } else {

                res.status(422).json("");
            }

        } else {
            res.status(404).json("");
        }

    } catch (error) {
        res.json(error);
    }


});

// Endpoint per prelevare la sessione e la pagina utente
app.get('/profile', (req, res) => {

    try {

        const { token } = req.cookies;

        if (token) {
            jwt.verify(token, jwtSecret, {}, async (err, userToken) => {
                if (err) throw err;
                const { name, email, _id } = await User.findById(userToken.id);
                res.json({ name, email, _id });
            });
        } else {
            res.json(null);
        }

    } catch (error) {
        res.json(error);
    }

});

// Endpoint per l'upload con l'URL
app.post('/uploadlink', async (req, res) => {

    try {
        const { link } = req.body;
        const newName = 'photo' + Date.now() + '.jpg';

        await download.image({
            url: link,
            dest: __dirname + '/uploads/' + newName,
        });

        res.json(newName);

    } catch (error) {
        throw (error);
    }


});

const photoUpload = multer({ dest: 'uploads/' });

// Endpoint per l'upload da dispositivo
app.post('/upload', photoUpload.array('photos', 20), (req, res) => {
    // Rinomino il file in quanto da upload non hanno estensioni es. .jpg
    // l'estensione si trova nel json come originalname

    try {

        const uploadedFiles = [];

        for (let i = 0; i < req.files.length; i++) {

            const { path: filePath, originalname } = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1]; // Prendo l'ultima parte dell'URL, ovvero l'estensione
            const newPath = filePath + '.' + ext;

            fs.renameSync(filePath, newPath)

            // Modificare a uploads\\ per windows
            uploadedFiles.push(newPath.replace('uploads/', ''));

        }

        res.json(uploadedFiles);

    } catch (error) {

        res.json(error);

    }

});

// Endpoint per la creazione di un Bnb
app.post('/bnb', (req, res) => {

    try {
        const { token } = req.cookies;
        const { title, address, addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
        // Funzione ripresa da sopra per pescare il token da inserire nell'id del propietario del Bnb
        jwt.verify(token, jwtSecret, {}, async (err, userToken) => {
            if (err) throw err;
            const bnb = await Bnb.create({
                owner: userToken.id,
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests, price

            })
            res.json(bnb);
        });
    } catch (error) {
        res.json(error);
    }


});

// Endpoint per il fetch dei propri bnb
app.get('/userbnb', (req, res) => {

    try {

        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userToken) => {
            if (err) throw err;
            const { id } = userToken;
            res.json(await Bnb.find({ owner: id }));
        });

    } catch (error) {
        res.json(error)
    }



});

// Endpoint per il fetch delle informazioni del singolo bnb
app.get('/bnb/:id', async (req, res) => {

    try {
        const { id } = req.params;
        res.json(await Bnb.findById(id).populate('owner'));
    } catch (error) {
        res.json(error)
    }



});

// Endpoint per il fetch delle prenotazioni del singolo bnb
app.get('/bnb/:id/booked-dates', async (req, res) => {

    try {

        const { id } = req.params;
        const bookings = await Booking.find({ bnb: id });

        const bookedDates = bookings.map((booking) => ({
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
        }));

        res.json(bookedDates);
    } catch (error) {
         res.json(error);
    }

});

// Endpoint per la modifica del bnb
app.put('/bnb', async (req, res) => {

    const { token } = req.cookies;
    const { id, title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userToken) => {
        if (err) throw err;

        const bnb = await Bnb.findById(id);

        if (userToken.id == bnb.owner.toString()) {
            bnb.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests, price
            })
            await bnb.save();
            res.json("ok");
        }
    });

});

// Endpoint per la creazione di una prenotazione
app.post('/bookings', async (req, res) => {



    try {
        const userData = await getUserData(req);

        const { bnb, checkIn, checkOut,
            guests, name, phoneNumber, price } = req.body;

        const booking = await Booking.create({
            user: userData.id, bnb, checkIn, checkOut,
            guests, name, phoneNumber, price
        });

        res.json(booking);

    } catch (error) {
        res.json(error);
    }

});

// Endpoint per il fetch delle prenotazioni del singolo utente
app.get('/bookings', async (req, res) => {

    try {
        const userData = await getUserData(req);

        res.json(await Booking.find({ user: userData.id }).populate('bnb').populate('user'));

    } catch (error) {
        res.json(error);
    }


});

// Endpoint per la cancellazione di una prenotazione
app.delete('/bookings/:id', async (req, res) => {

    try {
        const { bookingId } = req.params;
        res.json(await Booking.deleteOne({ id: bookingId }));

    } catch (error) {
        res.json(error);
    }


})

// Endpoint per la cancellazione di un bnb
app.delete('/bnb/:id', async (req, res) => {

    try {
        const { bnbId } = req.params;

        res.json(await Bnb.deleteOne({ id: bnbId }));

    } catch (error) {
        res.json(error);
    }



});

// Endpoint per la ricerca di un bnb
app.get('/search', async (req, res) => {
    const { location } = req.query;

    try {
        const searchResults = await Bnb.aggregate([
            {
                $search: {
                    index: "default",
                    text: {
                        query: location,
                        path: {
                            wildcard: "*"
                        }
                    }
                }
            }
        ])
        res.json(searchResults);
    } catch (error) {
        res.status(500).json({ error: 'Errore nella ricerca' });
    }
});



// Endpoint per la homepage
app.get('/bnb', async (req, res) => {

    try {

        res.json(await Bnb.find());

    } catch (error) {
        throw (error);
    }

})

// Endpoint per il logout
app.post('/logout', (req, res) => {

    try {

        res.cookie('token', '').json(true);

    } catch (error) {
        throw (err);
    }

})

app.listen(4000);