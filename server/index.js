let express = require('express');
let app = express();
require('dotenv').config();
let mongoose = require('mongoose');
let cors = require('cors');
const enquriyrouter = require('./App/routes/web/enquiyroute');

app.use(cors());
app.use(express.json());

// import routes
app.use('/api/website/enquriy', enquriyrouter);

mongoose.connect(process.env.dburl).then(() => {
    console.log("connected");
    app.listen(process.env.port || 3000 ,()=>{
        console.log("server is runing");
    });
}).catch((err) => {
    console.log(err);
});
