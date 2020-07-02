const express = require('express');
const { cors } = require('../../middlewares/cors');

const app = express();

//JSON and UrlEncoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS Middleware
app.use(cors);
//Routes
app.use(require('../../routes/index'));

app.listen(process.env.APP_PORT, () => {
    console.log(`Listening ${process.env.APP_PORT}`);
});