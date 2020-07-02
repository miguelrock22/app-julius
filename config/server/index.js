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

const port = process.env.PORT || process.env.APP_PORT;

app.listen(port, () => {
    console.log(`Listening ${port}`);
});