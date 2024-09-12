const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const appRoutes = require('./routes/all.routes');
app.use('/', appRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Started at port: ${PORT}`);
});