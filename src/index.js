const express = require('express');

const convertRoute = require('./routes/convert');

const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json())

app.use('/convert', convertRoute);

app.listen(PORT, () => console.log(`Server listening in :${PORT}`));