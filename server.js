const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const app = express();
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.static(path.join(__dirname, '/client/build')));



app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);
app.use((req, res, next) => {
    req.io = io;
    next();
  });
io.on('connection', (socket) => {
    console.log('New user! Its id - ' + socket.id);
});


  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
// Przekierowanie w przypadku błędnego adresu strony
app.use((req, res) => {
    res.status(404).send('404 not found...');
});



//module.exports = server;