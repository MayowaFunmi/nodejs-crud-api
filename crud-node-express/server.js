const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config();
const app = require('./app');
const personRoute = require('./routes/User');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({ "message": "Hellow and welcome to crud api using nodejs" })
})

app.use('/person', personRoute);

const port = process.env.PORT || 3000

/*

const connectDB = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.DB_URL, connectionParams);

    } catch (error) {
        console.log("Failed to connect to database");
        console.log(error);
        process.exit(1);
    }
}
*/

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});
//connectDB();